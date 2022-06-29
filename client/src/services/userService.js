import { v4 as uuidv4 } from 'uuid';

function userService() {
    async function authenticateUser(email, password) {
        const authenticationData = {
            jwtToken: uuidv4(),
            userInformation: {
                id: 1,
                name: "Alexandre Ramos",
                email: "alexdefaro@gmail.com",
                avatar_url: "https://github.com/alexdefaro.png",
                isAuthenticated: false
            }
        };

        if (email === "alexdefaro@gmail.com") {
            authenticationData.userInformation.isAuthenticated = true;
        }

        return authenticationData; 
    }

    return {
        authenticateUser
    }
}

export default userService