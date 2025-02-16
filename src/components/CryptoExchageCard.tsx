// components/CryptoExchangeCard.tsx
import React, { useEffect, useState } from "react";
import { EqualApproximately, Lock, RefreshCw } from "lucide-react";
import { CryptoInput, Tab } from "@/types/crypto";
import TabSelector from "./TabSelector";
import CryptoSelector from "./CryptoSelector";
import { useRouter } from "next/navigation";
import { Currency } from "@/types/currency";
import { currencyService } from "@/services/currencyService";

const CryptoExchangeCard = () => {
  const router = useRouter();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);
  // const [amount, setAmount] = useState<string>("");
  // const [exchangeRate, setExchangeRate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  // const [extraId, setExtraId] = useState<string>("");

  const [activeTab, setActiveTab] = useState<Tab>("Crypto Exchange");
  const [fromCrypto, setFromCrypto] = useState<CryptoInput>({
    amount: "0.1",
    currency: {
      symbol: "₿",
      name: "BTC",
      code: "BTC",
      icon: "https://static.simpleswap.io/images/currencies-logo/btc.svg",
    },
  });

  const [toCrypto, setToCrypto] = useState<CryptoInput>({
    amount: "3.56817577",
    currency: {
      symbol: "Ξ",
      name: "ETH",
      code: "ETH",
      icon: "https://static.simpleswap.io/images/currencies-logo/eth.svg",
    },
  });

  const tabs: Tab[] = ["Crypto Exchange", "Buy/Sell Crypto"];

  useEffect(() => {
    loadCurrencies();
  }, []);

  const loadCurrencies = async () => {
    try {
      setLoading(true);
      const data = await currencyService.getAllCurrencies();
      console.log(data, "data");

      setCurrencies(data);
      if (data.length > 0) {
        setFromCurrency(data[0]);
        setToCurrency(data[1]);
      }
    } catch (err) {
      setError("Failed to load currencies");
    } finally {
      setLoading(false);
    }
  };

  const handleExchange = () => {
    router.push("/exchange");
    console.log("Navigating to exchange details...");
  };

  return (
    <div className="mt-5 bg-navy-900 flex items-center justify-center ">
      <div className="w-full max-w-3xl bg-white rounded-[3rem] shadow-lg">
        {/* Tab Selector */}
        <TabSelector
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Exchange Form */}
        <div className="p-12 pt-6 space-y-4">
          {/* From Currency Input */}
          <div className="">
            <div className="flex items-center">
              <div className="bg-[#ecf1f7] rounded-s-lg focus-within:bg-white focus-within:border py-5 px-4 flex-1 items-center me-2">
                <div className="flex items-center">
                  <span className="w-full text-gray-600">You Send</span>
                  <input
                    type="text"
                    value={fromCrypto.amount}
                    onChange={(e) =>
                      setFromCrypto({ ...fromCrypto, amount: e.target.value })
                    }
                    className="bg-transparent text-xl font-medium outline-none text-end w-full "
                  />
                </div>
              </div>

              <CryptoSelector
                  currencies={currencies}
                  selectedCurrency={toCurrency}
                  onSelect={setToCurrency}
                className="rounded-e-lg"
              />
            </div>
          </div>

          {/* Rate Info */}
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center text-gray-600">
              <Lock size={16} className="mr-2" />
              <span className="tracking-[0.05rem]">Floating rate</span>
            </div>
            <div className="bg-[#ecf1f7] p-2 rounded text-blue-500 hover:bg-[#0044c9] hover:text-white">
              <RefreshCw size={16} className=" cursor-pointer" />
            </div>
          </div>

          {/* To Currency Input */}
          <div className="border border-t-0 rounded-xl">
            <div className="flex items-center">
              <div className="bg-[#ecf1f7] rounded-tl-xl py-5 px-4 flex-1 items-center me-2">
                <div className="flex items-center">
                  <span className="w-full text-gray-600">You Get</span>

                  <span className="text-xl flex items-center">
                    <EqualApproximately size={15} />
                    <span>{toCrypto.amount}</span>
                  </span>
                </div>
              </div>

              <CryptoSelector
                currencies={currencies}
                selectedCurrency={fromCurrency}
                onSelect={setFromCurrency}
                className="rounded-tr-xl"
              />
            </div>

            {/* Sign up prompt */}
            <div className="text-start mx-3 text-[16px] font-medium tracking-[0.05rem] py-5">
              <a href="#" className="text-blue-500 font-semibold underline">
                Sign up
              </a>
              <span className="text-gray-600">
                {" "}
                to get cashback up to 38.48 USDT
              </span>
            </div>
          </div>

          {/* Exchange Button */}
          <button
            onClick={handleExchange}
            className="w-full bg-blue-500 text-white py-4 rounded-xl text-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Exchange
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoExchangeCard;
