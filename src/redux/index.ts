import axios, { AxiosInstance } from "axios";

let axiosClient: AxiosInstance;

axiosClient = axios.create({
  baseURL: process.env.REACT_APP_URL || "http://localhost:5000",
});

export default axiosClient;
