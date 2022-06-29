/* This example requires Tailwind CSS v2.0+ */
import { useEffect } from 'react'
import { axiosService } from '../services/axiosService'
import { useAuthenticationContext } from '../contexts/AuthenticationContext'

function Home() {
    const { userInformation } = useAuthenticationContext();

    useEffect(() => {
        axiosService.get("/people/?format=json").then(function (response) {
            // console.log(response.data.results);
          });    
    }, []); 

    return (
        <div className="min-h-full">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">{userInformation.name}</h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Replace with your content */}
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                    </div>
                    {/* /End replace */}
                </div>
            </main>
        </div>
    )
}

export default Home;