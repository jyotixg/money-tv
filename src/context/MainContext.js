import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axiosInstance from "../configs/axios";
import createAxiosInstance from "../configs/axios";

const MainContext = createContext();

export const useMain = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMain must be used within a MainProvider");
  }
  return context;
};

const baseUrl = `https://reconstruction-waterproof-york-ownership.trycloudflare.com/api/v1`;

export const MainProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const axiosInstance = createAxiosInstance();
  const [contentConfigurations, setContentConfigurations] = useState(null);

  // This api contains configuration based on content type
  useEffect(() => {
    const getContentConfiguration = async () => {
      try {
        const response = await axiosInstance.get(
          `${baseUrl}/contentConfigurations`
        );
        setContentConfigurations(response.data.response.data);
        return response;
      } catch (err) {
        console.log({ err });
        throw err;
      }
    };

    getContentConfiguration();
  }, []);

  const fetchHomePageData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`${baseUrl}/homePageContents`);
      return response;
    } catch (err) {
      console.log({ err });
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const fetchSectionPageData = async (sectionName) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(
        `${baseUrl}/sectionPage/${sectionName}`
      );
      return response;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const fetchVideoPageData = async (sectionName, videoId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(
        `${baseUrl}/homePageContents/${sectionName}/videos/${videoId}`
      );
      return response;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const value = {
    loading,
    error,
    fetchHomePageData,
    fetchSectionPageData,
    fetchVideoPageData,
    contentConfigurations,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContext;
