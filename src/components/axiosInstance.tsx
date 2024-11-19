import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const axiosInstance = axios.create({});

export const setupAxiosInterceptors = () => {
  const navigate = useNavigate();

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        toast.error("Your session has expired. Please login again.");
        localStorage.removeItem("authToken");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default axiosInstance;
