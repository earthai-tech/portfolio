"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Currency } from "@/utils/currency";

type Ctx = { currency: Currency; setCurrency: (c: Currency) => void };
const CurrencyCtx = createContext<Ctx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("CNY");
  useEffect(() => {
    const saved = (localStorage.getItem("currency") as Currency) || "CNY";
    setCurrency(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);
  return <CurrencyCtx.Provider value={{ currency, setCurrency }}>{children}</CurrencyCtx.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyCtx);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
