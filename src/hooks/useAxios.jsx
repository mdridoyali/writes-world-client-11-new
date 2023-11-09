import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://assignment-11-jwt-server.vercel.app",
  withCredentials: true,
});

const useAxios = () => {
  return axiosSecure;
};
export default useAxios;
