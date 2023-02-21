import React, { useEffect } from "react";
import { LockClosedIcon } from '@heroicons/react/solid';
import logo from '../../images/Notes_Logo.png';
import { useDispatch, useSelector } from "react-redux";
import {clearState, loginUser, userSelector} from './loginSlice';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Login(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(
        userSelector
      );

    useEffect(() => {
        return () => {
          dispatch(clearState());
        };
      }, []);

      useEffect(() => {
        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }
    
        if (isSuccess) {
          dispatch(clearState());
          navigate("/");
        }
      }, [isError, isSuccess]);

      const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const email = data.get('email');
        const password = data.get('password');

        dispatch(loginUser({email, password}));
    }
    


    return(
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <div className="relative w-full flex justify-center py-2 px-4">
                            <img
                                className="h-20 w-20"
                                src={logo}
                                alt="logo"
                            />
                            <div className="text-gray-200 text-4xl justify-center items-center pl-3 flex">
                                My Notes
                            </div>
                         </div>
                         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
                             Sign in to your account
                         </h2>
                         <p className="mt-2 text-center text-sm text-gray-300">
                             Or{' '}
                             <a href="#" className="font-medium text-orange-300 hover:text-orange-200">
                                 register
                             </a>
                             {' '}if you don't have an account yet
                         </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email" className="sr-only text-gray-300">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-600 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                 />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-600 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                 />
                            </div>
                        </div>
                        <div>
                            {
                                isFetching ? 
                                <button
                                    type="submit"
                                    disabled
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-300 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-200"
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <LockClosedIcon className="h-5 w-5 text-orange-200 group-hover:text-orange-100" aria-hidden="true" />
                                    </span>
                                    Signing...
                                </button>
                                :
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-300 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-200"
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <LockClosedIcon className="h-5 w-5 text-orange-200 group-hover:text-orange-100" aria-hidden="true" />
                                    </span>
                                    Sign in
                                </button>
                            }
                                
                            </div>
                    </form>

                </div>
            </div>
            <Toaster />
        </>
    );
}