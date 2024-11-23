import { defineStore } from "pinia";
import { useOrderDataStore } from "./order-data";

export interface SaleProducts {
    [key: string]: number;
}

export const useStatsDataStore = defineStore(
    "statsData",
    () => {
        // state
        const orderDataStore = useOrderDataStore();

        // vars
        const saleProducts: Ref<SaleProducts | undefined> = ref();

        // handlers
        const getSaleProducts = async () => {
            await orderDataStore.getOrderProducts();
            const orders = orderDataStore.orderProducts;
            if (orders) {
                const products = orders.map((order) => order.products).flat();
                const sales: SaleProducts = {};
                products.forEach((product) => {
                    if (product.productId in sales) {
                        sales[product.productId] =
                            Number(sales[product.productId]) +
                            Number(product.productCount);
                    } else {
                        sales[product.productId] = product.productCount;
                    }
                });
                saleProducts.value = sales;
            }
            return true;
        };

        return {
            saleProducts,
            getSaleProducts,
        };
    },
    {
        // persist: true,
    },
);
