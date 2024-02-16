"use client"
import { useState, useEffect } from 'react';
export const useToken = () => {

    const [token, setTokenInternal] = useState(() => {
        return localStorage.getItem('token');
    })


    useEffect(() => {
    }, [token])

    const setToken = (newToken:string) => {
        localStorage.setItem('token', newToken);

        setTokenInternal(newToken);

    }

    return [token, setToken]

}