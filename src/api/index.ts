import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export const api2 = axios.create({
    baseURL: 'https://3.109.47.68:3001'
})