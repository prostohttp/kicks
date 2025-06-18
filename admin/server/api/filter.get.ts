// TODO: Перенести на сайт
interface IOption {
    _id: string;
    title: string;
}

interface IOptionValue {
    _id: string;
    value: string;
}

export default defineEventHandler(async (event) => {
    try {
        const params = getQuery(event);
        const filteredArray = [];

        const products = await Product.find({
            options: { $exists: true, $ne: [] },
            isEnabled: true,
        })
            .populate({
                path: "options.optionId",
                select: "title",
            })
            .populate({
                path: "options.values.valueId",
                select: "value",
            });

        // TODO: Перенести на сайт
        // for (const product of products) {
        //     for (const option of product.options) {
        //         const opt = option.optionId as unknown as IOption;
        //         const optionTitle = opt.title;
        //         if (optionTitle in params) {
        //             for (const value of option.values) {
        //                 const val = value.valueId as unknown as IOptionValue;
        //                 const optionValue = val.value;
        //                 if (
        //                     params[optionTitle]
        //                         ?.toString()
        //                         .split(",")
        //                         .includes(optionValue)
        //                 ) {
        //                     filteredArray.push(product);
        //                 }
        //             }
        //         }
        //     }
        // }
        return products;
        // TODO: Перенести на сайт
        return filteredArray;
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
