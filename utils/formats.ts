const currencyToLocaleMap: Record<string, string> = {
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  ARS: "es-AR",
  MXN: "es-MX",
  BRL: "pt-BR",
};

export const formatCurrency = (
  value: string | number,
  currency: string
): string => {
  const locale = currencyToLocaleMap[currency] || "en-US";
  const numberValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numberValue)) return "";

  let decimals = 2;
  if (numberValue < 0.01) decimals = 2;
  else if (numberValue < 0.1) decimals = 2;
  else if (numberValue < 1) decimals = 2;
  else if (numberValue >= 1000) decimals = 2;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(numberValue);
};

export const formatPrice = (value: string | number, currency: string) => {
  const locale = currencyToLocaleMap[currency] || "en-US";
  const numberValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numberValue)) return "";

  let decimals = 2;
  if (numberValue < 0.01) decimals = 2;
  else if (numberValue < 0.1) decimals = 2;
  else if (numberValue < 1) decimals = 2;
  else if (numberValue >= 1000) decimals = 2;

  return `${
    currency === "USD" ? "$" : currency === "GBP" ? "£" : ""
  } ${numberValue.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })} ${currency === "EUR" ? "€" : ""}`.trim();
};
