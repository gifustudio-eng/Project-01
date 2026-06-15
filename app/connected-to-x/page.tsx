import Link from "next/link";

export default function XConnectedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg border p-8 text-center">
        <h1 className="text-2xl font-bold">
          You have logged into X
        </h1>

        <p className="mt-2 text-gray-600">
          Your X account has been connected successfully.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded bg-black px-4 py-2 text-white"
        >
          Back
        </Link>
      </div>
    </main>
  );
}