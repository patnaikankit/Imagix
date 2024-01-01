import axiosLib from "axios";

const baseURL = "https://imagix.onrender.com/api";

const axios = axiosLib.create({baseURL});

export default axios;