interface TokenResponse {
    token: string;
    timestamp: string;
}

export default defineEventHandler(async (event): Promise<TokenResponse> => {
    try {
        const { email, getToken } = await readBody(event);
        const savedToken = await Token.create({
            email,
            token: getToken.token,
            timestamp: getToken.timestamp,
        });
        return {
            token: savedToken.token.toString(),
            timestamp: savedToken.timestamp.toString(),
        };
    } catch (error) {
        throw createError({
            statusMessage: "Error generating token",
        });
    }
});
