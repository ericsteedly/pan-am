import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext()

export function AppWrapper({ children }) {
    const [profile, setProfile] = useState({})
    const [token, setToken] = useState('')
    const [departQuery, setDepartQuery] = useState(()=>{
        if (typeof window !== 'undefined') {
        const storedDepart = sessionStorage.getItem('departQuery')
        return storedDepart ? JSON.parse(storedDepart) : null
        }
    })
    const [returnQuery, setReturnQuery] = useState(()=>{
        if (typeof window !== 'undefined') {
        const storedReturn = sessionStorage.getItem('returnQuery')
        return storedReturn ? JSON.parse(storedReturn) : null
        }
    })

    useEffect(()=>{
        sessionStorage.setItem('departQuery', JSON.stringify(departQuery))
    },[departQuery])

    useEffect(()=>{
        sessionStorage.setItem('returnQuery', JSON.stringify(returnQuery))
    },[returnQuery])

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
        <AppContext.Provider 
            value={{ 
                profile, 
                token,
                departQuery,
                returnQuery, 
                setToken, 
                setProfile,
                setDepartQuery,
                setReturnQuery
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}