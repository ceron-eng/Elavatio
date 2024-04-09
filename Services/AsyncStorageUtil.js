import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value, expires) => {
  try {
    await AsyncStorage.setItem(key, value);
    if (expires !== -1) {
      setTimeout(async () => {
        await AsyncStorage.removeItem(key);
      }, expires * 60 * 1000);
    }
  } catch (error) {
    console.log('Error storing data:', error);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log('Error retrieving data:', error);
  }
};