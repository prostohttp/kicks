import { defineStore } from "pinia";
import type { OrderStatusDto } from "~/server/api/order-status/dto/order-status.dto";

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
    const orderStatusList: Ref<OrderStatusDto[]> = ref([]);

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

    const getOrderStatusList = async () => {
        try {
            orderStatusList.value = await $fetch("/api/order-status/all", {
                method: "GET",
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
        return true;
    };

    const getOrderStatus = async (id: string): Promise<OrderStatusDto> => {
        return await $fetch("/api/order-status/one", {
            method: "GET",
            query: {
                id,
            },
        });
    };

    return {
        orderProducts,
        orderStatusList,
        getOrderProducts,
        getOrderStatusList,
        getOrderStatus,
    };
});
