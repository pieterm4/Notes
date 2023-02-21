import React from 'react';
import { FC } from 'react';
import './Folders.css';

interface INumberOfNotes {
    numberOfNotes: number;
}

const NumberOfNotes: FC<INumberOfNotes> = (props: INumberOfNotes) => {
    return (
        <div className="numberOfNotes">
            <span>Notes:</span>
            <span>{props.numberOfNotes}</span>
        </div>
    );
};

export default NumberOfNotes;
