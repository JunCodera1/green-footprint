import React from "react";
import type { Product } from "../../types/product";
import { StarIcon } from "@heroicons/react/24/solid";
import { Leaf } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  isDarkMode?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  isDarkMode = false,
}) => {
  return (
    <div
      className={`${
        isDarkMode
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-white hover:bg-gray-50"
      } rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
    >
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
          Eco-friendly
        </div>
      </div>

      <div className="p-4">
        <h3
          className={`text-lg font-semibold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {product.name}
        </h3>
        <p
          className={`text-sm mb-3 line-clamp-2 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {product.description}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < product.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span
            className={`text-sm ml-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center mb-3">
          <Leaf className="h-5 w-5 text-green-500 mr-2" />
          <span
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {product.carbonFootprint.value} {product.carbonFootprint.unit} CO2
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`text-lg font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            ${product.price}
          </span>
          <button
            onClick={() => onViewDetails(product)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
