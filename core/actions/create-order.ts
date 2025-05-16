import { CreateOrderResponse } from "@/types/common";
import { api } from "../api/api";

export const createOrder = async (paymentData: {
  expected_output_amount: number;
  input_currency: string;
  fiat: string;
  notes: string;
}): Promise<CreateOrderResponse> => {
  try {
    const response: CreateOrderResponse = await api.post(
      `/orders/`,
      paymentData
    );
    return response;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};
