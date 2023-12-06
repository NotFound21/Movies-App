import axios from "axios";
import { apiKey } from "../constants";
import { Path } from "react-native-svg";

//endpoints
const apiBaseUrl = "https://www.omdbapi.com/";
const releases = `${apiBaseUrl}`;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: { apiKey: apiKey, s: "Avengers", y: new Date().getFullYear() },
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
