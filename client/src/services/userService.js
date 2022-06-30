import { v4 as uuidv4 } from 'uuid';
import { axiosService } from './axiosService';

function userService() {

    function isEmptyObject(obj) {
        const isObjectEmpty = (!obj && obj == 'null' && obj == 'undefined' || Object.keys(obj).length === 0);
        return isObjectEmpty;
    }

    async function getUserInformation(email, password) {
        try {
            const response = await axiosService.post("/login", { email, password });

            return {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                avatarURL: response.data.avatarURL
            }
        } catch (error) {
            return null;
        }
    }

    async function authenticateUser(email, password) {
        const userInformation = await getUserInformation(email, password);

        if (isEmptyObject(userInformation)) {
            return null;
        }

        const authenticationData = {
            jwtToken: uuidv4(),
            userInformation: {
                id: userInformation.id,
                name: userInformation.name,
                email: userInformation.email,
                avatarURL: userInformation.avatarURL,
                isAuthenticated: true
            }
        };

        return authenticationData;
    }

    return {
        authenticateUser
    }
}

export default userService