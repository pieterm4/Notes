import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import FolderList from "../features/folders/FolderList";
import Note from "../features/notes/Note";
import Notes from "../features/notes/Notes";
import NotesArea from "../features/notes/NotesArea";
import NotesList from "../features/notes/NotesList";
import Footer from "./Footer";
import Header from "./Header";

export default function Workplace(){

    const [selectedFolder, setSelectedFolder] = useState("");

    return(
        <div className="flex">
            <div className="flex flex-col min-h-screen min-w-full">
                <div>
                    <Header />
                </div>
                <div className="h-full md:flex-grow p-4">
                    <div className="flex flex-col h-full md:grid md:grid-cols-5 flex-grow">
                        <div className="col-span-5 md:col-span-1 md:flex md:flex-col md:flex-grow">
                            <FolderList selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} />
                        </div>
                        <div className="mt-auto pt-4 col-span-5 md:pt-0 md:col-span-4 flex-grow text-white">
                            <NotesArea selectedFolder={selectedFolder} />
                        </div>

                    </div>
                </div>
                <Toaster />
                <Footer />
            </div>
        </div>
        
    );
}