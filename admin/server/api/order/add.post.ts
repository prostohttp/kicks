import { customAlphabet } from "nanoid";
import { OrderDto } from "~/server/api/order/dto/order.dto";
import { OrderStatusTypes, Roles } from "~/types/server/server.types";

const nanoid = customAlphabet("1234567890", 5);
export default defineEventHandler(async (event) => {
    try {
        const body: OrderDto = await readBody(event);
        const user = await User.findById(body.customer);
        if (user && user.role.toString() !== Roles.CUSTOMER) {
            return createError({ statusMessage: "Only customers can order" });
        }
        return await Order.create({
            ...body,
            orderId: "#" + nanoid(),
            // FIXME: Заказы не будут создаваться из админки, но все равно переделать
            status: OrderStatusTypes.PROCESSING,
        });
    } catch (error: any) {
        return createError({
            statusMessage: error.message,
        });
    }
});
