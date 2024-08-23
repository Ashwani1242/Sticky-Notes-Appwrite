import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { account } from '../appwrite/config'
import Spinner from '../icons/Spinner';

function ProtectedRoutes() {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                await account.get();
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen justify-center items-center gap-1">
                <Spinner />
                Loading...
            </div>
        )
    }

    return (isLoggedIn ? <Outlet /> : <Navigate to="/home" />)
}

export default ProtectedRoutes
