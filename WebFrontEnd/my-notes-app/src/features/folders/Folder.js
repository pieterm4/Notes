import React from "react";
import { FolderIcon } from "@heroicons/react/solid";

export function Folder(props){
    const title = props.title;
    const isSelected = props.currentId === props.selectedId; 
    return(
        <>
            <button 
            onClick={props.onClick}
            className={`${isSelected ? 'bg-gray-400 text-white font-bold border-b-2 border-gray-200' : 'bg-gray-600 text-gray-200'} justify-left flex p-4 w-full items-center h-auto hover:bg-gray-500 rounded-xl shadow-lg mt-2 mb-5 text-left active:translate-y-1`}>
                <span className="left-0 inset-y-0 flex items-center pl-3 mr-2">
                    <FolderIcon className="w-6 h-6" />
                </span>
                {title}
            </button>
        </>
    );
};

export default Folder;