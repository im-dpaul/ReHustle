import { simpleAxios } from "../config/network";

export const postMethod = (url: string, data: any) => simpleAxios.post(
    url,
    data,
    {
        headers: {
            "Content-Type": "application/json",
        }
    }
)