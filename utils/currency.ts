export type Currency = "CNY" | "USD";

export const FALLBACK_RATE = {
  updated: "2025-10-02",
  usdPerCny: 0.14,
};

// The function now requires the live rate to be passed in
export function convertFromCNY(amountCNY: number, to: Currency, usdPerCnyRate: number): number {
  if (to === "CNY") {
    return amountCNY;
  }
  return amountCNY * usdPerCnyRate;
}

export function formatMoney(amount: number | null | undefined, currency: Currency) {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}