import React from 'react';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal } from '../../../components/modal/Modal';

interface ICreateFolderModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    handleSubmit: (folderName: string) => Promise<void>;
}

export const CreateFolderModal: FC<ICreateFolderModalProps> = ({
    show,
    setShow,
    handleSubmit,
}: ICreateFolderModalProps) => {
    const [folderName, setFolderName] = useState<string>('');

    const handleSubmitFolderCreation = (): void => {
        if (folderName === '') {
            toast.error('Folder name cannot be empty');
            return;
        }

        handleSubmit(folderName)
            .then(() => {
                setFolderName('');
                setShow(false);
            })
            .catch((e) => console.log(e));
    };

    const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newFolderName = e.target.value;
        setFolderName(newFolderName);
    };

    const handleCloseDialog = (): void => {
        setFolderName('');
        setShow(false);
    };

    return (
        <>
            <Modal
                title="Create folder"
                show={show}
                submitText="Create"
                cancelText="Cancel"
                submit={handleSubmitFolderCreation}
                close={handleCloseDialog}
            >
                <div className="create-folder-input">
                    <input
                        name="FolderNameInput"
                        type="text"
                        placeholder="Folder name..."
                        value={folderName}
                        onChange={(e) => handleFolderNameChange(e)}
                    />
                </div>
            </Modal>
        </>
    );
};
