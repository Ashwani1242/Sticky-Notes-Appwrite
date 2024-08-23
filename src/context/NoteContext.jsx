import { createContext, useEffect, useState } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";
import { account } from "../appwrite/config";

export const NoteContext = createContext()

const NoteProvider = ({ children }) => {
    const [selectedNote, setSelectedNote] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState([])
    const [binNotes, setBinNotes] = useState([])
    const [isBinOpen, setIsBinOpen] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        try {
            const user = await account.get()
            const notesRes = await db.notes.list(user.$id);
            const binNotesRes = await db.binNotes.list(user.$id);
            setNotes(notesRes.documents)
            setBinNotes(binNotesRes.documents)
        } catch (err) {
            console.log("Error Fetching Notes ", err)
            setNotes([])
            setBinNotes([])
        } finally {
            setLoading(false)
        }
    }

    const contextData = { notes, setNotes, selectedNote, setSelectedNote, isBinOpen, setIsBinOpen, binNotes, setBinNotes, warningModal, setWarningModal }

    return (<NoteContext.Provider value={contextData}>
        {loading ? (
            <div className="flex h-screen justify-center items-center gap-1">
                <Spinner />
                PLaese Wait...
            </div>
        ) : children}
    </NoteContext.Provider>)
}

export default NoteProvider