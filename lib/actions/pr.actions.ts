"use server";

import { revalidatePath } from "next/cache";
import PersonalRecord from "../models/personalRecords.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

interface Params {
    details: string,
    owner: string,
    path: string,
    entryDate: Date
}

export async function createPersonalRecord({
    details,
    owner,
    entryDate,
    path
}: Params) {
    try {
        connectToDB();

        const createdPersonalRecord = await PersonalRecord.create({
            details,
            owner,
            entryDate
        });
    
        //Update user model
        await User.findByIdAndUpdate(owner, {
            $push: { personalRecords : createdPersonalRecord._id}
        })
    
        revalidatePath(path); 
    } catch (error: any) {
       throw new Error(`Error creating thread: ${error.message}`)
    }
}