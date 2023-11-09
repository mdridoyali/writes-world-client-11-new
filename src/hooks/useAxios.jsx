import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://assignment-11-jwt-server.vercel.app",
  withCredentials: true,
});

const useAxios = () => {
    const {logOutUser} = useAuth()
    const navigate = useNavigate()
  useEffect(() => {
    axiosSecure.interceptors.response.use((res) => {
      return res;
    }),
      (error) => {
        console.log("error in the interceptors", error.response);
        if(error.response.status === 401 || error.response.status === 403 ){
            console.log('logout')
            logOutUser()
            .then(() => {
                 navigate('/')
            }).catch(error => console.log(error))

        }
      };
  }, [logOutUser, navigate]);

  return axiosSecure;
};
export default useAxios;
