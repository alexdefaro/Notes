import Router from "next/router";

import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthenticationContext } from "../contexts/AuthenticationContext";

function Login() {
    const schema = yup.object().shape({
        email: yup.string()
                .email()
                .required(),
        password: yup.string()
                    .min(4, "Password must have at least 4 characters.")
                    .max(20, "Password must have maximum of 20 characters.")
                    .required()
    });

    const [loginFailed, setLoginFailed] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({resolver: yupResolver(schema)});
    const { handleSignIn } = useAuthenticationContext();

    async function handleLogin(data) {
        const successSignIn = await handleSignIn(data.email, data.password)
        if (successSignIn === true) {
            setLoginFailed(false);

            Router.push("/");
            return;
        }
        setLoginFailed(true);
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only"> Email address </label>
                            <input {...register("email")} name="email" type="email" autoComplete="email" placeholder="Email address" required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only"> Password </label>
                            <input {...register("password")} name="password" type="password" autoComplete="current-password" placeholder="Password" required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input {...register("remember-me")} name="remember-me" type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                    </div>

                    {errors.password?.message && <div className="text-red-500 text-sm">{errors.password?.message}</div>}
                    
                    <div className={`p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 ${!loginFailed ? "invisible" : "visible "}`} role="alert">
                        <span className="font-medium">Sign in failed!</span> Please review your credentials.
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;