export function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatPackage(amount: number): string {
  return `${formatCurrency(amount)}/yr`;
}

export function formatLocation(city: string, state: string): string {
  return `${city}, ${state}`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
