"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
const router = useRouter();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();


setError("");
setLoading(true);

try {
  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  router.push("/admin/orders");
  router.refresh();
} catch (error) {
  setError(
    error instanceof Error
      ? error.message
      : "Something went wrong"
  );
} finally {
  setLoading(false);
}


}

return ( <main className="min-h-screen bg-gray-100 px-4 py-12 text-gray-900"> <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"> <div className="mb-8 text-center"> <h1 className="text-3xl font-bold text-black">
Ember & Crust </h1>


      <p className="mt-2 text-base text-gray-600">
        Admin Login
      </p>
    </div>

    {error && (
      <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        {error}
      </div>
    )}

    <form onSubmit={handleLogin} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none focus:border-black"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  </div>
</main>


);
}
