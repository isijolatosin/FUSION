import { collection, getDocs } from "firebase/firestore";
import firebase, { database } from "../../config";

const getAllData = async (collectionName) => {
  const returnData = [];
  await getDocs(collection(database, collectionName)).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    returnData.push(...newData);
  });

  return returnData;
};

// Function to add elements to a field
const updateUserValueField = async (
  collectionName,
  documentId,
  fieldName,
  newValue
) => {
  try {
    const docRef = database.collection(collectionName).doc(documentId);

    // Update the specified field in the document
    await docRef.update({
      [fieldName]: newValue,
    });

    console.log("Field updated successfully!");
  } catch (error) {
    console.error("Error updating field:", error);
  }
};

// Function to add elements to an array field
const addToArrayField = async (
  collectionName,
  documentId,
  arrayFieldName,
  newItem
) => {
  try {
    const docRef = database.collection(collectionName).doc(documentId);

    // Update the array field using arrayUnion
    await docRef.update({
      [arrayFieldName]: firebase.firestore.FieldValue.arrayUnion(newItem),
    });

    console.log("Array field updated successfully!");
  } catch (error) {
    console.error("Error updating array field:", error);
  }
};

// Function to remove a particular item from the array in Firestore
const removeItemFromArray = async (
  collectionName,
  documentId,
  fieldName,
  itemToRemove
) => {
  try {
    // Get a reference to the document
    const docRef = database.collection(collectionName).doc(documentId);

    // Use the arrayRemove method to remove the specified item
    await docRef
      .update({
        [fieldName]: firebase.firestore.FieldValue.arrayRemove(itemToRemove),
      })
      .then(() => {
        console.log("Item removed successfully!");
      });
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

const removeDocumentFromCollections = async (collectionName, documentId) => {
  // Get a reference to the message and delete messages
  const messageRef = database
    .collection(collectionName)
    .doc(documentId)
    .collection("messages");
  const querySnapshot = await messageRef.get();

  querySnapshot.forEach(async (doc) => {
    await doc.ref.delete();
  });

  // Get a reference to the document and delete document
  const docRef = database.collection(collectionName).doc(documentId);
  docRef
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error deleting document: ", error);
    });
};

export {
  updateUserValueField,
  getAllData,
  addToArrayField,
  removeItemFromArray,
  removeDocumentFromCollections,
};
