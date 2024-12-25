import React from "react";

interface PriceCardProps {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

const PriceCard: React.FC<PriceCardProps> = ({
  title,
  price,
  features,
  highlighted = false,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-xl p-6 flex flex-col ${
        highlighted ? "border-4 border-blue-500 transform scale-105" : ""
      }`}
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-4xl font-bold text-red-700 mb-6">
        {price}
        <span className="text-sm font-normal text-gray-600">/month</span>
      </p>
      <ul className="text-gray-600 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="mb-2 flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className="mt-auto bg-blue-700 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition">
        Choose Plan
      </button>
    </div>
  );
};

export default PriceCard;
