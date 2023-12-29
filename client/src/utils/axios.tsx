import axiosLib from "axios";

const baseURL = "http://localhost:5173/api";

const axios = axiosLib.create({baseURL});

export default axios;