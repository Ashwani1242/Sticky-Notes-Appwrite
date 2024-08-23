import React, { useContext, useEffect, useState } from 'react'
import AddButton from './AddButton'
import colors from '../assets/colors.json'
import Color from './Color'
import { useNavigate } from 'react-router-dom'
import { account } from '../appwrite/config'
import User from '../icons/User'
import Exit from '../icons/Exit'
import { db } from '../appwrite/databases'
import Menu from './Menu'

function ControlPanel() {

  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get()
        setUserName(user.name)
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    }

    fetchUser();
  }, [])

  const logout = async () => {
    try {
      await account.deleteSession('current')
      navigate('/home')
    } catch (err) {
      console.error('Error logging out:', err);
    }
  }

  const handleCloseAccount = async () => {
    try {
      const user = await account.get();
      const userNotes = await db.notes.list(user.$id)

      const deletePromises = userNotes.documents.map(note => db.notes.delete(note.$id));
      await Promise.all(deletePromises);

      await account.updateStatus();

      navigate('/home');
    } catch (err) {
      console.error('Error deleting account:', err);
      alert('Failed to delete account. Please try again.');
    }
  }

  return (
    <div id='control-panel' className='flex gap-4 items-center fixed bottom-16 left-[50%] -translate-x-[50%] bg-neutral-700 p-4 w-fit rounded-full z-[1000]'>
      <AddButton />
      <div className='w-[2px] h-8 bg-neutral-500' />
      {
        colors.map((color) => (
          <Color key={color.id} color={color} />
        ))
      }

      <div className='w-[2px] h-8 bg-neutral-500' />

      {/* <button
        onClick={logout}
        className='bg-red-500 text-white h-10 w-10 flex justify-center items-center rounded-full transition-all duration-300 hover:scale-110 group' >
        <Exit />
        <div className='absolute text-xs text-transparent -translate-y-4 transition-all duration-500 group-hover:-translate-y-10 group-hover:text-white'> Logout </div>
      </button> */}
      <Menu />

      {/* <div className='w-[2px] h-8 bg-neutral-500' /> */}

      {/* <button
        className='bg-blue-400 text-white h-10 w-10 flex justify-center items-center rounded-full transition-all duration-300 hover:scale-110 group' >
        <User />
        <div className='absolute text-xs text-transparent -translate-y-4 transition-all duration-500 group-hover:-translate-y-10 group-hover:text-white'> {userName} </div>
      </button> */}

      {/* <button
        onClick={handleCloseAccount}
        className='bg-red-500 text-white p-2 rounded-md transition-all duration-300 hover:bg-red-700' >
        Close Account
      </button> */}
    </div>
  )
}

export default ControlPanel 