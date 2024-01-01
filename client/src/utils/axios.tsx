import axiosLib from "axios";

const baseURL = "http://localhost:4000/api";

const axios = axiosLib.create({baseURL});

export default axios;