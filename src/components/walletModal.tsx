"use client"
import React, { useState } from 'react';

const WalletModal = ({ isOpen, setIsOpen }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [step, setStep] = useState('select'); // 'select' or 'connect'

  const wallets = [
    {
      name: 'MetaMask',
      icon: '🦊',
      description: 'Connect to your MetaMask Wallet',
    },
    {
      name: 'Coinbase Wallet',
      icon: '📱',
      description: 'Connect to your Coinbase Wallet',
    }
  ];

  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
    setStep('connect');
  };

  const handleBack = () => {
    setStep('select');
    setSelectedWallet(null);
  };

  const connectWallet = async () => {
    if (selectedWallet?.name === 'MetaMask') {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setIsOpen(false);
        } else {
          window.open('https://metamask.io/download/', '_blank');
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    }
    // Add Coinbase Wallet connection logic here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {step === 'select' ? 'Connect Wallet' : `Connect to ${selectedWallet?.name}`}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {step === 'select' ? (
          <div className="space-y-4">
            {wallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleWalletSelect(wallet)}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{wallet.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold">{wallet.name}</div>
                    <div className="text-sm text-gray-500">{wallet.description}</div>
                  </div>
                </div>
                <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">{selectedWallet?.icon}</div>
            <p className="text-gray-600 mb-6">
              Connect to {selectedWallet?.name} to start trading cryptocurrencies securely.
            </p>
            <div className="space-y-4">
              <button
                onClick={connectWallet}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Connect {selectedWallet?.name}
              </button>
              <button
                onClick={handleBack}
                className="w-full text-gray-600 hover:text-gray-800 transition-colors"
              >
                Back to Wallet Selection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletModal;