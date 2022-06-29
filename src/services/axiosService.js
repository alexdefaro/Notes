import axios from "axios";
import { parseCookies } from 'nookies'

const API_URL = "https://swapi.dev/api"

export const axiosService = axios.create({
    baseURL: API_URL
})

const { "notes-token": token } = parseCookies();

if (token) {
    const parsedToken = JSON.parse(token);
    axiosService.defaults.headers.common['Authorization'] = `Bearer ${parsedToken.jwtToken}`;
}