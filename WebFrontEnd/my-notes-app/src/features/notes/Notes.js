import React from "react";
import Note from "./Note";

export default function Notes({items, onDelete}){

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 h-max">
            {items.map(n => (
                <Note 
                    key={n.id}
                    id={n.id}
                    title={n.title}
                    content={n.content}
                    creationDay={n.createdDay}
                    onDelete={onDelete} />))}
        </div>
    );
}