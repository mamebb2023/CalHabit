"use server";

import User from "@/models/user.model";
import { CreateUserParams, GetUserParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    await User.create(userData);
  } catch (error) {
    console.log("er", error);
    throw error;
  }
}

export async function getUserByEmail(params: GetUserParams) {
  try {
    await connectToDatabase();

    const { email, password } = params;
    const userDocs = await User.findOne({ email });

    if (!userDocs) {
      return { error: "Email not found, Please Register" };
    }

    if (userDocs.password !== password) {
      return { error: "Incorrect password" };
    }

    const user = userDocs.toObject();
    user._id = user._id.toString();
    delete user.password;
    delete user.__v;

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
