import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-600 bg-[url('/not-found.webp')] bg-cover bg-center bg-no-repeat">
      <div className="text-center">
        <h1 className="text-primary mb-4 text-6xl font-bold">404</h1>
        <h2 className="text-primary mb-4 text-2xl font-semibold">
          Сторінку не знайдено
        </h2>
        <p className="text-primary mb-8">
          Вибачте, але ми не змогли знайти цю сторінку.
        </p>
        <Link
          href="/uk"
          className="bg-primary inline-block rounded-lg px-6 py-3 text-white transition-colors hover:bg-blue-700"
        >
          Повернутися на головну
        </Link>
      </div>
    </div>
  );
}
