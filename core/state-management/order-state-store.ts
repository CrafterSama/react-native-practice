import { CreateOrderResponse } from "@/types/common";
import { create, useStore } from "zustand";

type orderStoreProps = {
  order: CreateOrderResponse | null;
  setOrder: (order: orderStoreProps["order"]) => void;
};

const orderStore = create<orderStoreProps>((set) => ({
  order: null,
  setOrder: (order: orderStoreProps["order"]) => {
    set(() => ({ order }));
  },
}));

const useOrderStore = () => useStore(orderStore);

export default useOrderStore;
