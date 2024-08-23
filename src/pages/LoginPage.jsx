import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { account } from '../appwrite/config'

function LoginPage() {
    const [userData, setUserData] = useState({ email: "", password: "" })
    const navigate = useNavigate()

    const login = async () => {
        try {
            await account.createEmailPasswordSession(userData.email, userData.password)
            navigate("/")
        } catch (err) {
            console.log(err)
            alert("Something went Wrong!")
        }
    }

    return (
        <div id='login' className='flex justify-center items-center'>
            <div id='login-form'
                className='flex flex-col border-2 border-neutral-500/40 rounded-2xl bg-neutral-700/20 p-6 gap-4'>
                <h2 className='text-4xl pb-6'>Login</h2>
                <input
                    type="email" 
                    id='login-email'
                    required
                    placeholder='Email'
                    onChange={(e) => setUserData({
                        ...userData,
                        email: e.target.value
                    })}
                    className='py-3 px-4 w-80 rounded-md outline-none transition-all duration-300 border-2 border-transparent focus:border-neutral-600' />
                <input
                    type="password" 
                    id='login-password'
                    required
                    placeholder='Password'
                    onChange={(e) => setUserData({
                        ...userData,
                        password: e.target.value
                    })}
                    className='py-3 px-4 w-80 rounded-md outline-none transition-all duration-300 border-2 border-transparent focus:border-neutral-600' />
                <button onClick={login} className='p-2 mt-4 rounded-md bg-indigo-500 hover:bg-indigo-400 transition-all duration-500'>Login</button>
            </div>
        </div>
    )
}

export default LoginPage
