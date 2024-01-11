import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearDataByKey = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data with key '${key}' cleared successfully.`);
  } catch (error) {
    console.error(`Error clearing data with key '${key}':`, error);
  }
};
