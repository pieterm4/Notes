import React, { useEffect, useRef } from 'react'
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { createNewFolder, folderSelector, clearState } from './folderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateFolder = ({close, isOpen}) => {
    const [folderTitle, setFolderTitle] = useState("");
    const createButtonRef = useRef(null);
    const dispatch = useDispatch();
    const {folderCreated, isError, errorMessage} = useSelector(folderSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if(folderCreated)
        {
            toast.success("Folder has been created");
            dispatch(clearState());
            close();
            navigate("/");
        }
    }, [folderCreated]);

    useEffect(() => {
        if(isError)
        {
            toast.error(errorMessage);
            dispatch(clearState());
        }
    }, [isError]);

    function handleCreate() {
        dispatch(createNewFolder(folderTitle));
    }

  return (
      <div>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={close} initialFocus={createButtonRef}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                    >
                        Create new folder
                    </Dialog.Title>
                    <div className="mt-2">
                        <input
                            ref={createButtonRef}
                            className="w-full h-8 border-gray-800 p-2"
                            type="text"
                            placeholder="Enter folder name..."
                            onChange={(e) => setFolderTitle(e.target.value)}
                        >
                        </input>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                        onClick={handleCreate}
                        >
                        Create
                        </button>
                        <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                        onClick={close}
                        >
                        Cancel
                        </button>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
      </div>
  )
}

export default CreateFolder