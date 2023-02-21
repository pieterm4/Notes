import React from 'react';
import { FC } from 'react';
import { Modal } from '../../../components/modal/Modal';

interface IDeleteFolderModalProps {
    show: boolean;
    folderIdToDelete: string | null;
    setShow: (show: boolean) => void;
    handleSubmit: (folderId: string) => Promise<void>;
}

export const DeleteFolderModal: FC<IDeleteFolderModalProps> = ({
    folderIdToDelete,
    show,
    setShow,
    handleSubmit,
}: IDeleteFolderModalProps) => {
    const handleSubmitFolderDeletion = (): void => {
        if (folderIdToDelete !== null && folderIdToDelete !== '') {
            handleSubmit(folderIdToDelete)
                .then(() => setShow(false))
                .catch(() => setShow(false));
        }
    };

    const handleCloseDialog = (): void => {
        setShow(false);
    };

    return (
        <>
            <Modal
                title="Delete folder"
                show={show}
                submitText="Delete"
                cancelText="Cancel"
                submit={handleSubmitFolderDeletion}
                close={handleCloseDialog}
            >
                <div className="delede-folder-modal-text">
                    <p>Are you sure you want to delete this folder and all its notes?</p>
                </div>
            </Modal>
        </>
    );
};
