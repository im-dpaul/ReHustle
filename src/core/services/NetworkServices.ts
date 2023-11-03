import { authenticatedAxios, simpleAxios } from "../config/network";
import RNBlobUtil from 'react-native-blob-util'

/// Unauthorized methods
export const getMethod = (url: string) =>
    simpleAxios.get(url)

export const postMethod = (url: string, data: any) =>
    simpleAxios.post(url, data)

/// Authorized methods
export const authenticatedPostMethod = async (url: string, data: any) => {
    const authAxios = await authenticatedAxios();
    return authAxios.post(url, data);
};

export const authenticatedGetMethod = async (url: string, queryParams?: {}) => {
    const authAxios = await authenticatedAxios();
    return authAxios.get(
        url,
        { params: queryParams }
    );
};

export const authenticatedPutMethod = async (url: string, data: any) => {
    const authAxios = await authenticatedAxios();
    return authAxios.put(url, data);
};

export const authenticatedDeleteMethod = async (url: string) => {
    const authAxios = await authenticatedAxios();
    return authAxios.delete(url);
};

/// File Upload methods
export const fileUploadMethod = async (signedUrl: string, filePath: string, contentType: string) => {
    const headers = {
        'Content-Type': contentType
    }
    const response = await RNBlobUtil.fetch(
        'PUT',
        signedUrl,
        headers,
        RNBlobUtil.wrap(filePath)
    )
    return response
}
