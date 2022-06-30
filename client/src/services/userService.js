import { axiosService } from './axiosService';

function userService() {

    function isEmptyObject(obj) {
        const isObjectEmpty = obj == null || !obj || obj == 'null' || obj == 'undefined' || Object.keys(obj).length === 0;
        return isObjectEmpty;
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
        authenticateUser
    }
}

export default userService