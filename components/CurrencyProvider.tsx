"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Currency } from "@/utils/currency";
import { FALLBACK_RATE } from "@/utils/currency"; // Import the fallback rate

// [MODIFIED] The context now also provides the exchange rate
type Ctx = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  usdPerCnyRate: number; // The live rate for 1 CNY to USD
};

const CurrencyCtx = createContext<Ctx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  // [NEW] State to hold the fetched exchange rate
  const [rate, setRate] = useState<number>(FALLBACK_RATE.usdPerCny);

  // [NEW] Effect to fetch the latest currency exchange rate on mount
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await fetch("https://api.frankfurter.app/latest?from=CNY&to=USD");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (data.rates && data.rates.USD) {
          setRate(data.rates.USD);
        }
      } catch (error) {
        console.error("Failed to fetch exchange rate, using fallback:", error);
        // If the API fails, the state will already be the fallback rate
      }
    };
    fetchRate();
  }, []);

  useEffect(() => {
    const saved = (localStorage.getItem("currency") as Currency) || "USD";
    setCurrency(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  return (
    <CurrencyCtx.Provider value={{ currency, setCurrency, usdPerCnyRate: rate }}>
      {children}
    </CurrencyCtx.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyCtx);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}