import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:5000/`,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response)
);

export default instance;
