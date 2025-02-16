// pages/index.tsx

"use client" 

import type { NextPage } from 'next';
import CryptoExchangeCard from '../components/CryptoExchageCard';
import WalletModal from '@/components/walletModal';
import { useState } from 'react';

const Home: NextPage = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  return (
    <div className="bg-navy-900 min-h-screen relative">
        {/* Connect Wallet Button */}
        <div className="absolute top-4 right-4 z-50">
        <button onClick={() => setIsWalletModalOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 shadow-lg">
          Connect Wallet
        </button>
      </div>
        {/* Header */}
        <div className="p-8 pb-0 text-white">
          <h1 className="text-5xl tracking-[0.08rem] font-semibold text-center mb-2">Crypto Exchange</h1>
          <p className="text-center text-lg tracking-[0.06rem] text-base-50 ">
            Free from sign-up, limits, complications
          </p>
        </div>

      <CryptoExchangeCard />

      <WalletModal 
        isOpen={isWalletModalOpen}
        setIsOpen={setIsWalletModalOpen}
      />
    </div>
  );
};

export default Home;