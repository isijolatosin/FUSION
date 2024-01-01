import { collection, getDocs } from "firebase/firestore";
import { database } from "../../config";

const getAllData = async () => {
  const returnData = [];
  await getDocs(collection(database, "all-users")).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    returnData.push(...newData);
  });

  return returnData;
};

const updateUserValueField = async (
  collectionName,
  documentId,
  fieldName,
  newValue,
  setIsRetrigger
) => {
  try {
    setIsRetrigger(false);
    const docRef = database.collection(collectionName).doc(documentId);

    // Update the specified field in the document
    await docRef.update({
      [fieldName]: newValue,
    });

    console.log("Field updated successfully!");
    setIsRetrigger(true);
  } catch (error) {
    console.error("Error updating field:", error);
  }
};

export { updateUserValueField, getAllData };
