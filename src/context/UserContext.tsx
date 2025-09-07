/* eslint-disable react-refresh/only-export-components */
import { useState, useContext, createContext, type ReactNode, type FormEvent, useEffect } from "react"
import { useMessage } from "./MessageContext"


interface UserData{
  id?: string
  username?: string
  email?: string
}

interface UserContextType {
    userIsLoggedIn: boolean
    userData: UserData
    userHandleLogin: (e: FormEvent, username: string, password: string) => Promise<boolean>
    userHandleLogout: () => Promise<void>
}

interface UserContextProviderProps {
  children: ReactNode
}


export const UserContext = createContext<UserContextType | undefined>(undefined)
const url = "http://localhost:8000"


export function UserContextProvider({children} : UserContextProviderProps){
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState<UserData>({})
    const {createMessage} = useMessage()

    async function fetchUser(){
        try{
            const res = await fetch(`${url}/getuser`, {method: "GET", credentials: "include"})
            const result = await res.json()
            if (res.status === 200){
                setUserData(result)
                createMessage({error: false, message: "Willkommen, Sie sind jetzt eingeloggt"})
            }
        } catch(e){
            console.log("Kein Cookie", e)
        }
    }
    

    useEffect(() => {
      fetchUser()   
    },[])
    
    async function userHandleLogin(e: FormEvent, email: string, password: string){
        e.preventDefault()
        try {
            const formdata = new FormData()
            formdata.append("username", email)
            formdata.append("password", password)
            const res = await fetch(url + "/token", {
                method: "POST",
                body: formdata,
                credentials: 'include'
            })
            const data = await res.json()
            if (res.status !== 200) {
                throw new Error(data.detail || "Fehler mit den Zugangsdaten" )
            }
            setUserData(data || {})
            return true
           
            
            
            
        } catch(error){
            setUserIsLoggedIn(false)
            if (error instanceof Error) 
                createMessage({error: true, message: String(error.message)})
          
            return false
        }
    }

    async function userHandleLogout(){
        try {
            const res = await fetch(`${url}/logout`,{method: "POST", credentials: "include"})
            const result = await res.json()
            if (res.status !==200) new Error(result.message)
            setUserData({})
            createMessage({error: false, message: result.detail})
        }catch(error){
            if (error instanceof Error) 
                createMessage({error: true, message: String(error.message)})
        }
    }

    return (
        <UserContext.Provider 
            value={{
                userIsLoggedIn,
                userData,
                userHandleLogin,
                userHandleLogout               

        }}>
        
            {children}
        
        </UserContext.Provider>
    )
}


export function useUser(): UserContextType{
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserContextProvider')
    }
    return context
}