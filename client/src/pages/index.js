/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from 'react'
import { axiosService, configureAxiosService } from '../services/axiosService'
import { useAuthenticationContext } from '../contexts/AuthenticationContext'
import { parseCookies } from 'nookies'
import UsersData from '../componenets/UsersData';

function Home() {
    const { userInformation } = useAuthenticationContext();

    const [users, setUsers] = useState([]);

    async function callBackend() {
        const localAxiosService = configureAxiosService();
        const response = await localAxiosService.get(`/users/${userInformation.email}`)

        setUsers([response.data]);
    }

    async function callBackendToAll() {
        const localAxiosService = configureAxiosService();
        const response = await localAxiosService.get(`/users`)

        setUsers(response.data);
    }

    return (
        <div className="min-h-full ">
            <div className="mx-auto py-6 sm:px-6 lg:px-8 bg-white shadow">
                <button onClick={callBackendToAll}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Call Backend to get all users data
                </button>

                <button onClick={callBackend}
                    className=" ml-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Call Backend to get you data
                </button>
            </div>
            <UsersData users={users} />
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
