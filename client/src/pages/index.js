import { useEffect, useState } from 'react'
import { axiosService, configureAxiosService } from '../services/axiosService'
import { useAuthenticationContext } from '../contexts/AuthenticationContext'
import { parseCookies } from 'nookies'
import UsersData from '../components/UsersData';
import userService from '../services/userService';

import { useQuery } from '@tanstack/react-query'

function Home({data}) {
    const { userInformation } = useAuthenticationContext();
    const { getUserByEmail, getAllUsers } = userService();

    const [users, setUsers] = useState([]);

        // const { data, isLoading, isError } = useQuery(['allUsersData'], async () => {
        //     const response = await getAllUsers();
        //     return response.data;
        // });

    async function callBackend() {
        const response = await getUserByEmail(userInformation.email);
        setUsers([response.data]);
    }

    async function callBackendToAll() {
        const response = await getAllUsers();
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
            <UsersData users={users.length > 0 ? users : data} />
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

    const localAxiosService = configureAxiosService(context);
    const users = await localAxiosService.get("/users")

    return {
        props: {
            data: users.data
        }
    }
}

export default Home;
