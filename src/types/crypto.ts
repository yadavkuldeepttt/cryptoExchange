// types/crypto.ts
export interface CryptoAsset {
  symbol: string;
  name: string;
  code: string;
  icon: string;
}

export interface CryptoInput {
  amount: string;
  currency: CryptoAsset;
}

export type Tab = 'Crypto Exchange' | 'Buy/Sell Crypto';