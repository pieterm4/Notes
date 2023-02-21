import {React, Fragment} from "react";
import {Menu, Transition } from '@headlessui/react'
import { LogoutIcon} from '@heroicons/react/outline'
import logo from '../images/Notes_Logo.png'
import { LogOut } from "../features/account/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { UserIcon } from "@heroicons/react/solid";
  
  
export default function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  function handleLogOut() {
    dispatch(LogOut);
    navigate("/login");
  }

    return (
      <header className="h-full bg-gray-800 opacity-8 backdrop-blur-xl backdrop-saturate-[180] flex justify-between p-4">
        <div className="flex justify-center justify-items-center items-center float-left">
          <img 
            src={logo}
            className="block h-12 w-auto" />
            <h1 className="text-gray-200 ml-5 text-2xl">
              My Notes
            </h1>
        </div>
        <div className="float-right text-gray-200 items-center justify-center justify-items-center flex">
          <div className="hidden sm:block">
            <p>{userEmail}</p>
          </div>
          <Menu as={"div"} className="ml-5">
            <div>
              <Menu.Button className="rounded-md hover:bg-gray-500">
                <UserIcon className="h-8 w-auto" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-black rounded-md bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                  <Menu.Item>
                    <button
                      className="p-2 hover:bg-gray-800 items-center rounded-md w-full flex justify-center"
                      onClick={handleLogOut}
                    >
                      <span className="mr-2">
                        <LogoutIcon className="h-5 w-auto" />
                      </span>
                      Log out
                    </button>
                  </Menu.Item>
                  </div>
                </Menu.Items>

            </Transition>
          </Menu>
        </div>

      </header>
    )
  }