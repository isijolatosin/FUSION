import { database } from "../../config";

// Who owns this phone number in the database?
//   "new"   - no profile uses this number yet
//   "owner" - the profile with this number belongs to the signed-in email
//   "taken" - another account already uses this number
//
// Call this only AFTER the user has signed in (Firestore rules require it).
// It stops someone signing up with their own email but another person's
// phone number and being logged in to that person's profile.
export default async function checkPhoneOwnership(phonenumber, email) {
  if (!phonenumber) return "new";

  const snapshot = await database
    .collection("all-users")
    .where("phonenumber", "==", phonenumber)
    .get();

  if (snapshot.empty) return "new";

  const signedInEmail = (email || "").trim().toLowerCase();
  const isOwner = snapshot.docs.some((doc) => {
    const profileEmail = (doc.data().email || "").trim().toLowerCase();
    return profileEmail !== "" && profileEmail === signedInEmail;
  });

  return isOwner ? "owner" : "taken";
}
