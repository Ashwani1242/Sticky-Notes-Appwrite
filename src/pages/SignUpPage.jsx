import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { account } from '../appwrite/config'
import { ID } from 'appwrite'

function SignUpPage() {
    const [userData, setUserData] = useState({ name: "", email: "", password: "" })
    const navigate = useNavigate()

    const signUp = async () => {
        try {
            await account.create(ID.unique(), userData.email, userData.password, userData.name);
            await account.createEmailPasswordSession(userData.email, userData.password)
            navigate("/")
        } catch (error) {
            console.log(error);
            alert("Something went wrong during signup!");
        }
    }

    return (
        <div id='signup' className='flex justify-center items-center'>
            <div id='signup-form'
                className='flex flex-col border-2 border-neutral-500/40 rounded-2xl bg-neutral-700/20 p-6 gap-4'>
                <h2 className='text-4xl pb-6'>Signup</h2>
                <input
                    type="text" 
                    id='signup-name'
                    required
                    placeholder='Name'
                    onChange={(e) => setUserData({
                        ...userData,
                        name: e.target.value
                    })}
                    className='py-3 px-4 w-80 rounded-md outline-none transition-all duration-300 border-2 border-transparent focus:border-neutral-600' />
                <input
                    type="email" 
                    id='signup-email'
                    required
                    placeholder='Email'
                    onChange={(e) => setUserData({
                        ...userData,
                        email: e.target.value
                    })}
                    className='py-3 px-4 w-80 rounded-md outline-none transition-all duration-300 border-2 border-transparent focus:border-neutral-600' />
                <input
                    type="password" 
                    id='signup-password'
                    required
                    placeholder='Password'
                    onChange={(e) => setUserData({
                        ...userData,
                        password: e.target.value
                    })}
                    className='py-3 px-4 w-80 rounded-md outline-none transition-all duration-300 border-2 border-transparent focus:border-neutral-600' />
                <button onClick={signUp} className='p-2 mt-4 rounded-md bg-indigo-500 hover:bg-indigo-400 transition-all duration-500'>Signup</button>
            </div>
        </div>
    )
}

export default SignUpPage
