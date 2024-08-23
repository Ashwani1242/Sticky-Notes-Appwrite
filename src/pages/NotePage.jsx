import { useContext } from 'react'
import NoteCard from '../components/NoteCard.jsx'
import { NoteContext } from '../context/NoteContext.jsx'
import ControlPanel from '../components/ControlPanel.jsx'
import Bin from '../components/Bin.jsx'

function NotePage() {
  const { notes } = useContext(NoteContext)

  return (
    <div>
      {notes.map(note => (<NoteCard key={note.$id} note={note} />))}
      <ControlPanel />
      <Bin />
    </div>
  )
}

export default NotePage
