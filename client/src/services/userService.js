import { v4 as uuidv4 } from 'uuid';
import { axiosService } from './axiosService';

function userService() {

    async function getUserInformation(email, password) {
        // return {
        //     id: 1,
        //     name: "Alexandre Ramos",
        //     email: email,
        //     avatarURL: "https://github.com/alexdefaro.png"
        // }

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

        if (!userInformation) {
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