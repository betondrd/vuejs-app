import axios from "axios";

export const api = axios.create({
  baseURL: "url.api",
  timeout: 8000,
});

export async function httpRequest(method, url, payload) {
  return await new Promise((resolve, reject) => {
    try {
      api[method](url, payload)
        .then((res) => resolve(res.data))
        .catch((rej) => {
          reject(rej.response);
        });
    } catch (err) {
      return reject(err);
    }
  });
}
