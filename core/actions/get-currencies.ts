import { api } from "../api/api";


export async function getCurrencies(): Promise<Record<string, number | any> | undefined> {

  try {
    const response = await api.get<{ [key: string]: number | any }[]>(
      `/currencies`
    );
    return response;
  } catch (error) {
    throw new Error("Error fetching currencies");
  }
}
