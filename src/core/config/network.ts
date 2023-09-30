import axios, { AxiosInstance } from 'axios'
import LocalStorage from '../../data/local_storage/LocalStorage';
import StorageDataTypes from '../../constants/StorageDataTypes';

const getAuthToken = async () => {
    const token = await LocalStorage.GetData(StorageDataTypes.TOKEN);
    return `Bearer ${token}`;
};

export const simpleAxios: AxiosInstance = axios.create({
    baseURL: "https://api.rehustle.co/v1",
    headers: {
        "Content-Type": "application/json",
    }
});

simpleAxios.interceptors.response.use((response) => {
    return response
}, (error) => {
    return Promise.reject(error.response.data);
})

export const authenticatedAxios = async (): Promise<AxiosInstance> => {
    const token = await getAuthToken();

    const authenticatedInstance: AxiosInstance = axios.create({
        baseURL: 'https://api.rehustle.co/v1',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    });

    authenticatedInstance.interceptors.response.use((response) => {
        return response
    }, (error) => {
        return Promise.reject(error.response.data);
    })

    return authenticatedInstance;
};

