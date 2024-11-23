import { Constants } from "~/constants";
import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const page = Number(query.page) || 1;
        const all = query.all;
        const perPage = Number(query.perPage) || Constants.PER_PAGE_PRODUCT;
        const searchPhrase = query.searchPhrase?.toString();
        const titles = query.titles;
        const forCategoryCount = Boolean(query.forCategoryCount);
        const categoryId = query.category;
        const products = await Product.find().populate({
            path: "category",
            select: "title",
        });

        if (all) {
            return await Product.find();
        }

        const allFoundedProducts = await Product.find({
            $or: [
                { title: { $regex: new RegExp(searchPhrase!, "i") } },
                { description: { $regex: new RegExp(searchPhrase!, "i") } },
            ],
        }).populate({
            path: "category",
            select: "title",
        });

        const allFoundedProductsLength = allFoundedProducts.length;
        const productsLength = products.length;
        const pagesInPagination = pageCount(productsLength, perPage);

        if (categoryId) {
            const productsInCategory = await Product.find({
                category: { $in: [categoryId] },
            }).populate({
                path: "category",
                select: "title",
            });
            const productsInCategoryLength = productsInCategory.length;
            const pagesInPagination = pageCount(
                productsInCategoryLength,
                perPage,
            );
            const skip = page * perPage - perPage;
            const productsPerPage = await Product.find({
                category: { $in: [categoryId] },
            })
                .populate({
                    path: "category",
                    select: "title",
                })
                .skip(skip)
                .limit(perPage);

            return {
                products:
                    page <= pagesInPagination
                        ? productsPerPage
                        : productsInCategory,
                pagesInPagination:
                    pagesInPagination > 1 && page <= pagesInPagination
                        ? pagesInPagination
                        : 0,
                activePage: page,
                allItems: productsInCategoryLength,
            };
        }

        if (titles) {
            return await Product.find().select("title");
        }

        if (forCategoryCount) {
            return await Product.find().select("category");
        }

        if (
            isValidPaginationPage(
                page,
                pagesInPagination,
                productsLength,
                perPage,
            ) &&
            !searchPhrase
        ) {
            return {
                products,
                pagesInPagination: 0,
                allItems: productsLength,
            };
        }

        if (searchPhrase) {
            const skip = page * perPage - perPage;

            const productsInPage = await Product.find({
                $or: [
                    {
                        title: {
                            $regex: new RegExp(searchPhrase.toString(), "i"),
                        },
                    },
                    {
                        description: {
                            $regex: new RegExp(searchPhrase.toString(), "i"),
                        },
                    },
                ],
            })
                .populate({
                    path: "category",
                    select: "title",
                })
                .skip(skip)
                .limit(perPage);

            if (
                isValidPaginationPage(
                    page,
                    pagesInPagination,
                    allFoundedProductsLength,
                    perPage,
                )
            ) {
                return {
                    products: allFoundedProducts,
                    pagesInPagination: 0,
                    allItems: allFoundedProductsLength,
                };
            }
            return {
                products: productsInPage,
                pagesInPagination,
                activePage: page,
                allItems: allFoundedProductsLength,
            };
        }

        const skip = page * perPage - perPage;
        const productsInPage = await Product.find()
            .populate({
                path: "category",
                select: "title",
            })
            .skip(skip)
            .limit(perPage);
        return {
            products: productsInPage,
            pagesInPagination,
            activePage: page,
            allItems: productsLength,
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
