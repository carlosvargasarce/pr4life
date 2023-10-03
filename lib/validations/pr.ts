import * as z from "zod";

export const PRValidation = z.object({
    accountId: z.string()
})