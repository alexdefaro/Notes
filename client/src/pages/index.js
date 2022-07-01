/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from 'react'
import { axiosService, configureAxiosService } from '../services/axiosService'
import { useAuthenticationContext } from '../contexts/AuthenticationContext'
import { parseCookies } from 'nookies'

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

    useEffect(() => {
        // setUsers([]);
    }, []);


    return (
        <div className="min-h-full ">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-white shadow">
                <button onClick={callBackendToAll}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Call Backend to get all users data
                </button>


                <button onClick={callBackend}
                    className=" ml-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Call Backend to get you data
                </button>
            </div>

            {
                (users.length > 0) &&
                <div aria-label="group of cards" tabIndex="0" className="focus:outline-none py-8 w-full">
                    {users.map(function (user, index) {
                        return (
                            <div key={index} className="flex items-center justify-center w-full">

                                <div tabIndex="0" aria-label={`card ${index}`} className="focus:outline-none w-4/5 mb-7 bg-white dark:bg-gray-800 p-6 shadow rounded">
                                    <div className="flex items-center border-b border-gray-200 dark:border-gray-700  pb-6">
                                        <img src={user.avatarURL} alt="coin avatar" class="w-12 h-12 rounded-full" />
                                        <div className="flex items-start justify-between w-full">
                                            <div className="pl-3 w-full">
                                                <p tabIndex="0" className="focus:outline-none text-xl font-medium leading-5 text-gray-800 dark:text-white ">{user.name}</p>
                                                <p tabIndex="0" className="focus:outline-none text-sm leading-normal pt-2 text-gray-500 dark:text-gray-200 ">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-2">
                                        <p tabIndex="0" className="focus:outline-none text-sm leading-5 py-4 text-gray-600 dark:text-gray-200 ">
                                            {user.about}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                    }
                </div>
            }

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
