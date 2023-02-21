import React, { useEffect, useState } from "react";
import { Folder } from "./Folder";
import { useDispatch, useSelector } from "react-redux";
import {folderSelector, fetchFolders, clearState, deleteFolder} from './folderSlice'
import toast  from 'react-hot-toast';
import { FolderAddIcon, ChevronUpIcon, FolderRemoveIcon } from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";
import CreateFolder from "./CreateFolder";
import { DeleteDialog } from "../../components/DeleteDialog";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export function FolderList({selectedFolder, setSelectedFolder}) {

    const [isCreateFolderDialogOpened, setIsCreateFolderDialogOpened] = useState(false);
    const [isDeleteFolderDialogOpened, setIsDeleteFolderDialogOpened] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {folders, isError, errorMessage, folderCreated, folderDeleted} = useSelector(folderSelector);

    useEffect(() => {
        dispatch(fetchFolders());
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }
    }, [isError, errorMessage]);

    useEffect(() => {
        if(folderCreated)
        {
            let addedFolder = folders.slice(-1)[0];
            setSelectedFolder(addedFolder.id);
            dispatch(clearState());
        }
    }, [folderCreated]);

    useEffect(() => {
        if(folderDeleted)
        {
            toast.success("Folder has been deleted");
            setSelectedFolder("");
            dispatch(clearState());
        }

    }, [folderDeleted]);

    const handleFolderClick = (folderId) => {
        setSelectedFolder(folderId);
    }

    function handleCreateFolderButtonClicked() {
        setIsCreateFolderDialogOpened(true);
    }

    function handleCloseCreateFolderDialog() {
        setIsCreateFolderDialogOpened(false);
    }

    function handleDeleteFolderButtonClicked() {
        setIsDeleteFolderDialogOpened(true);
    }

    function handleCloseDeleteFolderDialog() {
        setIsDeleteFolderDialogOpened(false);
    }

    function deleteSelectedFolder() {
        dispatch(deleteFolder(selectedFolder));
        navigate("/");
    }

    return(
        <>
            <Disclosure className="bg-gray-900 text-gray-200 w-full">
                {
                    ({open}) => (
                        <>
                            <div className="md:flex md:flex-row text-gray-200 md:h-full w-full">
                                <div className="items-center justify-center justify-items-center md:hidden">
                                    <Disclosure.Button className="inline-flex w-full justify-center items-center rounded-md bg-gray-600 focus-visible:ring focus-visible:ring-gray-600 focus-visible:ring-opacity-75 hover:bg-gray-500">
                                        <span className="text-lg pt-2">Folders</span>
                                        <ChevronUpIcon
                                            className={`${
                                                open ? 'rotate-180 transform' : ''
                                            } h-6 w-6 text-black mt-2`}
                                        />
                                    </Disclosure.Button>
                                </div>
                                <div className="hidden md:flex md:flex-col w-full">
                                    <div id="foldersHeader" className="text-gray-200 flex opacity-8 rounded-sm">
                                        <h2 className="text-2xl p-2 font-extrabold">Folders</h2>
                                    </div>
                                    <div className="flex flex-col w-full overflow-y-scroll scrollbar h-[calc(100vh_-_(24px_+_80px_+_144px))] p-2">
                                    {folders.map(f => (<Folder key={f.id} title={f.title} currentId={f.id} selectedId={selectedFolder} onClick={() => handleFolderClick(f.id)} />))}
                                    </div>
                                    <div className="w-full mt-auto mb-auto flex justify-end">
                                        <Button onClick={handleCreateFolderButtonClicked}>
                                            <FolderAddIcon className="w-10 h-10" />
                                        </Button>
                                        <Button onClick={handleDeleteFolderButtonClicked}>
                                            <FolderRemoveIcon className="w-10 h-10" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <Disclosure.Panel>
                                <div className="w-full">
                                    {
                                        folders.map((f) => (
                                            <Disclosure.Button
                                                key={f.id}
                                                onClick={() => handleFolderClick(f.id)}
                                                className={`${
                                                    selectedFolder == f.id ? 'bg-gray-400 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                } block py-2 rounded-md text-base font-medium w-full bg-gray-700`}
                                            >
                                                {f.title}
                                            </Disclosure.Button>
                                            )
                                        )
                                    }
                                </div>
                            </Disclosure.Panel>
                        </>
                    )
                }

            </Disclosure>
            <div>
            <CreateFolder close={handleCloseCreateFolderDialog} isOpen={isCreateFolderDialogOpened}  />
            <DeleteDialog
                close={handleCloseDeleteFolderDialog}
                isOpen={isDeleteFolderDialogOpened}
                onDelete={deleteSelectedFolder}
                title="Remove folder"
                message="Are you sure you wanna delete the folder and its notes?"
             />
            </div>
            
        </>
        
    );
}

export default FolderList;