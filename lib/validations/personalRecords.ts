import * as z from "zod";

export const PersonalRecordsValidation = z.object({
    name: z.string({
        required_error: "A name is required.",
    })
    .max(300)
    .refine((value) => value.trim().length >= 3, {
        message: "Name is required and must be at least 3 characters long",
    }),

    variation: z.string({
        required_error: "A variation is required.",
    })
    .max(300)
    .refine((value) => value.trim().length >= 3, {
        message: "Variation is required and must be at least 3 characters long",
    }),

    entryDate: z.date({
        required_error: "An entry date is required.",
    }),

    unit: z.string({
        required_error: "A unit is required.",
    })
    .max(300)
    .refine((value) => value.trim() !== "", {
        message: "Unit is required and must not be empty",
    }),

    value: z.string({
        required_error: "A value is required.",
    })
    .max(300)
    .refine((value) => value.trim() !== "", {
        message: "Value is required and must not be empty",
    }),

    details: z.string().max(1000),

    accountId: z.string()
})