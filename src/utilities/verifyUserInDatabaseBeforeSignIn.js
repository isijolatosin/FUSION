import { getAllData } from "./updateFirestoreDatabaseField";

async function verifyUserInDatabaseBeforeSignin(number) {
  let isVerified = false;

  const allUserData = await getAllData("all-users");

  allUserData.find((data) => {
    if (data.phonenumber === number) {
      isVerified = true;
    }
  });

  return isVerified;
}

export default verifyUserInDatabaseBeforeSignin;
