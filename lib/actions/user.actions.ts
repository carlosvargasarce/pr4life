"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import PersonalRecords from "../models/personalRecords.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    height: string;
    weight: string;
    image: string;
    path: string
}

export async function updateUser({
    userId,
    username,
    name,
    bio,
    height,
    weight,
    image,
    path
}: Params): Promise<void> {
    connectToDB();

    try {
        await User.findOneAndUpdate(
            { id: userId },
            { 
                username: username.toLowerCase(),
                name,
                bio, 
                image,
                height,
                weight,
                onboarded: true
            },
            { upsert: true }
        );

        if(path === '/profile/edit') {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}

export async function fetchUser(userId: string) {
    try {
        connectToDB();

        return await User.findOne({ id: userId })
        //.populate({
        //    path: 'groups',
        //    model: 'Group'
        //})
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`)
    }
}

export async function fetchUserPersonalRecords(userId: string) {
    try {
        connectToDB();

        const personalRecords = await User.findOne({ id: userId })
        .populate({
            path: 'personalRecords',
            model: PersonalRecords
        })

        return personalRecords;
    } catch (error: any) {
        throw new Error(`Failed to fetch user personal records: ${error.message}`)
    }
}

export async function fetchUsers({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20, 
    sortBy = "desc"
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder 
}) {
    try {
        connectToDB();

        const skipAmount = (pageNumber -1) * pageSize;

        const regex = new RegExp(searchString, 'i');

        const query: FilterQuery<typeof User> = {
            id: { $ne: userId}
        }

        if(searchString.trim() !== '') {
            query.$or = [
                { username: {$regex: regex }},
                { name: {$regex: regex }}
            ]
        }

        const sortOptions = { createdAt: sortBy };

        const usersquery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize)
        
        const totalUsersCount = await User.countDocuments(query);

        const users = await usersquery.exec();

        const isNext = totalUsersCount > skipAmount + users.length;

        return { users, isNext}
    } catch (error : any) {
        throw new Error(`Failed to fetch users: ${error.message}`)
    }
}