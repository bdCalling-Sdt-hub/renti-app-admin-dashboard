import axios from "axios";

//api base url config
const baseAxios = axios.create({
  baseURL: "http://104.131.72.121:3000",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

export default baseAxios;
