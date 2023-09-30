import AsyncStorage from "@react-native-async-storage/async-storage";

const SetData = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
}

const GetData = async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value;
}

const DeleteData = async (key: string) => {
    await AsyncStorage.removeItem(key);
}

export default { SetData, GetData, DeleteData };