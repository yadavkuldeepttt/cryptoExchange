'use client'

import type { NextPage } from 'next'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import CryptoExchangeCard from '../components/CryptoExchageCard'
import WalletModal from '@/components/walletModal'
import WalletStatus from '@/components/walletStatus'

const Home: NextPage = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const { isConnected } = useAccount()

  return (
    <div className="bg-navy-900 min-h-screen relative">
      {/* Wallet Connection Section */}
      <div className="absolute top-4 right-4 z-50">
        {isConnected ? (
          <WalletStatus />
        ) : (
          <button 
            onClick={() => setIsWalletModalOpen(true)} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 shadow-lg flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Connect Wallet
          </button>
        )}
      </div>

      {/* Header */}
      <div className="p-8 pb-0 text-white">
        <h1 className="text-5xl tracking-[0.08rem] font-semibold text-center mb-2">
          Crypto Exchange
        </h1>
        <p className="text-center text-lg tracking-[0.06rem] text-base-50">
          Free from sign-up, limits, complications
        </p>
      </div>

      {/* Main Content */}
      <div className="mt-8 px-4 max-w-4xl mx-auto">
        <CryptoExchangeCard />
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-base-50 text-sm">
        <p>Please connect your wallet to start trading</p>
      </div>

      {/* Wallet Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        setIsOpen={setIsWalletModalOpen}
      />
    </div>
  )
}

export default Home