import { ArticleDto } from "./dto/article.dto";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<ArticleDto>(event);
        const article = await Article.findById(body._id);
        if (!article) {
            throw createError({ statusMessage: "Article not found" });
        }
        return await Article.findByIdAndUpdate(body._id, body, {
            new: true,
        });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
