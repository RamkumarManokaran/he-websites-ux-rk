import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
      <p className="text-lg mb-6">Could not find the requested resource.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-300 text-white font-medium rounded-md hover:bg-blue-600 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
