"use client";
import React from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const handleClickDemo = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tl from-red-700 to-zinc-800">
      <nav className="flex items-center justify-between px-8 py-4 bg-opacity-10 bg-black">
        <div className="flex-1 flex justify-center">
          <span className="text-white text-2xl font-bold">fitts.ai</span>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center text-center">
        <div className="text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to fitts.ai</h1>
          <p className="text-xl italic mb-8">
            "Your Personalized Fashion Assistant"
          </p>
          <div className="flex space-x-4 justify-center">
            <button
              className="bg-white text-red-700 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-red-600 hover:text-white transition transform hover:scale-105"
              onClick={handleClickDemo}
            >
              Try a Demo
            </button>
            <button className="bg-white text-red-700 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-red-600 hover:text-white transition transform hover:scale-105">
              Purchase It
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
