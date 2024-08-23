import React, { useState } from 'react'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'

function HomePage() {
    const [isLogginOpen, setIsLogginOpen] = useState(true)

    return (
        <div className='flex'>
            <div className='flex flex-1 justify-center items-center h-screen'>
                Placeholder
            </div>
            <div className='flex flex-col flex-1 justify-center items-center h-screen'>
                {isLogginOpen ? <LoginPage /> : <SignUpPage />}
                <div
                    onClick={() => { isLogginOpen ? setIsLogginOpen(false) : setIsLogginOpen(true) }}
                    className='cursor-pointer p-2 mt-4 rounded-md text-indigo-30 hover:text-indigo-300 transition-all duration-500'>
                    {isLogginOpen ? `Don't have an account? Signup` : 'Already a user? Login'}
                </div>
            </div>
        </div>
    )
}

export default HomePage


