import axios from 'axios'

// export default axios.create({
//     baseURL: "https://api.rehustle.co/v1",
//     headers: {
//         "Content-type": "application/json"
//     }
// });

export const simpleAxios = axios.create({
    baseURL: "https://api.rehustle.co/v1",
});