import React from 'react'
import Notes from './Notes'

export default function NotesList({items, onDelete}) {
  return (
    <div className='h-full overflow-y-scroll scrollbar'>
        <Notes items = {items} onDelete={onDelete} />
    </div>
  )
}
