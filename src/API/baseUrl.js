import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:2006",
});

export default client;
