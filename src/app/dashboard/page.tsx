"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PriceCard from "@/components/ui/PriceCard";
import Footer from "@/components/ui/footer";

const HomePage = () => {
  const router = useRouter();
  const [showPricing, setShowPricing] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const handleClickDemo = () => {
    router.push("/");
  };

  const handleClickPurchase = () => {
    setShowPricing(true);
    setTimeout(() => {
      pricingRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tl from-blue-700 to-zinc-800 ">
      <nav className="flex items-center justify-between px-8 py-4 bg-opacity-10 bg-black">
        <div className="flex-1 flex justify-center">
          <span className="text-white text-2xl font-bold">fitts.ai</span>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center h-full">
        <div className="text-white mb-16">
          <h1 className="text-4xl font-bold mb-4">Welcome to fitts.ai</h1>
          <p className="text-xl italic mb-8">
            "Your Personalized Fashion Assistant"
          </p>
          <div className="flex space-x-4 justify-center">
            <button
              className="bg-white text-red-700 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition transform hover:scale-105"
              onClick={handleClickDemo}
            >
              Try a Demo
            </button>
            <button
              className="bg-white text-red-700 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition transform hover:scale-105"
              onClick={handleClickPurchase}
            >
              Purchase It
            </button>
          </div>
        </div>

        {showPricing && (
          <div ref={pricingRef} className="w-full max-w-6xl px-4 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PriceCard
                title="Basic"
                price="$9.99"
                features={[
                  "5 AI-powered outfit suggestions",
                  "Basic wardrobe management",
                  "Email support",
                ]}
              />
              <PriceCard
                title="Pro"
                price="$19.99"
                features={[
                  "Unlimited AI-powered outfit suggestions",
                  "Advanced wardrobe management",
                  "Priority email support",
                  "Seasonal trend updates",
                ]}
                highlighted={true}
              />
              <PriceCard
                title="Enterprise"
                price="Custom"
                features={[
                  "All Pro features",
                  "Dedicated account manager",
                  "Custom AI model training",
                  "API access",
                ]}
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
