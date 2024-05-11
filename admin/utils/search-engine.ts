import { ModelNamesForSearchEngine } from "~/types/server/server.types";

const foundedProducts = async (searchPhrase: string) => {
  const products = await Product.find({
    title: { $regex: new RegExp(searchPhrase, "i") },
  }).select("title description regularPrice salePrice image");
  return {
    title: "Products",
    data: products,
  };
};

const foundedArticles = async (searchPhrase: string) => {
  const articles = await Article.find({
    title: { $regex: new RegExp(searchPhrase, "i") },
  }).select("title image description");
  return {
    title: "Articles",
    data: articles,
  };
};

const foundedCategories = async (searchPhrase: string) => {
  const categories = await Category.find({
    title: { $regex: new RegExp(searchPhrase, "i") },
  }).select("title productCount image");
  return {
    title: "Categories",
    data: categories,
  };
};

const foundedBrands = async (searchPhrase: string) => {
  const brands = await Brand.find({
    title: { $regex: new RegExp(searchPhrase, "i") },
  }).select("title image");
  return {
    title: "Brands",
    data: brands,
  };
};

export default async (
  model: ModelNamesForSearchEngine,
  searchPhrase: string,
) => {
  let founded: any;
  try {
    switch (model) {
      case ModelNamesForSearchEngine.PRODUCT:
        founded = founded = {
          result: { products: await foundedProducts(searchPhrase) },
        };
        break;

      case ModelNamesForSearchEngine.ARTICLES:
        founded = founded = {
          result: { articles: await foundedArticles(searchPhrase) },
        };
        break;

      case ModelNamesForSearchEngine.CATEGORY:
        founded = founded = {
          result: { categories: await foundedCategories(searchPhrase) },
        };
        break;

      case ModelNamesForSearchEngine.BRAND:
        founded = {
          result: { brands: await foundedBrands(searchPhrase) },
        };
        break;

      case ModelNamesForSearchEngine.ALL:
        founded = {
          result: {
            products: await foundedProducts(searchPhrase),
            articles: await foundedArticles(searchPhrase),
            categories: await foundedCategories(searchPhrase),
            brands: await foundedBrands(searchPhrase),
          },
        };
        break;
      default:
        founded = {
          result: { products: await foundedProducts(searchPhrase) },
        };
    }
    return founded;
  } catch (error: any) {
    throw createError({ statusMessage: error.message });
  }
};
