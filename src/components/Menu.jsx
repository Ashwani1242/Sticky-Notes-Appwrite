import React, { useEffect, useState } from 'react'
import Exit from '../icons/Exit'
import Trash from '../icons/Trash'
import { useNavigate } from 'react-router-dom'
import { account } from '../appwrite/config'
import UserMinus from '../icons/UserMinus'
import { useContext } from 'react'
import { NoteContext } from '../context/NoteContext'
import User from '../icons/User'

function Menu() {
    const [isMenuOpen, setisMenuOpen] = useState(false)
    const { setIsBinOpen } = useContext(NoteContext)
    const [userName, setUserName] = useState('')

    const navigate = useNavigate()
    const logout = async () => {
        try {
            await account.deleteSession('current')
            navigate('/home')
        } catch (err) {
            console.error('Error logging out:', err);
        }
    }

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

    return (
        <div className='menu'>
            <div
                className=' text-white h-10 w-10 flex justify-center items-center' >
                <button onClick={() => setisMenuOpen((val) => !val)} className='bg-neutral-900 h-10 w-10 flex justify-cente items-cente rounded-full transition-all duration-300 hover:scale-110 absolute z-50'>
                    {/* <div className='relative w-full h-full'>
                        <span
                            style={{
                                left: '25%',
                                top: isMenuOpen ? '45%' : "32%",
                                rotate: isMenuOpen ? '45deg' : '0deg'
                            }}
                            className='absolute h-[2px] w-5 bg-white transition-all duration-300 rounded-full' />
                        <span
                            style={{
                                left: '25%',
                                top: isMenuOpen ? '45%' : "48%",
                                rotate: isMenuOpen ? '-45deg' : '0deg'
                            }}
                            className='absolute h-[2px] w-5 bg-white transition-all duration-300 rounded-full' />
                        <span
                            style={{
                                left: '25%',
                                top: isMenuOpen ? '45%' : "63%",
                                rotate: isMenuOpen ? '45deg' : '0deg'
                            }}
                            className='absolute h-[2px] w-5 bg-white transition-all duration-300 rounded-full' />
                    </div> */}
                    <div className='relative w-full h-full'>
                        <span // 1
                            style={{
                                width: '4px',
                                height: '4px',
                                top: isMenuOpen ? '45%' : "28%",
                                left: isMenuOpen ? '45%' : "28%",
                                rotate: isMenuOpen ? '45deg' : '0deg'
                            }}
                            className='absolute bg-white transition-all duration-300 rounded-full' />
                        <span // 2
                            style={{
                                width: '4px',
                                height: '4px',
                                top: isMenuOpen ? '45%' : "28%",
                                left: isMenuOpen ? '45%' : "45%",
                                rotate: isMenuOpen ? '45deg' : '0deg'
                            }}
                            className='absolute bg-white transition-all duration-300 rounded-full' />
                        <span // 3
                            style={{
                                width: '4px',
                                height: '4px',
                                top: isMenuOpen ? '45%' : "28%",
                                left: isMenuOpen ? '45%' : "62%",
                                rotate: isMenuOpen ? '45deg' : '0deg'
                            }}
                            className='absolute bg-white transition-all duration-300 rounded-full' />
                        <span // 4
                            style={{
                                width: '4px',
                                height: '4px',
                                top: isMenuOpen ? '45%' : "45%",
                                left: isMenuOpen ? '45%' : "28%",
                                rotate: isMenuOpen ? '45deg' : '0deg'
                            }}
                            className='absolute bg-white transition-all duration-300 rounded-full' />
                        <span // 5
                            style={{
                                width: '4px',
                                height: '4px',
                                top: isMenuOpen ? '45%' : "45%",
                                left: isMenuOpen ? '45%' : "45%",
                                rotate: isMenuOpen ? '45deg' : '0deg'
                            }}
                            className='absolute bg-white transition-all duration-300 rounded-full' />
                        <span // 6
                            style={{
                                width: '4px',
                                height: '4px',
                                top: isMenuOpen ? '45%' : "45%",
                                left: isMenuOpen ? '45%' : "62%",
                                rotate: isMenuOpen ? '45deg' : '0deg'
                            }}
                            className='absolute bg-white transition-all duration-300 rounded-full' />
                        <span // 7
                            style={{
                                width: '4px',
                                height: '4px',
                                top: isMenuOpen ? '45%' : "62%",
                                left: isMenuOpen ? '45%' : "28%",
                                rotate: isMenuOpen ? '45deg' : '0deg'
                            }}
                            className='absolute bg-white transition-all duration-300 rounded-full' />
                        <span // 8
                            style={{
                                width: isMenuOpen ? '20px' : '4px',
                                height: isMenuOpen ? '3px' : '4px',
                                top: isMenuOpen ? '45%' : "62%",
                                left: isMenuOpen ? '25%' : "45%",
                                rotate: '-45deg'
                            }}
                            className='absolute bg-white transition-all duration-300 rounded-full' />
                        <span // 9
                            style={{
                                width: isMenuOpen ? '20px' : '4px',
                                height: isMenuOpen ? '3px' : '4px',
                                top: isMenuOpen ? '45%' : "62%",
                                left: isMenuOpen ? '25%' : "62%",
                                rotate: '45deg'
                            }}
                            className='absolute bg-white transition-all duration-300 rounded-full' />
                    </div>
                </button>
                <div className='w-full h-full relative flex justify-center'>
                    <button
                        onClick={() => { alert(`Your User Name is ${userName}`) }}
                        style={{ top: isMenuOpen ? '-224px' : '0px', backgroundColor: isMenuOpen ? '#6366f1' : 'transparent' }}
                        className='absolute text-white h-10 w-10 flex transition-all duration-500 bg-indigo-50 justify-center items-center rounded-full hover:scale-110' >
                        <User />
                        <div
                            style={{
                                visibility: isMenuOpen ? 'visible' : 'hidden',
                                opacity: isMenuOpen ? 1 : 0,
                                transition: 'opacity 0.3s, visibility 0.3s',
                                left: '100%'
                            }}
                            className='absolute pr-2 pl-4 text-xs text-nowrap'> User: {userName} </div>
                    </button>
                    <button
                        onClick={() => { setIsBinOpen((val) => !val), setisMenuOpen(false) }}
                        style={{ top: isMenuOpen ? '-172px' : '0px', backgroundColor: isMenuOpen ? '#6366f1' : 'transparent' }}
                        className='absolute text-white h-10 w-10 flex transition-all duration-500 bg-indigo-50 justify-center items-center rounded-full hover:scale-110' >
                        <Trash color='#ffffff' />
                        <div
                            style={{
                                visibility: isMenuOpen ? 'visible' : 'hidden',
                                opacity: isMenuOpen ? 1 : 0,
                                transition: 'opacity 0.3s, visibility 0.3s',
                                left: '100%'
                            }}
                            className='absolute pr-2 pl-4 text-xs text-nowrap'> Bin </div>
                    </button>

                    <div style={{ top: isMenuOpen ? '-120px' : '0px', backgroundColor: isMenuOpen ? '#737373' : 'transparent' }} className='h-[2px] w-6 transition-all duration-500 rounded-full bg-neutral-500 absolute' />

                    <button
                        onClick={logout}
                        style={{ top: isMenuOpen ? '-104px' : '0px', backgroundColor: isMenuOpen ? '#ef4444' : 'transparent' }}
                        className='absolute text-white h-10 w-10 flex transition-all duration-500 justify-center items-center rounded-full hover:scale-110' >
                        <Exit />
                        <div
                            style={{
                                visibility: isMenuOpen ? 'visible' : 'hidden',
                                opacity: isMenuOpen ? 1 : 0,
                                transition: 'opacity 0.3s, visibility 0.3s',
                                left: '100%'
                            }}
                            className='absolute pr-2 pl-4 text-xs text-nowrap'> Logout </div>
                    </button>
                    <button
                        onClick={logout}
                        style={{ top: isMenuOpen ? '-52px' : '0px', backgroundColor: isMenuOpen ? '#ef4444' : 'transparent' }}
                        className='absolute text-white h-10 w-10 flex transition-all duration-500 justify-center items-center rounded-full hover:scale-110' >
                        <UserMinus />
                        <div
                            style={{
                                visibility: isMenuOpen ? 'visible' : 'hidden',
                                opacity: isMenuOpen ? 1 : 0,
                                transition: 'opacity 0.3s, visibility 0.3s',
                                left: '100%'
                            }}
                            className='absolute pr-2 pl-4 text-xs text-nowrap'> Close Account </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Menu
