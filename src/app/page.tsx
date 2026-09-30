"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "../store/cart-store";

type Category = {
id: string;
name: string;
slug: string;
};

type MenuItem = {
id: string;
name: string;
description: string | null;
price: number;
image: string | null;
available: boolean;
cuisine: string | null;
dietType: string | null;
spiceLevel: string | null;
rating: number;
ratingCount: number;
popularity: number;
category: Category;
restaurant: {
name: string;
rating: number;
deliveryTime: number;
deliveryFee: number;
isOpen: boolean;
};
};

export default function Home() {
const addItem = useCartStore((state) => state.addItem);

const [items, setItems] = useState<MenuItem[]>([]);
const [categories, setCategories] = useState<Category[]>([]);

const [search, setSearch] = useState("");
const [category, setCategory] = useState("");
const [diet, setDiet] = useState("");
const [sort, setSort] = useState("recommended");

const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const [cartMessage, setCartMessage] = useState("");

useEffect(() => {
fetchCategories();
}, []);

useEffect(() => {
fetchMenu();
}, [search, category, diet, sort, minPrice, maxPrice]);

async function fetchCategories() {
try {
const response = await fetch("/api/categories");
const data = await response.json();

  if (data.success) {
    setCategories(data.categories);
  }
} catch (error) {
  console.error("Category error:", error);
}


}

async function fetchMenu() {
try {
setLoading(true);
setError("");


  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (diet) params.set("diet", diet);
  if (sort) params.set("sort", sort);
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);

  params.set("limit", "50");

  const response = await fetch(
    "/api/menu?" + params.toString()
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    console.error("Menu API response:", data);

    throw new Error(
      data.message || "Failed to load menu"
    );
  }

  setItems(data.items);
} catch (error) {
  console.error("Menu error:", error);
  setError("Unable to load menu. Please try again.");
} finally {
  setLoading(false);
}


}

function handleAddToCart(item: MenuItem) {
addItem({
id: item.id,
name: item.name,
price: item.price,
image: item.image,
});


setCartMessage(item.name + " added to cart");

setTimeout(() => {
  setCartMessage("");
}, 2500);


}

return ( <main className="min-h-screen bg-[#fafafa] text-gray-900">
{/* Cart Message */}
{cartMessage && ( <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-xl">
✓ {cartMessage} </div>
)}

  {/* Header */}
  <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Ember & Crust
        </h1>

        <p className="text-sm text-gray-500">
          Delicious food, delivered fresh
        </p>
      </div>

      <div className="flex items-center gap-3">
       <Link
       href="/admin"
         className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
      >
        Admin
       </Link>

        <Link
          href="/cart"
          className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"
        >
          Cart
        </Link>
      </div>
    </div>
  </header>

  {/* Hero */}
  <section className="bg-black text-white">
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-400">
          Multi-cuisine restaurant
        </p>

        <h2 className="text-4xl font-bold leading-tight md:text-6xl">
          Your cravings,
          <br />
          delivered.
        </h2>

        <p className="mt-5 max-w-xl text-gray-300">
          Explore pizzas, burgers, biryanis, Indian favourites,
          Chinese dishes, desserts and more.
        </p>
      </div>
    </div>
  </section>

  {/* Main */}
  <section className="mx-auto max-w-7xl px-4 py-8">
    {/* Search */}
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 pl-12 outline-none transition focus:border-black"
        />

        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">
          🔎
        </span>
      </div>
    </div>

    {/* Categories */}
    <div className="mb-8 overflow-x-auto">
      <div className="flex min-w-max gap-2">
        <button
          onClick={() => setCategory("")}
          className={
            "rounded-full px-5 py-2.5 text-sm font-medium transition " +
            (category === ""
              ? "bg-black text-white"
              : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-100")
          }
        >
          All
        </button>

        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => setCategory(item.slug)}
            className={
              "rounded-full px-5 py-2.5 text-sm font-medium transition " +
              (category === item.slug
                ? "bg-black text-white"
                : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-100")
            }
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>

    {/* Filters */}
    <div className="mb-8 rounded-2xl border bg-white p-4">
      <div className="grid gap-4 md:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Food type
          </label>

          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="w-full rounded-xl border px-3 py-2.5 outline-none"
          >
            <option value="">All</option>
            <option value="VEG">Vegetarian</option>
            <option value="NON_VEG">Non-Vegetarian</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Minimum price
          </label>

          <input
            type="number"
            placeholder="₹0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-xl border px-3 py-2.5 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Maximum price
          </label>

          <input
            type="number"
            placeholder="₹1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-xl border px-3 py-2.5 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Sort by
          </label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded-xl border px-3 py-2.5 outline-none"
          >
            <option value="recommended">Recommended</option>
            <option value="popularity">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>

    {/* Results heading */}
    <div className="mb-5 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">
          Explore our menu
        </h2>

        {!loading && (
          <p className="mt-1 text-sm text-gray-500">
            {items.length} items available
          </p>
        )}
      </div>
    </div>

    {/* Loading */}
    {loading && (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border bg-white"
          >
            <div className="h-52 animate-pulse bg-gray-200" />

            <div className="space-y-3 p-4">
              <div className="h-5 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
              <div className="h-8 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Error */}
    {!loading && error && (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="font-semibold text-red-700">
          {error}
        </p>

        <button
          onClick={fetchMenu}
          className="mt-4 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    )}

    {/* Empty */}
    {!loading && !error && items.length === 0 && (
      <div className="rounded-2xl border bg-white p-12 text-center">
        <div className="text-5xl">🍽️</div>

        <h3 className="mt-4 text-xl font-bold">
          No food found
        </h3>

        <p className="mt-2 text-gray-500">
          Try changing your search or filters.
        </p>

        <button
          onClick={() => {
            setSearch("");
            setCategory("");
            setDiet("");
            setMinPrice("");
            setMaxPrice("");
          }}
          className="mt-5 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white"
        >
          Clear filters
        </button>
      </div>
    )}

    {/* Menu */}
    {!loading && !error && items.length > 0 && (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-52 overflow-hidden bg-gray-100">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-5xl">
                  🍽️
                </div>
              )}

              <div className="absolute left-3 top-3">
                <span
                  className={
                    "rounded-full px-2.5 py-1 text-xs font-semibold " +
                    (item.dietType === "VEG"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700")
                  }
                >
                  {item.dietType === "VEG"
                    ? "VEG"
                    : "NON-VEG"}
                </span>
              </div>

              <div className="absolute bottom-3 right-3 rounded-full bg-white px-2.5 py-1 text-xs font-bold shadow">
                ⭐ {item.rating.toFixed(1)}
              </div>
            </div>

            <div className="p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="font-bold leading-tight">
                  {item.name}
                </h3>

                <span className="shrink-0 font-bold">
                  ₹{item.price}
                </span>
              </div>

              <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-500">
                {item.description}
              </p>

              <div className="mb-4 flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="rounded-full bg-gray-100 px-2.5 py-1">
                  {item.cuisine}
                </span>

                {item.spiceLevel && (
                  <span className="rounded-full bg-gray-100 px-2.5 py-1">
                    🌶️ {item.spiceLevel}
                  </span>
                )}
              </div>

              <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
                <span>
                  ⭐ {item.rating} ({item.ratingCount})
                </span>

                <span>
                  {item.restaurant.deliveryTime} min
                </span>
              </div>

              <button
                disabled={!item.available}
                onClick={() => handleAddToCart(item)}
                className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {item.available
                  ? "Add to Cart"
                  : "Unavailable"}
              </button>
            </div>
          </article>
        ))}
      </div>
    )}
  </section>
</main>


);
}
