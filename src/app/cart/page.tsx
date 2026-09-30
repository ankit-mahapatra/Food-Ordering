"use client";

import Link from "next/link";
import { useCartStore } from "../../store/cart-store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 40;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#fafafa] text-black">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <Link
              href="/"
              className="text-2xl font-bold text-black"
            >
              Ember & Crust
            </Link>

            <Link
              href="/"
              className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Browse Menu
            </Link>
          </div>
        </header>

        <section className="mx-auto max-w-2xl px-4 py-20 text-center">
          <div className="text-7xl">🛒</div>

          <h1 className="mt-6 text-3xl font-bold text-black">
            Your cart is empty
          </h1>

          <p className="mt-3 text-gray-600">
            Add some delicious food to your cart and come back here.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Explore Menu
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-black">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-2xl font-bold text-black"
          >
            Ember & Crust
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-gray-700 transition hover:text-black"
          >
            ← Continue Shopping
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8">
        {/* Cart Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-black">
              Your Cart
            </h1>

            <p className="mt-2 text-lg text-gray-600">
              {itemCount} item{itemCount !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={clearCart}
            className="rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Cart Items */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col gap-5 p-5 sm:flex-row sm:items-center ${
                  index !== items.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                {/* Food Image */}
                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-3xl">
                      🍽️
                    </div>
                  )}
                </div>

                {/* Item Details */}
                <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold text-black">
                      {item.name}
                    </h2>

                    <p className="mt-2 text-base text-gray-600">
                      ₹{item.price} each
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-fit text-base font-bold text-black underline underline-offset-4 transition hover:text-gray-600"
                  >
                    Remove
                  </button>

                  {/* Quantity */}
                  <div className="flex w-fit items-center overflow-hidden rounded-xl border-2 border-gray-200 bg-white">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      className="flex h-12 w-12 items-center justify-center text-2xl font-medium text-black transition hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="flex h-12 min-w-12 items-center justify-center border-x-2 border-gray-200 text-base font-semibold text-black">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      className="flex h-12 w-12 items-center justify-center text-2xl font-medium text-black transition hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <p className="min-w-[100px] text-right text-xl font-bold text-black">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 text-black shadow-sm lg:sticky lg:top-6">
            <h2 className="text-xl font-bold text-black">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">
                  Subtotal
                </span>

                <span className="font-semibold text-black">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-gray-600">
                  Delivery Fee
                </span>

                <span className="font-semibold text-black">
                  {deliveryFee === 0
                    ? "FREE"
                    : `₹${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-gray-600">
                  Tax (5%)
                </span>

                <span className="font-semibold text-black">
                  ₹{tax.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-black">Total</span>

                  <span className="text-black">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-xl bg-black px-4 py-4 text-center font-bold text-white transition hover:bg-gray-800"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}