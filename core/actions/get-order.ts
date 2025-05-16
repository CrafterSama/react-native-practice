import { api } from "../api/api";

export async function getOrder(
  identifier: string
): Promise<Record<string, number | any> | undefined> {
  try {
    const response = await api.get<{ [key: string]: number | any }[]>(
      `/orders/info/${identifier}`
    );
    return response;
  } catch (error) {
    throw new Error("Error fetching currencies");
  }
}
