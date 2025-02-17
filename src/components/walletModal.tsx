'use client'

import { MoveLeft } from 'lucide-react'
import React, { useState } from 'react'
import { useConnect, useAccount } from 'wagmi'

interface WalletModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, setIsOpen }) => {
  const [step, setStep] = useState('select')
  const { connectors, connect, status, error } = useConnect()
  const { isConnected } = useAccount()

  const handleWalletSelect = async (connector) => {
    try {
      if (connector.id === 'injected' && !window.ethereum) {
        window.open('https://metamask.io/download/', '_blank')
        return
      }
      setStep('connect')
      await connect({ connector })
    } catch (err) {
      console.error('Connection error:', err)
      setStep('select')
    }
  }

  const handleBack = () => {
    setStep('select')
  }

  React.useEffect(() => {
    if (isConnected) {
      setIsOpen(false)
    }
  }, [isConnected, setIsOpen])

  if (!isOpen) return null

  const getWalletIcon = (id: string) => {
    switch (id) {
      case 'injected':
        return '🦊'
      case 'coinbaseWallet':
        return '📱'
      case 'walletConnect':
        return '🔗'
      default:
        return '💳'
    }
  }

  const getWalletButtonText = (connector) => {
    if (connector.id === 'injected') {
      if (!window.ethereum) {
        return 'Install MetaMask'
      }
      return 'Connect with MetaMask'
    }
    return `Connect with ${connector.name}`
  }

  const getWalletStatus = (connector) => {
    if (connector.id === 'injected') {
      if (!window.ethereum) {
        return 'Click to install'
      }
      return 'Connect to your wallet'
    }
    return connector.ready ? 'Connect to your wallet' : 'Not available'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {step === 'select' ? 'Connect Wallet' : 'Connecting Wallet'}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error.message}
          </div>
        )}

        {step === 'select' ? (
          <div className="space-y-4">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => handleWalletSelect(connector)}
                disabled={!connector.ready && connector.id !== 'injected'}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{getWalletIcon(connector.id)}</span>
                  <div className="text-left">
                    <div className="font-semibold">{getWalletButtonText(connector)}</div>
                    <div className="text-sm text-gray-500">
                      {getWalletStatus(connector)}
                    </div>
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
            <div className="mb-4">
              {status === 'connecting' ? (
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" />
              ) : (
                <div className="text-6xl mb-4">💳</div>
              )}
            </div>
            <p className="text-gray-600 mb-6">
              {status === 'connecting'
                ? 'Connecting to wallet...'
                : 'Opening wallet for connection'}
            </p>
            <button
              onClick={handleBack}
              className="w-full flex gap-2 bg-gray-100 py-2 items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
            >
             <MoveLeft size={14} /> 
             <span>Back to Wallet Selection</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WalletModal