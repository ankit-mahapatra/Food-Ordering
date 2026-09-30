"use client";

import { useEffect, useState } from "react";

type MenuItem = {
id: string;
name: string;
description: string;
price: number;
image: string;
available: boolean;
cuisine: string;
dietType: string;
spiceLevel: string;
rating: number;
ratingCount: number;
popularity: number;
};

export default function AdminMenuPage() {
const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
const fetchMenuItems = async () => {
try {
const response = await fetch("/api/admin/menu");


    if (!response.ok) {
      throw new Error("Failed to fetch menu items");
    }

    const data = await response.json();

    setMenuItems(data.menuItems || []);
  } catch (error) {
    console.error(error);

    setError(
      error instanceof Error
        ? error.message
        : "Failed to load menu items"
    );
  } finally {
    setLoading(false);
  }
};

fetchMenuItems();


}, []);

if (loading) {
return ( <main className="min-h-screen bg-gray-50 p-8 text-black"> <h1 className="text-3xl font-bold">
Menu Management </h1>

    <p className="mt-4 text-gray-600">
      Loading menu items...
    </p>
  </main>
);


}

return ( <main className="min-h-screen bg-gray-50 text-black"> <header className="border-b bg-white"> <div className="mx-auto max-w-7xl px-6 py-5"> <h1 className="text-2xl font-bold">
Ember & Crust </h1>

```
      <p className="text-sm text-gray-600">
        Menu Management
      </p>
    </div>
  </header>

  <section className="mx-auto max-w-7xl px-6 py-8">
    {error && (
      <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        {error}
      </div>
    )}

    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">
          Menu Items
        </h2>

        <p className="mt-1 text-gray-600">
          Manage your restaurant menu.
        </p>
      </div>

      <button
        className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
      >
        Add Menu Item
      </button>
    </div>

    {menuItems.length === 0 ? (
      <div className="rounded-2xl border bg-white p-12 text-center">
        <p className="text-gray-600">
          No menu items found.
        </p>
      </div>
    ) : (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.cuisine}
                  </p>
                </div>

                <span
                  className={
                    item.available
                      ? "rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700"
                      : "rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700"
                  }
                >
                  {item.available
                    ? "Available"
                    : "Unavailable"}
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-600">
                {item.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-xl font-bold">
                  ₹{item.price}
                </p>

                <p className="text-sm text-gray-500">
                  ⭐ {item.rating}
                </p>
              </div>

              <div className="mt-4 flex gap-3">
                <button className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold">
                  Edit
                </button>

                <button className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold">
                  Delete
                </button>
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
