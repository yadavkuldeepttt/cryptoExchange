"use client";

import React, { useEffect, useState } from "react";
import {
  CirclePlus,
  EqualApproximately,
  Lock,
  RefreshCw,
  ScanQrCode,
  AlertCircle,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { CryptoInput } from "@/types/crypto";
import CryptoSelector from "@/components/CryptoSelector";
import { currencyService } from "@/services/currencyService";
import { Currency } from "@/types/currency";

const ExchangeDetails = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  const [exchangeRange, setExchangeRange] = useState<{
    min: string;
    max: string;
  } | null>(null);
  const [validatingAddress, setValidatingAddress] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [processingExchange, setProcessingExchange] = useState(false);

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

  useEffect(() => {
    loadCurrencies();
  }, []);

  // useEffect(() => {
  //   if (fromCurrency?.symbol && toCurrency?.symbol) {
  //     loadExchangeInfo();
  //   }
  // }, [fromCurrency?.symbol, toCurrency?.symbol]);

  const loadCurrencies = async () => {
    try {
      setLoading(true);
      const data = await currencyService.getAllCurrencies();
      setCurrencies(data);
      console.log(data, "data");

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

  // const loadExchangeInfo = async () => {
  //   if (!fromCurrency?.symbol || !toCurrency?.symbol) return;

  //   try {
  //     const [timeEstimate, range] = await Promise.all([
  //       currencyService.getEstimatedExchangeTime(fromCurrency.symbol, toCurrency.symbol),
  //       currencyService.getRange(fromCurrency.symbol, toCurrency.symbol)
  //     ]);

  //     setEstimatedTime(timeEstimate);
  //     setExchangeRange(range);
  //   } catch (err) {
  //     setError("Failed to load exchange information");
  //   }
  // };

  const validateWalletAddress = (
    currencySymbol: string,
    address: string
  ): boolean => {
    const regex = /^[a-zA-Z0-9]{26,50}$/;
    return regex ? regex.test(address) : false; // Return true if the address matches the regex, otherwise false
  };

  // validate address function
  const validateAddress = async () => {
    if (!toCurrency?.symbol || !address) {
      setAddressError("Please enter a wallet address");
      setIsAddressValid(false); // Ensure the address is marked as invalid
      return;
    }

    try {
      setValidatingAddress(true);
      setAddressError("");

      // Basic client-side validation
      const isValid = validateWalletAddress(toCurrency.symbol, address);

      if (isValid) {
        setIsAddressValid(true); // Mark the address as valid
      } else {
        setAddressError("Invalid wallet address");
        setIsAddressValid(false); // Mark the address as invalid
      }
    } catch (err) {
      setAddressError("Failed to validate address");
      setIsAddressValid(false); // Mark the address as invalid
    } finally {
      setValidatingAddress(false);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setIsAddressValid(false);
    setAddressError("");
  };

  // exchange crypto
  const handleExchange = async () => {
    if (!isAddressValid) {
      await validateAddress();
      if (!isAddressValid) return; // Stop if the address is still invalid
    }

    console.log("after address");

    try {
      setProcessingExchange(true);
      setError("");

      console.log(fromCurrency, "fromCurrency");

      const exchange = await currencyService.createExchange({
        fixed: false, // Required in schema but missing in implementation
        currency_from: fromCurrency?.symbol || "",
        currency_to: toCurrency?.symbol || "",
        amount: fromCrypto.amount.toString(),
        address_to: address,
        extra_id_to: "", // Required in schema but missing in implementation
        user_refund_address: address, // Required in schema but missing in implementation
        user_refund_extra_id: "", // Required in schema but missing in implementation
      });

      // Handle successful exchange - you might want to redirect or show success message
      console.log("Exchange created:", exchange);
    } catch (err) {
      setError("Failed to create exchange. Please try again.");
    } finally {
      setProcessingExchange(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-[3rem] shadow-lg">
        {/* Header */}
        <div className="p-10 pb-0">
          <h1 className="text-3xl tracking-[0.08rem] font-semibold text-center mb-2">
            Add exchange details
          </h1>
          <p className="text-center text-sm tracking-[0.06rem] text-gray-400">
            {estimatedTime > 0
              ? `Waiting time after we get the deposit: ${Math.round(
                  estimatedTime / 60
                )} min`
              : "Loading estimated time..."}
          </p>
        </div>

        {/* Exchange Form */}
        <div className="px-12 pt-12 pb-6 space-y-4">
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
                    className="bg-transparent text-xl font-medium outline-none text-end w-full"
                  />
                </div>
              </div>

              <CryptoSelector
                currencies={currencies}
                selectedCurrency={fromCurrency}
                onSelect={setFromCurrency}
                className="rounded-e-lg"
              />
            </div>

            {exchangeRange && (
              <div className="text-sm text-gray-600 mt-2 px-4">
                Min: {exchangeRange.min} {fromCurrency?.symbol} | Max:{" "}
                {exchangeRange.max} {fromCurrency?.symbol}
              </div>
            )}
          </div>

          {/* Rate Info */}
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center text-gray-600">
              <Lock size={16} className="mr-2" />
              <span className="tracking-[0.05rem]">Floating rate</span>
            </div>
            <div className="flex items-center gap-4">
              {estimatedTime > 0 && (
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-2" />
                  <span>≈ {Math.round(estimatedTime / 60)} min</span>
                </div>
              )}
              <div className="bg-[#ecf1f7] p-2 rounded text-blue-500 hover:bg-[#0044c9] hover:text-white">
                <RefreshCw size={16} className="cursor-pointer" />
              </div>
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
                selectedCurrency={toCurrency}
                onSelect={setToCurrency}
                className="rounded-tr-xl"
              />
            </div>

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
              <label className="absolute left-3 tracking-[0.07rem] font-medium text-gray-600 transition-all duration-200 transform peer-placeholder-shown:text-lg peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:text-sm peer-focus:-translate-y-0 top-2 text-sm">
                The recipient's {toCurrency?.name} address
              </label>
              <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                onBlur={validateAddress}
                placeholder=" "
                className="peer bg-transparent text-xl font-medium outline-none w-full pt-4"
              />
              <div className="absolute top-[1.3rem] right-4 flex items-center gap-2">
                {validatingAddress ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : isAddressValid ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : null}
                <ScanQrCode className="cursor-pointer" />
              </div>
            </div>

            {addressError && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle size={16} className="mr-2" />
                {addressError}
              </div>
            )}

            {error && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle size={16} className="mr-2" />
                {error}
              </div>
            )}

            <button
              onClick={handleExchange}
              disabled={processingExchange || loading}
              className="w-full bg-blue-500 text-white py-4 rounded-xl text-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {processingExchange ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  Creating exchange...
                </span>
              ) : (
                "Create an exchange"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeDetails;
