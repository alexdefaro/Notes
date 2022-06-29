import { createContext, useContext, useEffect, useState } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { axiosService } from '../services/axiosService';

import userService from '../services/userService';

const AuthenticationContext = createContext({});

export default function AuthenticationContextProvider({ children }) {
    const { authenticateUser } = userService();
    const [userInformation, setUserInformation] = useState({});

    function isEmptyObject(obj) {
        const isObjectEmpty = (!obj && obj == 'null' && obj == 'undefined' || Object.keys(obj).length === 0);
        return isObjectEmpty;
    }

    function updateAxiosAuthorisationToken(jwtToken) {
        axiosService.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    }

    useEffect(() => {
        const { "notes-token": sessionData } = parseCookies();

        if (sessionData) {
            const parsedSessionData = JSON.parse(sessionData);
            setUserInformation({
                id: parsedSessionData.userInformation.id,
                name: parsedSessionData.userInformation.name,
                email: parsedSessionData.userInformation.email,
                avatarURL: parsedSessionData.userInformation.avatarURL,
                isAuthenticated: parsedSessionData.userInformation.isAuthenticated
            });
        }
    }, [])

    async function handleSignIn(email, password) {
        const authenticationData = await authenticateUser(email, password);

        if (!authenticationData) {
            return false; 
        }

        setCookie(undefined, "notes-token", JSON.stringify(authenticationData), {
            maxAge: 24 * 60 * 60 // 1 Day
        });

        setUserInformation(authenticationData.userInformation);
        updateAxiosAuthorisationToken(authenticationData.jwtToken);

        return authenticationData.userInformation.isAuthenticated;
    }

    async function handleSignOut() {
        destroyCookie(undefined, "notes-token"); 

        setUserInformation({});
        updateAxiosAuthorisationToken("");

        return true;
    }

    const contextData = {
        userInformation,
        handleSignIn,
        handleSignOut
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
