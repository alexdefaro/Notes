/* This example requires Tailwind CSS v2.0+ */
import { useEffect } from 'react'
import { axiosService, configureAxiosService } from '../services/axiosService'
import { useAuthenticationContext } from '../contexts/AuthenticationContext'
import { parseCookies } from 'nookies'

function Home() {
    const { userInformation } = useAuthenticationContext();

    async function callBackend(params) {
        const localAxiosService = configureAxiosService();
        const users = await localAxiosService.get(`/users/${userInformation.email}`)

        console.log(users.data)
    }

    return (
        <div className="min-h-full">
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <button onClick={callBackend}
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Call Backend to get you data
                    </button>
                </div>
            </main>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { "notes-token": sessionData } = parseCookies(context);

    if (!sessionData) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    // const localAxiosService = configureAxiosService(context); 
    // const users =  await localAxiosService.get("/users")

    return {
        props: {
            // users : users.data
        }
    }
}

export default Home;
