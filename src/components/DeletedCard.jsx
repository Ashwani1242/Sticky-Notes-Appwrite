import React, { useContext, useEffect, useRef } from 'react'
import DeleteButton from './DeleteButton'
import { autoSize, bodyParser } from '../utils'
import { NoteContext } from '../context/NoteContext'

function DeletedCard({ note }) {
  const colors = JSON.parse(note.colors)
  const body = bodyParser(note.body)
  
  const textAreaRef = useRef(null)

  const { setSelectedNote } = useContext(NoteContext)

  useEffect(() => {
    autoSize(textAreaRef)
}, [])

  return (
    <div
      className='card w-96 rounded-sm backdrop-blur-md backdrop-filter shadow-xl'
      style={{
        backgroundColor: colors.colorBody,
        opacity: 0.95
      }} >
      <div
        className='bg-cyan-300 flex justify-between items-start p-2 rounded-t-sm'
        style={{
          backgroundColor: colors.colorHeader,
        }} >
        <DeleteButton color={colors.colorBody} note={note} isNotes={ false } message={'Delete Permanently'}/>
        <DeleteButton color={colors.colorBody} note={note} isNotes={ false } message={'Delete Permanently'}/>
      </div>
      <div className='p-4'>
        <textarea
          spellCheck={false}
          name="" id=""
          disabled={true}
          onFocus={() => { setSelectedNote(note) }}
          ref={textAreaRef}
          style={{
            color: colors.colorText,
          }}
          defaultValue={body}
          onInput={() => { autoSize(textAreaRef) }}
          className='bg-inherit w-full h-full resize-none text-base border-none focus:outline-none cursor-text'>
        </textarea>
      </div>

    </div>
  )
}

export default DeletedCard
