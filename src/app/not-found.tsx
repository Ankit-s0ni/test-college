export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-6 text-lg">
        Oops! The page you are looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Go back home
      </a>
    </main>
  );
}
