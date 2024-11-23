import { useCompiler } from "#vue-email";
import { Resend } from "resend";
import { Constants } from "~/constants";

const runtimeConfig = useRuntimeConfig();
const resend = new Resend(runtimeConfig.NUXT_RESEND_API_KEY);

export default defineEventHandler(async (event) => {
    const { email, siteName, siteUrl, token } = await readBody(event);
    const template = await useCompiler("forgot-password.vue", {
        props: {
            siteName,
            siteUrl,
            token: siteUrl + token,
        },
    });

    const options = {
        from: Constants.EMAIL,
        to: email,
        subject: "Reset password - Kick Club",
        html: template.html,
    };

    await resend.emails.send(options);
    return { message: "Email sent" };
});
