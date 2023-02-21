import { FC } from 'react';
import { CreateFolderModal } from './create/CreateFolderModal';
import CreateButton from '../../components/buttons/CreateButton';
import FolderList from './FolderList';
import { useGetFoldersQuery } from './foldersSlice';
import './Folders.css';
import { DeleteFolderModal } from './delete/DeleteFolderModal';
import useDeleteFolder from './delete/DeleteFolderHook';
import useCreateFolder from './create/CreateFolderHook';
import React from 'react';

const FolderContainer: FC = () => {
    const { isLoading, isSuccess, data } = useGetFoldersQuery(undefined);
    const { showCreateFolderModal, toggleCreateFolderModal, handleCreateFolder } = useCreateFolder();

    const {
        showDeleteFolderModal,
        toggleDeleteFolderModal,
        folderToDeleteId,
        handleFolderDelete,
        deleteButtonClicked,
    } = useDeleteFolder();

    const handleCreateFolderButtonClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        toggleCreateFolderModal();
    };

    const handleDeleteFolderButtonClicked = (folderId: string): void => {
        deleteButtonClicked(folderId);
    };

    if (isLoading) {
        return <p>Loading</p>;
    }

    return (
        <div className="foldersContainer">
            <div>
                <h2>Folders</h2>
            </div>
            {isSuccess ? (
                <FolderList handleDeleteFolder={handleDeleteFolderButtonClicked} {...{ folders: [...data] }} />
            ) : (
                <p>Error</p>
            )}
            <div className="folderButtons">
                <CreateButton onClick={handleCreateFolderButtonClicked} />
            </div>

            <CreateFolderModal
                show={showCreateFolderModal}
                setShow={(show) => toggleCreateFolderModal(!show)}
                handleSubmit={handleCreateFolder}
            />
            {
                <DeleteFolderModal
                    folderIdToDelete={folderToDeleteId}
                    show={showDeleteFolderModal}
                    setShow={(show) => toggleDeleteFolderModal(!show)}
                    handleSubmit={handleFolderDelete}
                />
            }
        </div>
    );
};

export default FolderContainer;
