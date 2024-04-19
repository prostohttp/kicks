import { User } from "~/server/models/user.schema";
import clearString from "~/utils/clear-string";

export default defineEventHandler(async (event) => {
  const { token, timestamp } = await readBody(event);
  try {

  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
