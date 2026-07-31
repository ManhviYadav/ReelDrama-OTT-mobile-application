import axios from "axios";
import { API } from "./api";

const axiosInstance = axios.create({
  baseURL: API.BASE_URL,
  timeout: 15000, //If the server doesn't respond within 15 seconds, Axios throws an error.
  headers: {
    Accept: "application/json", //"Please send the response in JSON format."
    "Content-Type": "application/json", //"The data I'm sending is JSON."
  },
});

export default axiosInstance;

//Axios is a JavaScript library used to make HTTP/API requests from your app to a server.