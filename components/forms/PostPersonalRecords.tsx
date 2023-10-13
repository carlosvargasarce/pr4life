"use client";

import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

//import { updateUser } from "@/lib/actions/user.actions";
import { PersonalRecordsValidation } from "@/lib/validations/personalRecords";
import { createPersonalRecord } from "@/lib/actions/pr.actions";


interface Props {
    userId: string
}

const PostPersonalRecords = ({ userId }: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(PersonalRecordsValidation),
        defaultValues: {
            details: "",
            accountId: userId,
            entryDate: new Date()
        }
    });


    const onSubmit = async  (values: z.infer<typeof PersonalRecordsValidation>) => {
        console.log('VALUES', values);
        await createPersonalRecord({ 
            details: values.details,
            entryDate: new Date(values.entryDate),
            owner: userId,
            path: pathname
        });

        router.push("/");
    }

    return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-10 flex flex-col justify-start gap-10"
                >
                    <FormField
                        control={form.control}
                        name="details"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-3 w-full">
                                <FormLabel className="text-base-semibold">
                                    Details
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={10}
                                        className="pr_no-focus"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="entryDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-3">
                            <FormLabel>Entry Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "md:w-[278px] text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                    >
                        Add Personal Record
                    </Button>
                </form>
            </Form>
    )
}

export default PostPersonalRecords