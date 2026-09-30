"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type OrderItem = {
id: string;
itemName: string;
price: number;
quantity: number;
subtotal: number;
};

type Order = {
id: string;
orderNumber: string;
customerName: string;
customerEmail: string;
customerPhone: string;
address: string;
subtotal: number;
tax: number;
deliveryFee: number;
total: number;
status: string;
createdAt: string;
items: OrderItem[];
};

const statuses = [
"PENDING",
"ACCEPTED",
"PREPARING",
"COMPLETED",
"CANCELLED",
];

export default function AdminOrdersPage() {
const router = useRouter();

const [orders, setOrders] = useState<Order[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [updatingId, setUpdatingId] = useState("");
const [loggingOut, setLoggingOut] = useState(false);
const [filterStatus, setFilterStatus] = useState("ALL");

useEffect(() => {
const fetchOrders = async () => {
try {
const response = await fetch("/api/admin/orders");


    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await response.json();

    setOrders(data.orders);
  } catch (error) {
    console.error(error);

    setError(
      error instanceof Error
        ? error.message
        : "Failed to load orders"
    );
  } finally {
    setLoading(false);
  }
};

fetchOrders();


}, []);

const updateStatus = async (
orderId: string,
status: string
) => {
try {
setUpdatingId(orderId);
setError("");


  const response = await fetch(
    "/api/orders/" + orderId,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update order status");
  }

  const data = await response.json();

  setOrders((currentOrders) =>
    currentOrders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: data.order.status,
          }
        : order
    )
  );
} catch (error) {
  console.error(error);

  setError(
    error instanceof Error
      ? error.message
      : "Failed to update order"
  );
} finally {
  setUpdatingId("");
}


};

const handleLogout = async () => {
try {
setLoggingOut(true);


  await fetch("/api/admin/logout", {
    method: "POST",
  });

  router.push("/admin/login");
  router.refresh();
} catch (error) {
  console.error(error);

  setError("Failed to logout");
  setLoggingOut(false);
}


};

const filteredOrders =
filterStatus === "ALL"
? orders
: orders.filter(
(order) => order.status === filterStatus
);

if (loading) {
return ( <main className="min-h-screen bg-gray-50 p-8"> <h1 className="text-3xl font-bold text-gray-900">
Admin Orders </h1>


    <p className="mt-4 text-gray-600">
      Loading orders...
    </p>
  </main>
);


}

return ( <main className="min-h-screen bg-gray-50 text-black"> <header className="border-b bg-white"> <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5"> <div> <h1 className="text-2xl font-bold">
Ember & Crust </h1>


        <p className="text-sm text-gray-600">
          Admin Order Management
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value)
          }
          className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold outline-none"
        >
          <option value="ALL">All Orders</option>
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="PREPARING">Preparing</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <div className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
          {filteredOrders.length} Orders
        </div>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
        >
          {loggingOut
            ? "Logging out..."
            : "Logout"}
        </button>
      </div>
    </div>
  </header>

  <section className="mx-auto max-w-7xl px-6 py-8">
    {error && (
      <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        {error}
      </div>
    )}

    {filteredOrders.length === 0 ? (
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
        <div className="text-5xl">📦</div>

        <h2 className="mt-5 text-2xl font-bold">
          No orders found
        </h2>

        <p className="mt-2 text-gray-600">
          There are no orders with this status.
        </p>
      </div>
    ) : (
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 md:flex-row md:items-center">
              <div>
                <p className="text-lg font-bold">
                  {order.orderNumber}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">
                  Status:
                </span>

                <select
                  value={order.status}
                  disabled={
                    updatingId === order.id
                  }
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold outline-none"
                >
                  {statuses.map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-bold">
                  Customer Details
                </h3>

                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  <p>
                    <b>Name:</b>{" "}
                    {order.customerName}
                  </p>

                  <p>
                    <b>Email:</b>{" "}
                    {order.customerEmail}
                  </p>

                  <p>
                    <b>Phone:</b>{" "}
                    {order.customerPhone}
                  </p>

                  <p>
                    <b>Address:</b>{" "}
                    {order.address}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-bold">
                  Order Items
                </h3>

                <div className="mt-3 space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between gap-4 text-sm"
                    >
                      <div>
                        <p className="font-semibold">
                          {item.itemName}
                        </p>

                        <p className="text-gray-600">
                          {item.quantity} × ₹
                          {item.price}
                        </p>
                      </div>

                      <p className="font-semibold">
                        ₹
                        {item.subtotal.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-5">
              <div className="ml-auto max-w-sm space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>

                  <span className="font-semibold">
                    ₹
                    {order.subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>

                  <span className="font-semibold">
                    {order.deliveryFee === 0
                      ? "FREE"
                      : "₹" +
                        order.deliveryFee.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>

                  <span className="font-semibold">
                    ₹
                    {order.tax.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between border-t pt-3 text-lg">
                  <span className="font-bold">
                    Total
                  </span>

                  <span className="font-bold">
                    ₹
                    {order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
</main>


);
}
