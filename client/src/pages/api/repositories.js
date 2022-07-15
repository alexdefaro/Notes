import { configureAxiosService } from "../../services/axiosService";
import Login from "../login";

export default async function handler(req, res) {
    const localAxiosService = configureAxiosService();
    delete localAxiosService.defaults.headers.common['Authorization'];

    const query = req.query;
    let { username } = query;


    const response = await localAxiosService({
        url: `/users/${username}/repos`,
        withCredentials: false,
        baseURL: "https://api.github.com/",
        headers: {
        }
    });

    res.status(200).json(response.data)
}
