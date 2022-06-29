import "/styles/globals.css";

import { useRouter } from 'next/router';

import React, { useEffect } from 'react'
import Layout from "./layout/layout";
import AuthenticationContextProvider from "../contexts/AuthenticationContext";

function MyApp({ Component, pageProps }) {
    const routesWithoutLayout = [
        "/register",
        "/login"
    ];

    const router = useRouter();
    const isLayoutNeeded = routesWithoutLayout.includes(router.asPath);

    return (
        <AuthenticationContextProvider>
            {
                (isLayoutNeeded === false)
                    ?
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                    :
                    <Component {...pageProps} />
            }
        </AuthenticationContextProvider>
    )
}

export default MyApp;
