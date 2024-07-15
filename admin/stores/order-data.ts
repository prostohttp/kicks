import { defineStore } from "pinia";

export interface ProductsInOrder {
  products: {
    productId: string;
    productCount: number;
    _id: string;
  }[];
}

export const useOrderDataStore = defineStore("orderData", () => {
  // vars
  const orderProducts: Ref<ProductsInOrder[] | undefined> = ref();

  // handlers
  const getOrderProducts = async () => {
    try {
      orderProducts.value = await $fetch("/api/order/all", {
        method: "GET",
        query: {
          sales: true,
        },
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
  };

  return {
    orderProducts,
    getOrderProducts,
  };
});
