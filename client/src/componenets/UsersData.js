import React from 'react'

function UserData({ user }) {
    return (
        <div tabIndex="0" aria-label={`card ${user.id}`} className="focus:outline-none w-4/5 mb-7 bg-white dark:bg-gray-800 p-6 shadow rounded">
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700  pb-6">
                <img src={user.avatarURL} alt="coin avatar" className="w-12 h-12 rounded-full" />
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
    )
}

function UsersData({ users }) {
    return (
        (users.length > 0) &&
        <div aria-label="group of cards" tabIndex="0" className="focus:outline-none py-8 w-full">
            {users.map(function (user, index) {
                return (
                    <div key={index} className="flex items-center justify-center w-full">
                        <UserData user={user} />
                    </div>
                )
            })}
        </div>
    )
}

export default UsersData;