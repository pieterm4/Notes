import React, { FC } from 'react';
import INote from '../../Domain/Model/INote';
import { Note } from './Note';

interface INotesListProps {
    folderId: string;
    notes: INote[];
}

export const NotesList: FC<INotesListProps> = (props: INotesListProps) => {
    return (
        <div className="note-List">
            {props.notes.map((note: INote) => (
                <Note key={note.id} title={note.title} id={note.id} content={note.content} />
            ))}
        </div>
    );
};
