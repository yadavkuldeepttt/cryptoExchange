// types/currency.ts

export interface Currency {
    name: string;
    symbol: string;
    network?: string;
    contract_address?: string;
    has_extra_id: boolean;
    extra_id?: string;
    image: string;
    warnings_from: string[];
    warnings_to: string[];
    validation_address?: string;
    validation_extra?: string;
    address_explorer?: string;
    tx_explorer?: string;
    confirmations_from?: string;
    isFiat: boolean;
  }
  
  export interface CurrencyPair {
    from: Currency;
    to: Currency;
    rate: string;
    minimum: string;
    maximum: string;
  }
  
  export interface APIError {
    error: string;
    message: string;
  }