import { ArticleDto } from "./dto/article.dto";

export default defineEventHandler(async (event) => {
    try {
        const data = await readBody<ArticleDto>(event);
        return await Article.create(data);
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
            statusCode: 409,
        });
    }
});
