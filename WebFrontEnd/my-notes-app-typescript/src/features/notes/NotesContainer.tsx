import React from 'react';
import useGetNotes from './NotesHooks';
import { NotesList } from './NotesList';
import './Notes.css';

const NotesContainer = () => {
    const { selectedFolderId, notesForSelectedFolder } = useGetNotes();
    return (
        <div>
            <div className="notes-header">
                <h2>Notes</h2>
            </div>
            <div className="notes-container">
                <NotesList notes={notesForSelectedFolder} folderId={selectedFolderId} />
            </div>
            <div className="notes-footer">Add</div>
        </div>
    );
};

export default NotesContainer;
