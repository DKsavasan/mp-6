"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">
          You are not signed in.{" "}
          <Link
            href="/api/auth/signin"
            className="text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    );
  }

  const { user } = session;

  return (
    <main className="flex flex-col items-center justify-center h-screen text-gray-800 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Profile</h1>
      <img
        src={user.image ?? ""}
        alt={user.name ?? "Profile Picture"}
        className="w-24 h-24 rounded-full shadow-lg mb-6"
      />
      <p className="text-lg mb-4">
        <span className="font-semibold">Name:</span> {user.name}
      </p>
      <p className="text-lg mb-4">
        <span className="font-semibold">Email:</span> {user.email}
      </p>
      <p className="text-lg">
        <span className="font-semibold">Signed in with:</span> GitHub
      </p>
    </main>
  );
}
