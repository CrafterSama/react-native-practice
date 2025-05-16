export interface Currency {
  symbol: string;
  name: string;
  min_amount: string;
  max_amount: string;
  image: string;
  blockchain: string;
}

export interface CreateOrderResponse {
  identifier: string;
  reference: string;
  payment_uri: string;
  web_url: string;
  address: string;
  tag_memo: string;
  input_currency: string;
  expected_input_amount: number;
  rate: number;
  notes: string;
  fiat: "EUR" | "USD" | "GBC";
  language: "ES" | "EN";
}

export interface PaymentOrder {
  identifier: string;
  reference: string;
  expected_output_amount: number;
  fiat_currency: Currency;
  concept: string;
  status: PaymentStatus;
  web_url: string;
  created_at: string;
  updated_at: string;
}

export type PaymentStatus =
  | "pending"
  | "confirming"
  | "confirmed"
  | "completed"
  | "failed"
  | "expired";

export interface ShareOption {
  name: string;
  icon: string;
  action: (url: string) => void;
}
