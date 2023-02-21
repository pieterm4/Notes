import React from 'react'

export default function Button({children, onClick}) {

    const child = children[0];
    return (
        <div className='text-gray-200 rounded-md hover:bg-gray-500 active:translate-y-1'>
            <button onClick={() => onClick()}>
                {children}
            </button>
        </div>
    )
}
