import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-10 px-6">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <h1 className="text-3xl font-bold">Welcome to FoodieApp</h1>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-xl">
        A modern food ordering app built with Next.js. Browse restaurants, add meals to your cart, and checkout smoothly.
      </p>

      <div className="flex gap-4 mt-6">
        <a
          href="/menu"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          View Menu
        </a>
        <a
          href="/about"
          className="border border-black px-6 py-2 rounded hover:bg-gray-100 dark:border-white dark:hover:bg-white/10"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}
