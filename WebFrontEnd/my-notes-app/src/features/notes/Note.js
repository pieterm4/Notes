import React from 'react'
import { ShareIcon, TrashIcon } from "@heroicons/react/solid";
import Moment from "moment";

export default function Note({id, title, content, creationDay, onDelete, onShare}) {
  return (
    <div className='bg-gray-200 text-gray-800 rounded-xl p-3 flex flex-col w-full shadow-md shadow-gray-200 hover:bg-white hover:border-white active:translate-y-1'>
        <div className='text-lg font-extrabold'>
            <h3>{title}</h3>
        </div>
        <div className='h-8 mt-2 mb-2'>
            <p>{content}</p>
        </div>
        <div className='flex justify-between'>
            <div className='float-left font-extralight italic text-sm items-center align-bottom flex justify-center'>
                <p>{Moment(creationDay).format('DD-MM-YYYY')}</p>
            </div>
            <div className='float-right flex gap-2'>
                <button className='hover:bg-gray-400 rounded-lg p-1'>
                    <ShareIcon className='h-5 w-5' />
                </button>
                <button className='hover:bg-gray-400 rounded-lg p-1' onClick={() => onDelete(id)}>
                    <TrashIcon className='w-5 h-5' />
                </button>
            </div>
        </div>
    </div>
  )
}
