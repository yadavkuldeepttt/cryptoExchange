// services/currencyService.ts

import { Currency, CurrencyPair, APIError } from "../types/currency";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_REQUEST_URL;

class APIResponseError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "APIResponseError";
  }
}

// Helper function to get client information
const getClientInfo = () => {
  if (typeof window === "undefined") return null;

  return {
    "x-forwarded-for": "", // This should be set by your server/proxy
    "x-user-agent": window.navigator.userAgent,
    "x-user-timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    "x-user-language": window.navigator.language,
  };
};

// Common headers for all requests
const getHeaders = () => {
  const clientInfo = getClientInfo();
  return {
    "Content-Type": "application/json",
    ...(clientInfo || {}),
  };
};

export const currencyService = {
  /**
   * Fetches all available currencies from the SimpleSwap API
   */
  async getAllCurrencies(): Promise<Currency[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/get_all_currencies?api_key=${API_KEY}`
      );

      if (!response.ok) {
        const errorData: APIError = await response.json();
        throw new APIResponseError(
          response.status,
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const currencies: Currency[] = await response.json();
      return currencies;
    } catch (error) {
      if (error instanceof APIResponseError) {
        throw error;
      }
      throw new Error("Failed to fetch currencies: Network error");
    }
  },

  /**
   * Get exchange rate and limits for a currency pair
   */
  async getExchangePair(
    fromCurrency: string,
    toCurrency: string,
    amount?: string
  ): Promise<CurrencyPair> {
    try {
      const params = new URLSearchParams({
        api_key: API_KEY,
        fixed: "false",
        currency_from: fromCurrency,
        currency_to: toCurrency,
      });

      if (amount) {
        params.append("amount", amount);
      }

      const response = await fetch(`${BASE_URL}/get_pairs?${params}`);

      if (!response.ok) {
        const errorData: APIError = await response.json();
        throw new APIResponseError(
          response.status,
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof APIResponseError) {
        throw error;
      }
      throw new Error("Failed to fetch exchange pair: Network error");
    }
  },

  /**
   * Validate cryptocurrency address
   */
  async validateAddress(currency: string, address: string): Promise<boolean> {
    try {
      const params = new URLSearchParams({
        api_key: API_KEY,
        currency: currency,
        address: address,
      });

      const response = await fetch(`${BASE_URL}/validate/address?${params}`);

      if (!response.ok) {
        const errorData: APIError = await response.json();
        throw new APIResponseError(
          response.status,
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const { valid } = await response.json();
      return valid;
    } catch (error) {
      if (error instanceof APIResponseError) {
        throw error;
      }
      throw new Error("Failed to validate address: Network error");
    }
  },

  /**
   * Get range of possible exchanges for currency pair
   */
  async getRange(
    fromCurrency: string,
    toCurrency: string
  ): Promise<{ min: string; max: string }> {
    try {
      const params = new URLSearchParams({
        api_key: API_KEY,
        currency_from: fromCurrency,
        currency_to: toCurrency,
      });

      const response = await fetch(`${BASE_URL}/get_ranges?${params}`);

      if (!response.ok) {
        const errorData: APIError = await response.json();
        throw new APIResponseError(
          response.status,
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof APIResponseError) {
        throw error;
      }
      throw new Error("Failed to fetch exchange range: Network error");
    }
  },

  /**
   * Get estimated exchange time for currency pair
   */
  async getEstimatedExchangeTime(
    fromCurrency: string,
    toCurrency: string
  ): Promise<number> {
    try {
      const params = new URLSearchParams({
        api_key: API_KEY,
        currency_from: fromCurrency,
        currency_to: toCurrency,
      });

      const response = await fetch(
        `${BASE_URL}/get_estimated_exchange_time?${params}`
      );

      if (!response.ok) {
        const errorData: APIError = await response.json();
        throw new APIResponseError(
          response.status,
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const { estimated_time } = await response.json();
      return estimated_time;
    } catch (error) {
      if (error instanceof APIResponseError) {
        throw error;
      }
      throw new Error("Failed to fetch estimated exchange time: Network error");
    }
  },

  /**
   * Create a new exchange
   */

  async createExchange(params: {
    fixed?: boolean;
    currency_from: string;
    currency_to: string;
    amount: string;
    address_to: string;
    extra_id_to?: string;
    user_refund_address: string;
    user_refund_extra_id: string;
  }) {
    try {
      const clientInfo = getClientInfo();
      if (!clientInfo) {
        throw new Error("Unable to get client information");
      }

      if (!API_KEY) {
        throw new Error("API key is not configured");
      }

      const requestParams = new URLSearchParams({
        api_key: API_KEY,
        ...clientInfo,
      });

      const response = await fetch(
        `${BASE_URL}/create_exchange?${requestParams}`,
        {
          method: "POST",
          headers: getHeaders(),
        }
      );

      console.log(response, "response");

      if (!response.ok) {
        const errorData: APIError = await response.json();
        throw new APIResponseError(
          response.status,
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof APIResponseError) {
        throw error;
      }
      throw new Error("Failed to create exchange: Network error");
    }
  },
};
