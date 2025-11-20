import { auth } from "firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import UserInfo from "models/user";
import UserService from "./userService";

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userInfo = await UserService.getUser(email);
    console.log("User signed in:", userCredential.user.email);
    return userInfo;
  } catch (error: any) {
    console.error("Could not sign in", error.message);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
    console.log("Signed out successfully");
  } catch (error: any) {
    console.error("Could not sign out", error.message);
    throw error; // optional: allow UI to handle logout failures
  }
};

export const signUp = async (
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      await UserService.postUser(
        firstName,
        lastName,
        email,
        username,
      )
      return await UserService.getUser(email);
    }
  } catch (error: any) {
    console.error(`Signup error: ${error.code}, message: ${error.message}`);
    throw error; // rethrow so UI can handle it
  }
};


