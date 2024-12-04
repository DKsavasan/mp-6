import Link from "next/link";

export default function NavMenu() {
  return (
    <nav className="w-full bg-gray-100 border-b border-gray-300">
      <div className="container mx-auto flex justify-center py-4">
        <Link href="/" className="text-blue-600 hover:text-blue-800 px-6">
          Home
        </Link>
        <Link
          href="/api/auth/signin"
          className="text-blue-600 hover:text-blue-800 px-6"
        >
          Sign In
        </Link>
        <Link
          href="/api/auth/signout"
          className="text-blue-600 hover:text-blue-800 px-6"
        >
          Sign Out
        </Link>
        <Link
          href="/profile"
          className="text-blue-600 hover:text-blue-800 px-6"
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}
