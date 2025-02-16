"use client";

import React, { useState } from "react";
import {
  CirclePlus,
  EqualApproximately,
  Lock,
  RefreshCw,
  ScanQrCode,
} from "lucide-react";
import { CryptoInput, Tab } from "@/types/crypto";
import CryptoSelector from "@/components/CryptoSelector";

const ExchangeDetails = () => {
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

  const handleExchange = () => {
    console.log("Navigating to exchange details...");
  };

  return (
    <div className=" bg-gray-100 min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-3xl bg-white rounded-[3rem] shadow-lg">
        {/* Header */}
        <div className="p-10 pb-0 ">
          <h1 className="text-3xl tracking-[0.08rem] font-semibold text-center mb-2">
            Add exchange details
          </h1>
          <p className="text-center text-sm  tracking-[0.06rem] text-gray-400 ">
            Waiting time after we get the deposit: 3 min
          </p>
        </div>

        {/* Exchange Form */}
        <div className="px-12 pt-12 pb-6 pt-6 space-y-4">
          {/* From Currency Input */}
          <div className="">
            <div className="flex items-center">
              <div className="bg-[#ecf1f7] focus-within:bg-white focus-within:border rounded-s-lg py-5 px-4 flex-1 items-center me-2">
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
                selectedCrypto={fromCrypto.currency}
                onSelect={(crypto) =>
                  setFromCrypto({ ...fromCrypto, currency: crypto })
                }
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
                selectedCrypto={toCrypto.currency}
                onSelect={(crypto) =>
                  setFromCrypto({ ...toCrypto, currency: crypto })
                }
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
        </div>
        <div className="bg-gray-50 py-5 px-12">
          <div className="flex items-center justify-between">
            <span className="font-semibold tracking-[0.05rem] text-[18px]">
              Enter the wallet address
            </span>
            <button className="flex text-blue-600 font-medium items-center gap-2">
              <span>Wallets</span>
              <CirclePlus size={17} />
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="relative font-semibold bg-white transition-colors duration-200 rounded-lg p-3">
              <label
                className="absolute left-3 tracking-[0.07rem] font-medium text-gray-600 transition-all duration-200 transform
         peer-placeholder-shown:text-lg
         peer-placeholder-shown:top-1/2
         peer-placeholder-shown:-translate-y-1/2
         peer-focus:top-2
         peer-focus:text-sm
         peer-focus:-translate-y-0
         top-2
         text-sm"
              >
                The recipient's Ethereum address
              </label>
              <input
                type="text"
                placeholder=" "
                className="peer bg-transparent text-xl font-medium outline-none w-full pt-4"
              />
              <div className="absolute top-[1.3rem] cursor-pointer right-4">
                <ScanQrCode />
              </div>
            </div>

            <button
              onClick={handleExchange}
              className="w-full bg-blue-400 text-white py-4 rounded-xl text-lg font-medium hover:bg-blue-600 transition-colors duration-200"
            >
              Create an exchange
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeDetails;
