import { axiosService, configureAxiosService } from './axiosService';

function userService() {
    const localAxiosService = configureAxiosService();

    function isEmptyObject(obj) {
        const isObjectEmpty = obj == null || !obj || obj == 'null' || obj == 'undefined' || Object.keys(obj).length === 0;
        return isObjectEmpty;
    }

    async function getUserByEmail(userEmail) {
        const response = await localAxiosService.get(`/users/${userEmail}`)
        return response;
    }

    async function getAllUsers() {
        const response = await localAxiosService.get(`/users`)
        return response;
    }

    async function getUserRepositories(userName) {
        delete localAxiosService.defaults.headers.common['Authorization'];
        const response = await localAxiosService({
            url: `/users/${userName}/repos`,
            withCredentials: false,
            baseURL: "https://api.github.com/",
            headers: {
            }
        });
        
        return response;
    }

    async function getUserAuthenticationData(email, password) {
        try {
            const response = await axiosService.post("/login", { email, password });

            const authenticationData = {
                jwtToken: response.data.jwtToken,
                userInformation: {
                    id: response.data.userInformation.id,
                    name: response.data.userInformation.name,
                    email: response.data.userInformation.email,
                    avatarURL: response.data.userInformation.avatarURL,
                    isAuthenticated: false
                }
            }

            return authenticationData;
        }
        catch (error) {
            return null;
        }
    }

    async function authenticateUser(email, password) {
        const authenticationData = await getUserAuthenticationData(email, password);

        if (isEmptyObject(authenticationData)) {
            return null;
        }

        authenticationData.userInformation.isAuthenticated = true;
        return authenticationData;
    }

    return {
        authenticateUser,
        getUserByEmail,
        getAllUsers,
        getUserRepositories
    }
}

export default userService