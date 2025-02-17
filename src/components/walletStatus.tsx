'use client'

import React from 'react'
import { useAccount, useDisconnect, useEnsName, useBalance } from 'wagmi'

const WalletStatus = () => {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data: balance } = useBalance({ address })
  const { disconnect } = useDisconnect()

  if (!isConnected || !address) {
    return null
  }

  // Format address to show first 6 and last 4 characters
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Connected Status Indicator */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm text-gray-600">Connected</span>
      </div>

      {/* Wallet Info */}
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-md">
        <span className="text-sm font-medium">
          {ensName || formatAddress(address)}
        </span>
        {balance && (
          <span className="text-sm text-gray-500">
            {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
          </span>
        )}
      </div>

      {/* Disconnect Button */}
      <button
        onClick={() => disconnect()}
        className="text-sm text-red-500 hover:text-red-600 transition-colors"
      >
        Disconnect
      </button>
    </div>
  )
}

export default WalletStatus