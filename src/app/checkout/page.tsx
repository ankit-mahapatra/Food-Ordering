"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cart-store";

export default function CheckoutPage() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 40;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;


const handlePlaceOrder = async () => {
  setError("");

  if (
    !customerName ||
    !customerEmail ||
    !customerPhone ||
    !address
  ) {
    setError("Please fill in all delivery details.");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName,
        customerEmail,
        customerPhone,
        address,
        items: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      }),
    });

    const text = await response.text();

    let data: any = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      console.error("Invalid API response:", text);
      throw new Error("Server returned an invalid response.");
    }

    console.log("Order API status:", response.status);
    console.log("Order API response:", data);

    if (!response.ok) {
      throw new Error(
        data.message ||
          data.error ||
          `Failed to place order. Server returned ${response.status}`
      );
    }

    if (!data.order || !data.order.orderNumber) {
      console.error("Unexpected order response:", data);
      throw new Error("Order was created but order details were not returned.");
    }

    clearCart();

    router.push(
      `/order-success?orderNumber=${data.order.orderNumber}`
    );
  } catch (error) {
    console.error("Place order error:", error);

    setError(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#fafafa]">
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900"
            >
              Ember & Crust
            </Link>

            <Link
              href="/cart"
              className="text-sm font-semibold text-gray-700 hover:text-black"
            >
              ← Back to Cart
            </Link>
          </div>
        </header>

        <section className="mx-auto max-w-2xl px-4 py-20 text-center">
          <div className="text-6xl">🛒</div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-3 text-gray-600">
            Add some food before proceeding to checkout.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Browse Menu
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900"
          >
            Ember & Crust
          </Link>

          <Link
            href="/cart"
            className="text-sm font-semibold text-gray-700 hover:text-black"
          >
            ← Back to Cart
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Checkout
        </h1>

        <p className="mt-2 text-gray-600">
          Enter your details to place your order.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Delivery Details
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Full Name
                </label>

                <input
                  type="text"
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(e.target.value)
                  }
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Email
                </label>

                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) =>
                    setCustomerEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) =>
                    setCustomerPhone(e.target.value)
                  }
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Delivery Address
                </label>

                <textarea
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  placeholder="Enter your complete delivery address"
                  rows={5}
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}
            </div>
          </div>

          <div className="sticky top-24 h-fit rounded-2xl border border-gray-200 bg-white p-6 text-gray-900 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4 text-sm"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {item.quantity} × ₹{item.price}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 border-t border-gray-200 pt-5 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">
                  Subtotal
                </span>

                <span className="font-semibold text-gray-900">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-gray-700">
                  Delivery Fee
                </span>

                <span className="font-semibold text-gray-900">
                  {deliveryFee === 0
                    ? "FREE"
                    : `₹${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-gray-700">
                  Tax (5%)
                </span>

                <span className="font-semibold text-gray-900">
                  ₹{tax.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-bold">
                <span className="text-gray-900">
                  Total
                </span>

                <span className="text-gray-900">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-black px-4 py-4 text-base font-bold text-white shadow-md transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}