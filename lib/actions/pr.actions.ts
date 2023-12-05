"use server";

import { revalidatePath } from "next/cache";
import PersonalRecord from "../models/personalRecords.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Group from "../models/group.model";

interface Params {
    name: string,
    details: string,
    value: string,
    unit: string,
    variation: string,
    owner: string,
    path: string,
    entryDate: Date,
    groupId: string | null
}

export async function createPersonalRecord({
    name,
    details,
    value,
    unit,
    variation,
    owner,
    entryDate,
    path,
    groupId
}: Params) {
    try {
        connectToDB();
        
        const groupIdObject = await Group.findOne(
            { id: groupId },
            { _id: 1 }
          );
        
          console.log('CREATE', groupIdObject);
        const createdPersonalRecord = await PersonalRecord.create({
            name,
            details,
            value,
            unit,
            variation,
            owner,
            entryDate,
            group: groupIdObject
        });
    
        //Update user model
        await User.findByIdAndUpdate(owner, {
            $push: { personalRecords : createdPersonalRecord._id}
        })
        
        if (groupIdObject) {
            await Group.findByIdAndUpdate(groupIdObject, {
              $push: { personalRecords: createdPersonalRecord._id },
            });
        }

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
        .populate({ path: "owner", model: User })
        .populate({ path: "group", model: Group })

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