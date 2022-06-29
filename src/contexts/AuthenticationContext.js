import Router from "next/router";
import { setCookie } from 'nookies'
import { createContext, useContext, useState } from 'react'

import userService from '../services/userService';

const AuthenticationContext = createContext({});

export default function AuthenticationContextProvider({ children }) {
    const [userInformation, setUserInformation] = useState({});

    const { authenticateUser } = userService();

    async function handleSignIn(email, password) {
        const authenticationData = await authenticateUser(email, password);

        setCookie(undefined, "notes-token", authenticationData.jwtToken, {
            maxAge: 24 * 60 * 60 // 1 Day
        });

        setUserInformation(authenticationData.userInformation);

        return authenticationData.userInformation.isAuthenticated;
    }

    const contextData = {
        userInformation,
        handleSignIn
    }

    return (
        <AuthenticationContext.Provider value={contextData}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export function useAuthenticationContext() {
    return useContext(AuthenticationContext)
}