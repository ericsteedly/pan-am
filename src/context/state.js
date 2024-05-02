import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext()

export function AppWrapper({ children }) {
    const [profile, setProfile] = useState({})
    const [token, setToken] = useState('')

    useEffect(()=>{
        setToken(localStorage.getItem('token'))
    },[])

    useEffect(()=>{
        if (token) {
            localStorage.setItem('token', token)
            if (!'id' in profile) {
                console.log('NEED TO GET PROFILE')
            }
        }
    },[token])

    return (
        <AppContext.Provider value={{ profile, token, setToken, setProfile}}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}