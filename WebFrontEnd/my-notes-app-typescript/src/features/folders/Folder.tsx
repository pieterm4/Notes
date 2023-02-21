import React, { useEffect, useRef } from 'react';
import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IFolder } from '../../Domain/Model/IFolder';
import NumberOfNotes from './NumberOfNotes';
import { setSelectedFolder } from './foldersSlice';

interface Props {
    handleDelete: (folderId: string) => void;
    folder: IFolder;
}

const Folder: FC<Props> = ({ folder, handleDelete }: Props) => {
    const dispatch = useAppDispatch();
    const selectedFolderId = useAppSelector((state) => state.foldersSlice.selectedFolderId);
    const folderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (amISelected()) {
            folderRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedFolderId]);

    const handleDeleteButtonClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        handleDelete(folder.id);
    };

    const handleFolderClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.preventDefault();
        dispatch(setSelectedFolder(folder.id));
    };

    const amISelected = (): boolean => folder.id === selectedFolderId;

    return (
        <div
            className={`folder ${amISelected() ? 'folder-selected' : null}`}
            onClick={handleFolderClick}
            ref={folderRef}
        >
            <div className="title">{folder.title}</div>
            <div className="folderContent">
                <NumberOfNotes numberOfNotes={4} />
                <div className="buttons">
                    <button name="Share button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17.731"
                            height="19.31"
                            viewBox="0 0 17.731 19.31"
                        >
                            <path
                                id="Rectangle"
                                d="M9.6,4.343V0L16,7.6l-4.166,4.948L9.6,15.2V10.857S0,9.846,0,16C0,3.691,9.6,4.343,9.6,4.343Z"
                                transform="translate(0.75 2.055)"
                                fill="none"
                                stroke="#000"
                                strokeMiterlimit="10"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </button>
                    <button name="Delete button" onClick={handleDeleteButtonClicked}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                            <path
                                id="delete-svgrepo-com"
                                d="M6,3.6A1.6,1.6,0,0,1,7.6,2h4.8A1.6,1.6,0,0,1,14,3.6V5.2h3.2a.8.8,0,0,1,0,1.6h-.855l-.694,9.714A1.6,1.6,0,0,1,14.055,18H5.944a1.6,1.6,0,0,1-1.6-1.486L3.656,6.8H2.8a.8.8,0,1,1,0-1.6H6ZM7.6,5.2h4.8V3.6H7.6ZM5.259,6.8l.686,9.6h8.111l.686-9.6ZM8.4,8.4a.8.8,0,0,1,.8.8V14a.8.8,0,1,1-1.6,0V9.2A.8.8,0,0,1,8.4,8.4Zm3.2,0a.8.8,0,0,1,.8.8V14a.8.8,0,1,1-1.6,0V9.2A.8.8,0,0,1,11.6,8.4Z"
                                transform="translate(-2 -2)"
                                fill="#0d0d0d"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(Folder);
