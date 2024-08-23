import React, { useContext, useState } from 'react'
import { NoteContext } from '../context/NoteContext';
import DeletedCard from './DeletedCard';
import Trash from '../icons/Trash';

function Bin({ open, onClose, children }) {
    const { isBinOpen, setIsBinOpen, binNotes } = useContext(NoteContext)
    const { isEmpty, setIsEmpty } = useState(false)



    return (
        <div
            style={{
                visibility: isBinOpen ? 'visible' : 'hidden',
                opacity: isBinOpen ? 1 : 0,
                transition: 'opacity 0.3s, visibility 0.3s',
            }}
            onClick={(e) => {
                if (!e.target.closest('.inner-div')) {
                    setIsBinOpen((val) => !val)
                }
            }}
            className='w-screen h-screen inset-0 bg-black/40 fixed z-[2000]' >
            <div
                style={{ right: isBinOpen ? '0%' : '-50%' }}
                className='h-screen bg-neutral-900 absolute inner-div transition-all duration-500'>
                <div className='flex justify-center items-center text-2xl font-semibold text-neutral-400 py-6 border-b-2 border-neutral-800'>Recycle Bin</div>
                {(binNotes.length === 0) ?
                    (
                        <div className='flex flex-col justify-center items-center h-full gap-y-4 w-[480px]'>
                            <Trash size='120' color='#404040' strokeWidth='2' />
                            <div className='text-neutral-400'> No notes in Recycle Bin </div>
                        </div>
                    ) :
                    (
                        <div className='flex flex-col gap-y-8 items-center pt-10 px-8 m-8 pb-96' id='bin'>
                            {binNotes.map(binNote => (<DeletedCard key={binNote.$id} note={binNote} />))}
                        </div>
                    )
                }

            </div>
        </div>

    )
}

export default Bin
