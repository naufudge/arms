import { Record, User, Collection } from "@prisma/client";
import { z } from "zod";

export type UserPublic = {
    username: string;
    email: string;
    userRole: string;
    avatar: string;
}

export type UserRole = {
    id: number
    name: string
}

export type UserTokenType = {
    id: string,
    username: string,
    email: string,
    userRoleId: number
}

export type FullRecord = Record & {
    user: User,
    collection: Collection
}

export const recordFormSchema = z.object({
    title: z.string().min(5, { message: "Title must be between 5 to 50 characters" }).max(50),
    subject: z.string(),
    description: z.string().min(10, {message: "Description must be longer than 10 characters"}).max(500),
    creator: z.string().min(5, {message: "Creator's name needs to be more than 5 characters."}).max(50),
    publisher: z.string(),
    contributor: z.string(),
    date: z.date(),
    type: z.string().min(5).max(50),
    format: z.string(),
    identifier: z.string(),
    source: z.string(),
    language: z.string(),
    relation: z.string(),
    coverage: z.string(),
    rights: z.string().min(5).max(50),
  })