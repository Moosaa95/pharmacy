// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import dayjs from "dayjs";
// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";

// const baseURL = "http://localhost:8000";

// const useAxios = () => {
//   const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

//   const axiosInstance = axios.create({
//     baseURL,
//     headers: { Authorization: `Bearer ${authTokens?.access}` },
//   }).access;

//   axiosInstance.interceptors.request.use(async (req) => {
//     const user = jwt_decode(authTokens.access);
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//     if (isExpired) return req;

//     const response = await axios.post(`${baseURL}/accounts/api/token/refresh`, {
//       refresh: authTokens.refresh,
//     });

//     localStorage.setItem("authTokens", JSON.stringify(response.data));
//     setAuthTokens(response.data);
//     setUser(jwt_decode(response.data.access));

//     req.headers.Authorization = `Bearer ${response.data.access}`;

//     return req;
//   });

//   return axiosInstance;
// };

// export default useAxios

import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "http://localhost:8000";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (config) => {
    const user = jwtDecode(authTokens.access);
    const isTokenExpired = dayjs.unix(user.exp).isBefore(dayjs());

    if (!isTokenExpired) {
      return config;
    }

    try {
      const response = await axios.post(
        `${baseURL}/accounts/api/token/refresh/`,
        {
          refresh: authTokens.refresh,
        }
      );

      const newTokens = response.data;
      localStorage.setItem("authTokens", JSON.stringify(newTokens));
      setAuthTokens(newTokens);
      setUser(jwtDecode(newTokens.access));

      config.headers.Authorization = `Bearer ${newTokens.access}`;
    } catch (error) {
      // Handle token refresh error, such as logging out the user
    }

    return config;
  });

  return axiosInstance;
};

export default useAxios;
