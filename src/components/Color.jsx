import React, { useContext } from 'react'
import { NoteContext } from '../context/NoteContext'
import { db } from '../appwrite/databases'

function Color({color}) {
    const {selectedNote, notes, setNotes} = useContext(NoteContext)

    const changeColor = () => {
        try {   
            const currentNoteIndex = notes.findIndex(
                (note) => note.$id === selectedNote.$id
            )

            const updatedNote = {
                ...notes[currentNoteIndex],
                colors: JSON.stringify(color),
            }

            const newNotes = [...notes]
            newNotes[currentNoteIndex] = updatedNote
            setNotes(newNotes)

            db.notes.update(selectedNote.$id, {colors: JSON.stringify(color)})
        } catch (err) {
            alert("You must select a note before changing colours")
        }
    }

  return (
    <div
        onClick={changeColor}
        style={{ backgroundColor: color.colorBody }}
        className='bg-gray-900 h-10 w-10 rounded-[50%] cursor-pointer transition-all duration-300 hover:scale-110 flex justify-end items-end overflow-cli relative'>
            <div 
            style={{backgroundColor: color.colorHeader}}
            className='h-5 w-5 absolute rounded-full -bottom-1 -right-1' />
    </div>
  )
}

export default Color