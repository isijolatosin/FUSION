import { collection, getDocs } from "firebase/firestore";
import firebase, { database } from "../../config";

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

const getAllLikesData = async () => {
  const returnData = [];
  await getDocs(collection(database, "all-likes")).then((querySnapshot) => {
    const likesData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    returnData.push(...likesData);
  });

  return returnData;
};

// Function to add elements to a field
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

// Function to add elements to an array field
const addToArrayField = async (
  collectionName,
  documentId,
  arrayFieldName,
  newItem,
  setIsRetrigger
) => {
  try {
    setIsRetrigger(false);
    const docRef = database.collection(collectionName).doc(documentId);

    // Update the array field using arrayUnion
    await docRef.update({
      [arrayFieldName]: firebase.firestore.FieldValue.arrayUnion(newItem),
    });

    console.log("Array field updated successfully!");
    setIsRetrigger(true);
  } catch (error) {
    console.error("Error updating array field:", error);
  }
};

// Function to remove a particular item from the array in Firestore
const removeItemFromArray = async (
  collectionName,
  documentId,
  fieldName,
  itemToRemove,
  setIsRetrigger
) => {
  try {
    setIsRetrigger(false);
    // Get a reference to the document
    const docRef = database.collection(collectionName).doc(documentId);

    // Use the arrayRemove method to remove the specified item
    await docRef
      .update({
        [fieldName]: firebase.firestore.FieldValue.arrayRemove(itemToRemove),
      })
      .then(() => {
        console.log("Item removed successfully!");
        setIsRetrigger(true);
      });
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

export {
  updateUserValueField,
  getAllData,
  getAllLikesData,
  addToArrayField,
  removeItemFromArray,
};
