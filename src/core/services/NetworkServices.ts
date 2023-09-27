import { authenticatedAxios, simpleAxios } from "../config/network";

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

export const authenticatedGetMethod = async (url: string) => {
    const authAxios = await authenticatedAxios();
    return authAxios.get(url);
};

export const authenticatedPutMethod = async (url: string, data: any) => {
    const authAxios = await authenticatedAxios();
    return authAxios.put(url, data);
};