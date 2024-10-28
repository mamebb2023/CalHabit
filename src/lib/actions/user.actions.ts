import User from "@/database/user.model";
import { CreateUserParams, GetUserParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params: GetUserParams) {
  try {
    connectToDatabase();

    const { userId } = params;
    const user = await User.findOne({ id: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}