export function formatCurrency(value: number, symbol = "£"): string {
  return `${symbol}${value.toLocaleString("en-GB")}`;
}
