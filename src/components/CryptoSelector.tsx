import React, { useState, useRef, useEffect } from "react";
import { Currency } from "@/types/currency";

interface CryptoSelectorProps {
  currencies: Currency[];
  selectedCurrency: Currency | null;
  onSelect: (currency: Currency) => void;
  className?: string;
}

// Define a mapping between networks and their corresponding background colors
const networkColors: { [key: string]: string } = {
  ethereum: "bg-blue-500",
  bitcoin: "bg-orange-500",
  binance: "bg-yellow-500",
  polygon: "bg-purple-500",
  solana: "bg-green-500",
  bsc: "bg-yellow-500",
  // Add more networks and colors as needed
};

const CryptoSelector = ({
  currencies,
  selectedCurrency,
  onSelect,
  className = "",
}: CryptoSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCurrencies = currencies?.filter(
    (currency) =>
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the background color based on the selected currency's network
  const getNetworkColor = (network: string) => {
    return networkColors[network] || "bg-gray-500"; // Default color if network is not found
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#ecf1f7] hover:bg-gray-100 py-5 px-4 flex items-center gap-2 transition-colors ${className}`}
      >
        <div className="flex justify-between gap-[3rem] items-center">
          <div className="flex items-center gap-2">
            {selectedCurrency && (
              <img
                src={selectedCurrency.image}
                alt={selectedCurrency.name}
                className="w-6 h-6"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/fallback-currency-icon.png";
                }}
              />
            )}
            <div className="flex items-center gap-1">
              <span className="font-medium uppercase font-semibold">
                {selectedCurrency?.symbol}
              </span>
              {selectedCurrency?.network && (
                <span
                  className={`px-3 py-[3px] text-white uppercase text-[12px] rounded-2xl ${getNetworkColor(
                    selectedCurrency.network
                  )}`}
                >
                  {selectedCurrency.network}
                </span>
              )}
            </div>
          </div>
          <svg
            className={`w-4 h-4   transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          <div className="p-3 border-b">
            <input
              type="text"
              placeholder="Search currencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded bg-[#ecf1f7] outline-none focus:border-blue-500"
            />
          </div>

          <div className="overflow-y-auto max-h-80">
            {filteredCurrencies?.map((currency) => (
              <button
                key={currency.symbol}
                onClick={() => {
                  onSelect(currency);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
              >
                <img
                  src={currency.image}
                  alt={currency.name}
                  className="w-8 h-8"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/fallback-currency-icon.png";
                  }}
                />
                <div>
                  <div className="font-medium">{currency.name}</div>
                  <div className="text-sm text-gray-500">{currency.symbol}</div>
                </div>
                {currency.network && (
                  <span className="ml-auto text-sm text-gray-500">
                    {currency.network}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoSelector;
