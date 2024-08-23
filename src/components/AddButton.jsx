import React, { useContext, useRef } from 'react'
import Plus from '../icons/Plus'
import { db } from '../appwrite/databases'
import colors from "../assets/colors.json"
import { NoteContext } from '../context/NoteContext'
import { account } from '../appwrite/config'

function AddButton() {
    const { setNotes } = useContext(NoteContext)
    const startingPos = useRef(10)

    const addNote = async () => {

        try {
            const user = await account.get()
            const user_Id = user.$id

            const payload = {
                position: JSON.stringify({
                    x: startingPos.current,
                    y: startingPos.current
                }),
                colors: JSON.stringify(colors[Math.floor(Math.random() * colors.length)]),
                userId: user_Id
            }

            startingPos.current += 10
            const response = await db.notes.create(user_Id, payload)
            setNotes((prevState) => [response, ...prevState])

            console.log('Note added successfully!');
        } catch (err) {     
            console.error('Error adding note:', err);
            alert('Failed to add note. Please try again.');
        }
    }

    return (
        <div
            onClick={addNote}
            className='bg-neutral-500 flex justify-center items-center h-10 w-10 rounded-[50%] cursor-pointer transition-all duration-300 hover:scale-110 group'>
            <Plus />
            <div className='absolute text-xs text-transparent -translate-y-4 transition-all duration-500 group-hover:-translate-y-10 group-hover:text-white text-nowrap'> Add  </div>
        </div>
    )
}

export default AddButton
