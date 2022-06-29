import { v4 as uuidv4 } from 'uuid';
import { axiosService } from './axiosService';

function userService() {

    async function getGitHubUserInformation(username) {
        // alvarolopes

        try {
            const response = await axiosService.get(`https://api.github.com/users/${username}`);
            return {
                name: response.data.name,
                email: response.data.email,
                avatarURL: response.data.avatar_url
            }
        } catch (error) {
            return null;
        }
    } 

    async function authenticateUser(email, password) {
        const gitHubUserInformation = await getGitHubUserInformation(email.substring(0, email.indexOf("@")));

        let userName = "Alexandre Ramos";
        let avatarURL = "https://github.com/alexdefaro.png";

        if (!gitHubUserInformation) {
            return false; 
        }

        const authenticationData = {
            jwtToken: uuidv4(),
            userInformation: {
                id: 1,
                name: gitHubUserInformation.name,
                email: gitHubUserInformation.email,
                avatarURL : gitHubUserInformation.avatarURL,
                isAuthenticated: false
            }
        };

        authenticationData.userInformation.isAuthenticated = true;

        return authenticationData;
    }

    return {
        authenticateUser
    }
}

export default userService