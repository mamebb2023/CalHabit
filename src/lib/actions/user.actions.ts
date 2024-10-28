"use server";

import User from "@/database/user.model";
import { CreateUserParams, GetUserParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    await User.create(userData);

    return console.log("success");
  } catch (error) {
    console.log("er", error);
    throw error;
  }
}

export async function getUserById(params: GetUserParams) {
  try {
    connectToDatabase();

    const { email } = params;
    const user = await User.findOne({ email: email });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
