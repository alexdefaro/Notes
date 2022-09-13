import "/styles/globals.css";

import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import React, { useEffect } from 'react'
import Layout from "./layout/layout";
import AuthenticationContextProvider from "../contexts/AuthenticationContext";



function MyApp({ Component, pageProps }) {
    const queryClient = new QueryClient({});

    const routesWithoutLayout = [
        "/register",
        "/login"
    ];

    const router = useRouter();
    const isLayoutNeeded = routesWithoutLayout.includes(router.asPath);

    return (
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    )
}

export default MyApp;
