import { locale } from "~/lang/locale";
import { ModelNamesForSearchEngine } from "~/types/server/server.types";
import { SettingsLocale } from "~/types/ui/ui.types";

const foundedProducts = async (searchPhrase: string, limit: number) => {
    const products = await Product.find({
        $or: [
            { title: { $regex: new RegExp(searchPhrase, "i") } },
            { description: { $regex: new RegExp(searchPhrase, "i") } },
        ],
    })
        .limit(limit)
        .select("title regularPrice description salePrice image");
    return {
        title: locale[SettingsLocale.en].allProducts,
        data: products,
    };
};

const foundedProductsWithPagination = async (
    searchPhrase: string,
    limit: number,
    page?: number,
) => {
    return await $fetch("/api/product/all", {
        method: "GET",
        query: {
            searchPhrase,
            perPage: limit,
            page,
        },
    });
};

const foundedArticles = async (searchPhrase: string, limit: number) => {
    const articles = await Article.find({
        title: { $regex: new RegExp(searchPhrase, "i") },
    })
        .limit(limit)
        .select("title image description");
    return {
        title: locale[SettingsLocale.en].allArticles,
        data: articles,
    };
};

const foundedCategories = async (searchPhrase: string, limit: number) => {
    const categories = await Category.find({
        title: { $regex: new RegExp(searchPhrase, "i") },
    })
        .limit(limit)
        .select("title productCount image");

    return {
        title: locale[SettingsLocale.en].allCategories,
        data: categories,
    };
};

const foundedBrands = async (searchPhrase: string, limit: number) => {
    const brands = await Brand.find({
        title: { $regex: new RegExp(searchPhrase, "i") },
    })
        .limit(limit)
        .select("title image");
    return {
        title: locale[SettingsLocale.en].allBrands,
        data: brands,
    };
};

export default async (
    model: ModelNamesForSearchEngine,
    searchPhrase: string,
    limit: number,
    page?: number,
) => {
    let founded: any;
    try {
        switch (model) {
            case ModelNamesForSearchEngine.PRODUCT:
                founded = {
                    result: {
                        products: await foundedProducts(searchPhrase, limit),
                    },
                };
                break;

            case ModelNamesForSearchEngine.PRODUCT_WITH_PAGINATION:
                founded = await foundedProductsWithPagination(
                    searchPhrase,
                    limit,
                    page,
                );
                break;

            case ModelNamesForSearchEngine.ARTICLES:
                founded = {
                    result: {
                        articles: await foundedArticles(searchPhrase, limit),
                    },
                };
                break;

            case ModelNamesForSearchEngine.CATEGORY:
                founded = {
                    result: {
                        categories: await foundedCategories(
                            searchPhrase,
                            limit,
                        ),
                    },
                };
                break;

            case ModelNamesForSearchEngine.BRAND:
                founded = {
                    result: {
                        brands: await foundedBrands(searchPhrase, limit),
                    },
                };
                break;

            case ModelNamesForSearchEngine.ALL:
                founded = {
                    result: {
                        products: await foundedProducts(searchPhrase, limit),
                        productsWithPagination:
                            await foundedProductsWithPagination(
                                searchPhrase,
                                limit,
                                page,
                            ),
                        articles: await foundedArticles(searchPhrase, limit),
                        categories: await foundedCategories(
                            searchPhrase,
                            limit,
                        ),
                        brands: await foundedBrands(searchPhrase, limit),
                    },
                };
                break;
            default:
                founded = {
                    result: {
                        products: await foundedProducts(searchPhrase, limit),
                    },
                };
        }
        return founded;
    } catch (error: any) {
        throw createError({ statusMessage: error.message });
    }
};
