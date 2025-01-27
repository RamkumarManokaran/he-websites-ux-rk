"use client";
import { useEffect, useState } from "react";
interface ErrorPageProps {
  error?: Error;
  reset?: () => void;
}
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowAnimation(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <h1
          className={`text-4xl font-bold text-sky-500 ${
            showAnimation ? "animate-bounce" : ""
          }`}
        >
          Oops! Something went wrong.
        </h1>
        {error?.message && (
          <p className="mt-4 text-lg text-red-600">Error: {error.message}</p>
        )}
        <p className="mt-2 text-gray-500">
          Please try refreshing the page or contact support if the issue
          persists.
        </p>
        <button
          onClick={reset ? reset : () => window.location.reload()}
          className="mt-6 px-6 py-3 text-lg font-medium text-white bg-sky-500 rounded-lg shadow-md hover:bg-sky-600 active:scale-95 transition-transform duration-150"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
