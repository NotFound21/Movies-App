import axios from "axios";
import { apiKey } from "../constants";
import { Path } from "react-native-svg";

//endpoints
const apiBaseUrl = `https://www.omdbapi.com/?apiKey=${apiKey}&`;
const releases = `${apiBaseUrl}`;
const search = `${apiBaseUrl}`;
const popular = `${apiBaseUrl}`;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : { s: "Avengers", y: new Date().getFullYear() },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const releasesMovies = () => {
  return apiCall(releases);
};
export const searchMovies = (params) => {
  return apiCall(search, params);
};

export const popularMovies = (params) => {
  return apiCall(popular, params);
};
