import AsyncStorage from "@react-native-async-storage/async-storage";

export const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};
