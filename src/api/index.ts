import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export const api2 = axios.create({
    baseURL: 'http://interchange.proxy.rlwy.net:42407'
})