import { useRef, useEffect, useState, useContext } from 'react'
import { autoSize, setNewOffset, setZIndex, bodyParser } from '../utils'
import { db } from '../appwrite/databases'
import Spinner from '../icons/Spinner'
import DeleteButton from './DeleteButton'
import { NoteContext } from '../context/NoteContext'

function NoteCard({ note }) {
    const [saving, setSaving] = useState(false)
    const keyUpTimer = useRef(null)

    const [position, setPosition] = useState(JSON.parse(note.position))
    const colors = JSON.parse(note.colors)
    const body = bodyParser(note.body)

    let mouseStartPos = { x: 0, y: 0 }
    const cardRef = useRef(null)
    const textAreaRef = useRef(null)

    const { setSelectedNote } = useContext(NoteContext)

    const mouseDown = (e) => {
        if (e.target.id === "card-header") {
            setZIndex(cardRef.current)

            mouseStartPos.x = e.clientX
            mouseStartPos.y = e.clientY

            document.addEventListener('mousemove', mouseMove)
            document.addEventListener('mouseup', mouseUp)

            setSelectedNote(note)
        }
    }

    const mouseMove = (e) => {
        const mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        }

        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clientY

        const newPos = setNewOffset(cardRef.current, mouseMoveDir)

        setPosition(newPos)
    }

    const mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)

        const newPos = setNewOffset(cardRef.current)
        saveData('position', newPos)
    }

    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) }

        try {
            await db.notes.update(note.$id, payload)
        } catch (err) {
            console.error(err)
        }

        setSaving(false)
    }

    const handleKeyUp = () => {
        setSaving(true)

        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current)
        }

        keyUpTimer.current = setTimeout(() => {
            saveData("body", textAreaRef.current.value)
        }, 2000)
    }

    useEffect(() => {
        autoSize(textAreaRef)
        setZIndex(cardRef.current)
    }, [])

    return (
        <div
            ref={cardRef}
            className='card w-96 rounded-sm backdrop-blur-md backdrop-filter absolute shadow-xl'
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`,
                opacity: 0.95
            }} >
            <div
                onMouseDown={mouseDown}
                id='card-header'
                className='bg-cyan-300 flex justify-between items-center p-2 rounded-t-sm cursor-grab'
                style={{
                    backgroundColor: colors.colorHeader,
                }} >
                <DeleteButton color={colors.colorBody} note={note} isNotes={true} message={'Move To Bin'} />
                {saving && (
                    <div className="flex items-center gap-1">
                        <Spinner color={'#000000'} />
                        <span style={{ color: '#000000' }}>Saving...</span>
                    </div>
                )}
            </div>
            <div className='p-4'>
                <textarea
                    spellCheck={false}
                    name="" id=""
                    onKeyUp={handleKeyUp}
                    onFocus={() => { setZIndex(cardRef.current), setSelectedNote(note) }}
                    ref={textAreaRef}
                    style={{
                        color: colors.colorText,
                    }}
                    defaultValue={body}
                    onInput={() => { autoSize(textAreaRef) }}
                    className='bg-inherit w-full h-full resize-none text-base border-none focus:outline-none '>
                </textarea>
            </div>
        </div>
    )
}

export default NoteCard
