import { axiosInstance } from '@/lib/axios';
import { useAuth } from '@clerk/clerk-react';
import { LoaderIcon } from 'lucide-react';
import React, { ReactNode, useEffect, useState } from 'react'

const updateApiToken = (token: string | null) => {
    if (!token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete axiosInstance.defaults.headers.common["Authorization"]
    }
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { getToken } = useAuth();

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken()
                updateApiToken(token)
            } catch (error) {
                updateApiToken(null)
                console.log("Error in auth provider", error)
            } finally {
                setLoading(false)
            }
        }

        initAuth();
    }, [getToken])

    if (loading) {
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <LoaderIcon className='size-8 text-emerald-500 animate-spin' />
            </div>
        )
    }

    return <div className=''>
        {children}
    </div>
}

export default AuthProvider