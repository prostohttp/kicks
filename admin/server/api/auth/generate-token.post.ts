import clearString from "~/utils/clear-string";
interface TokenResponse {
	token: string;
	timestamp: string;
}

export default defineEventHandler(async (event): Promise<TokenResponse> => {
	try {
		const { email, getToken } = await readBody(event);
		const newToken = new Token({
			email: clearString(email),
			token: getToken.token,
			timestamp: getToken.timestamp,
		});
		const savedToken = await newToken.save();
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
