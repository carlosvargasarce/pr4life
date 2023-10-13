import * as z from "zod";

export const PersonalRecordsValidation = z.object({
    //variation: z.string().min(0).max(300),
    entryDate: z.date({
        required_error: "An entry date is required.",
    }),
    //unit: z.string().min(0).max(300),
    //value: z.string().min(0).max(300),
    details: z.string().min(3, {
        message: "Details must contain at least 3 character(s)."
    }).max(1000),
    accountId: z.string()
})