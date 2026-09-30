"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrderSuccessContent() {
const searchParams = useSearchParams();

const orderNumber = searchParams.get("orderNumber");

return ( <main className="min-h-screen bg-[#fafafa]"> <header className="border-b bg-white"> <div className="mx-auto flex max-w-7xl items-center px-4 py-4"> <Link
         href="/"
         className="text-2xl font-bold text-gray-900"
       >
Ember & Crust </Link> </div> </header>

  <section className="mx-auto flex max-w-2xl justify-center px-4 py-20">
    <div className="w-full rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
        ✓
      </div>

      <h1 className="mt-6 text-3xl font-bold text-gray-900">
        Order Placed Successfully!
      </h1>

      <p className="mt-3 text-gray-600">
        Thank you for ordering from Ember & Crust.
      </p>

      {orderNumber && (
        <div className="mt-6 rounded-2xl bg-gray-50 p-5">
          <p className="text-sm font-medium text-gray-600">
            Your Order Number
          </p>

          <p className="mt-2 text-xl font-bold text-gray-900">
            {orderNumber}
          </p>
        </div>
      )}

      <p className="mt-6 text-sm text-gray-600">
        Your order has been received and is now being processed.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
      >
        Continue Shopping
      </Link>
    </div>
  </section>
</main>


);
}

export default function OrderSuccessPage() {
return (
<Suspense
fallback={ <main className="flex min-h-screen items-center justify-center bg-[#fafafa]"> <p className="text-gray-600">
Loading order details... </p> </main>
}
> <OrderSuccessContent /> </Suspense>
);
}
