import { useCompiler } from "#vue-email";
import { Resend } from "resend";
import { Constants } from "~/constants";

const runtimeConfig = useRuntimeConfig();
const resend = new Resend(runtimeConfig.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
	const { email, siteName, siteUrl, token } = await readBody(event);
	const template = await useCompiler("ForgotPassword.vue", {
		props: {
			siteName,
			siteUrl,
			token: siteUrl + token,
		},
	});

	const options = {
		from: Constants.EMAIL,
		to: email,
		subject: "Forgot password - Kick Club",
		html: template.html,
	};

	await resend.emails.send(options);
	return { message: "Email sent" };
});
