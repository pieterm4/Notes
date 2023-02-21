import React from 'react';
import { FC, memo } from 'react';
import { IFolder } from '../../Domain/Model/IFolder';
import Folder from './Folder';

interface PropType {
    handleDeleteFolder: (folderId: string) => void;
    folders: IFolder[];
}

const FolderList: FC<PropType> = (props: PropType) => {
    return (
        <div className="folderList">
            {props.folders.map((folder: IFolder) => (
                <Folder folder={Object.assign(folder)} handleDelete={props.handleDeleteFolder} key={folder.id} />
            ))}
        </div>
    );
};

export default memo(FolderList);
