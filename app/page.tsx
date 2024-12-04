import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-gray-800 font-sans">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">CS391 OAuth</h1>
      <p className="text-lg mb-8">This project uses GitHub OAuth.</p>
      <Link
        href="/api/auth/signin"
        className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
      >
        Sign In
      </Link>
    </main>
  );
}
