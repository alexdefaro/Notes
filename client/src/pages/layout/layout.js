import Router from "next/router";

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useAuthenticationContext } from '../../contexts/AuthenticationContext'


function Layout({ children }) {
    const { userInformation, handleSignOut } = useAuthenticationContext();

    function handleLogout() {
        handleSignOut();
        Router.push("/login");
    }

    return (
        <header className="bg-white shadow">
            <Disclosure as="nav" className="bg-gray-800">
                <div className="flex items-center justify-start h-16 md:ml-6">
                    <Menu as="div" className="relative">
                        <Menu.Button className="pt-1 max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <img className="h-8 w-8 rounded-full" src={userInformation.avatarURL} alt="" />
                        </Menu.Button>
                        <Menu.Items className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                <a href="#" onClick={handleLogout} className="bg-gray-100 block px-4 py-2 text-sm text-gray-700"> Sign out </a>
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                    <div className="px-3">
                        <h1 className="text-3xl font-bold text-white">Welcome {userInformation.name}!</h1>
                    </div>
                </div>
            </Disclosure>
            <div>
                {children}
            </div>
        </header>

    )
}


export default Layout;