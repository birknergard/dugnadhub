import { auth } from "firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user.email);
    return userCredential.user; // optional: return the signed-in user
  } catch (error: any) {
    console.error("Could not sign in", error.message);
    throw error; // rethrow for UI to catch
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

export const signUp = async (email: string, password: string, username: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
    }

    return userCredential.user; // optional, return the user
  } catch (error: any) {
    console.error(`Signup error: ${error.code}, message: ${error.message}`);
    throw error; // rethrow so UI can handle it
  }
};


