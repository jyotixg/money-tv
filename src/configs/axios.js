// axiosInstance.js

import axios from "axios";

const createAxiosInstance = () => {
  // const accessToken = window.localStorage.getItem("accessToken");

  const axiosInstance = axios.create({
    // headers: {
    //   Authorization: `Bearer ${accessToken}`,
    // },
  });

  return axiosInstance;
};

export default createAxiosInstance;
