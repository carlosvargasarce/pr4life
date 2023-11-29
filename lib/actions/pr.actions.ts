"use server";

import { revalidatePath } from "next/cache";
import PersonalRecord from "../models/personalRecords.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

interface Params {
    name: string,
    details: string,
    value: string,
    unit: string,
    variation: string,
    owner: string,
    path: string,
    entryDate: Date
}

export async function createPersonalRecord({
    name,
    details,
    value,
    unit,
    variation,
    owner,
    entryDate,
    path
}: Params) {
    try {
        connectToDB();

        const createdPersonalRecord = await PersonalRecord.create({
            name,
            details,
            value,
            unit,
            variation,
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

export async function fetchPersonalRecords(pageNumber = 1, pageSize = 20) {
    connectToDB();

    //Calculate the number of PR to skip
    const skipAmount = (pageNumber -1 ) * pageSize;

    const prsQuery = PersonalRecord.find()
        .sort({ entryDate: "desc" })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: "owner", model: User
    })

    const totalPRCount = await PersonalRecord.countDocuments();
    const prs = await prsQuery.exec();

    const isNext = totalPRCount > skipAmount + prs.length;

    return { prs, isNext }
}

export async function fetchPersonalRecordById(id: string) {
    connectToDB();

    try {
        const pr = await PersonalRecord.findById(id)
            .populate({
               path: 'owner',
               model: User,
               select: "_id id name image"
            }).exec(); 
        
            return pr;
    } catch (error: any) {
        throw new Error(`Error fetching pr: ${error.message}`);
    }
}