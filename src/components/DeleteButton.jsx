import React, { useContext } from 'react'
import Trash from '../icons/Trash'
import { db } from '../appwrite/databases'
import { NoteContext } from '../context/NoteContext'
import { account } from '../appwrite/config'

function DeleteButton({ note, isNotes, message }) {
    const { setNotes, setBinNotes } = useContext(NoteContext)

    const handleDeleteNotes = async () => {
        const user = await account.get()
        const user_Id = user.$id

        const binnedNote = await db.notes.get(note.$id)

        const payload = {
            body: binnedNote.body,
            position: binnedNote.position,
            colors: binnedNote.colors,
            userId: user_Id
        }

        const response = await db.binNotes.create(user_Id, payload)
        setBinNotes((prevState) => [response, ...prevState])

        try {
            db.notes.delete(note.$id)
            setNotes((prevState) => prevState.filter((item) => item.$id !== note.$id))
        } catch (err) {
            console.log(err)
            alert('Cannot Delete Notes')
        }
    }

    const handleDeleteBinNotes = async () => {
        try {
            db.binNotes.delete(note.$id)
            setBinNotes((prevState) => prevState.filter((item) => item.$id !== note.$id))
        } catch (err) {
            console.log(err)
            alert('Cannot Delete Bin Notes')
        }
    }

    return (
        <div
            onClick={isNotes ? handleDeleteNotes : handleDeleteBinNotes}
            className='hover:bg-white/30 hover:scale-110 p-[2px] rounded-full transition-all duration-500 group flex justify-center items-center cursor-pointer'>
            <Trash />
            <div className='absolute text-xs pl-2 invisible group-hover:visible text-transparent left-[-50%] transition-all font-semibold duration-500 group-hover:left-[100%] group-hover:text-black text-nowrap'> {message}  </div>
        </div>
    )
}

export default DeleteButton
