import { useCompiler } from "#vue-email";
import { Resend } from "resend";
import { Constants } from "~/constants";

const runtimeConfig = useRuntimeConfig();
const resend = new Resend(runtimeConfig.RESEND_API_KEY);
export default defineEventHandler(async (event) => {
	const { userFirstName, userLastName, userEmail, siteName, siteUrl } =
		await readBody(event);
	const template = await useCompiler("Welcome.vue", {
		props: {
			userFirstName,
			userLastName,
			userEmail,
			siteName,
			siteUrl,
		},
	});

	const options = {
		from: Constants.EMAIL,
		to: userEmail,
		subject: "Kick Club Register",
		html: template.html,
	};

	await resend.emails.send(options);
	return { message: "Email sent" };
});
