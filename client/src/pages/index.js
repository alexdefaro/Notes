/* This example requires Tailwind CSS v2.0+ */
import { useEffect } from 'react'
import { axiosService, configureAxiosService } from '../services/axiosService'
import { useAuthenticationContext } from '../contexts/AuthenticationContext'
import { parseCookies } from 'nookies'

function Home() {
    const { userInformation } = useAuthenticationContext();

    return (
        <div className="min-h-full">
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                </div>
            </main>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { "notes-token": sessionData } = parseCookies(context);

    if (!sessionData) {
        console.log("Token not found");

        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    const localAxiosService = configureAxiosService(); 
    const users =  await localAxiosService.get("/users")
    return {
        props: {
        }
    }
}

export default Home;
