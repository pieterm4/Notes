import React, { FC } from 'react';

interface INoteProps {
    id: string;
    title: string;
    content: string;
}
export const Note: FC<INoteProps> = (props: INoteProps) => {
    return (
        <div className="note-tile-container">
            <div className="note-tile-header">
                <h2>{props.title}</h2>
            </div>
            <div className="note-tile-content">
                <p>{props.content}</p>
            </div>
            <div className="note-tile-footer">
                <p>Created: 20.12.2022</p>
            </div>
        </div>
    );
};
