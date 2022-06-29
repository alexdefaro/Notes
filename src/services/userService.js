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

        return authenticationData; 
    }

    return {
        authenticateUser
    }
}

export default userService