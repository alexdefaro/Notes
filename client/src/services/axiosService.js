import axios from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { parseCookies } from 'nookies'

export function configureAxiosService(context) {
    const API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;
    const { "notes-token": token } = parseCookies(context);

    console.log("API_URL", API_URL);

    const axiosAPI = axios.create({
        baseURL: API_URL
    })

    console.log("token",  parseCookies())

    if (token) {
        const parsedToken = JSON.parse(token);
        axiosAPI.defaults.headers.common['Authorization'] = parsedToken.jwtToken ?? `Bearer ${parsedToken.jwtToken}`;
    }

    axiosAPI.interceptors.request.use(function (config) {

        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    return axiosAPI;
}

export const axiosService = configureAxiosService(); 