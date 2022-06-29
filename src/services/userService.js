import React from 'react'

function userService() {
    async function authenticateUser(email, password) {
        const authenticationData = {
            jwtToken: "UAHSDASDHAIHSDAUIHDSAUDHIHJANSDKJABSD",
            userInformation: {
                name: "Alexandre Ramos",
                email: "alexdefaro@gmail.com",
                avatar_url: "",
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