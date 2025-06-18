import { useCompiler } from "#vue-email";
import { Resend } from "resend";
import { Constants } from "~/constants";
import type { EmailRegisterDto } from "~/types/server/server.types";

const runtimeConfig = useRuntimeConfig();
const resend = new Resend(runtimeConfig.NUXT_RESEND_API_KEY);
export default defineEventHandler(async (event) => {
    const { name, userEmail, siteName, siteUrl } =
        await readBody<EmailRegisterDto>(event);
    const template = await useCompiler("welcome.vue", {
        props: {
            name,
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
