export type Currency = "CNY" | "USD";

export const RATE = {
  // Edit when needed (reference date only for your note)
  updated: "2025-09-30",
  usdPerCny: 0.14, // ≈ 1 CNY = 0.14 USD
};

export function convertFromCNY(amountCNY: number, to: Currency): number {
  return to === "CNY" ? amountCNY : amountCNY * RATE.usdPerCny;
}

export function formatMoney(amount: number | null | undefined, currency: Currency) {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
