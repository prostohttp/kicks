import { ArticleDto } from "./dto/article.dto";

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody<ArticleDto>(event);
    const newArticle = new Article(data);
    return await newArticle.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
