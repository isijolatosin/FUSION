import { database } from "../../config";

// Looks up a profile by phone number.
// Call this only AFTER the user has signed in: the Firestore rules only let
// signed-in users read profiles.
async function verifyUserInDatabaseBeforeSignin(number) {
  if (!number) return false;

  try {
    const snapshot = await database
      .collection("all-users")
      .where("phonenumber", "==", number)
      .limit(1)
      .get();

    return !snapshot.empty;
  } catch (error) {
    console.log("Error checking user in database:", error);
    return false;
  }
}

export default verifyUserInDatabaseBeforeSignin;
