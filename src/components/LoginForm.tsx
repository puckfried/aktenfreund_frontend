import React, { useState } from 'react'
import { useUser } from '../context/UserContext'

export default function LoginForm() {
  
    const [name, setName]   = useState("")
    const [pw, setPw]       = useState("")
    const {userHandleLogin} = useUser()

  return (
    <form 
        onSubmit={(e) => userHandleLogin(e, name, pw)} 
        className='text-black w-md text-lg flex flex-col justify-center align-center shadow-xl/30 rounded-lg border-solid border-black p-10 bg '
        >
        
        <h2 className='text-3xl text-center'>Anmeldung</h2>
        
        <label htmlFor="username" className='mt-6'>E-Mail</label>
        <input 
            type="text" 
            id="username"
            onChange={(e) => setName(e.target.value)}
            value={name} 
            className='bg-gray-300 rounded-lg mt-2 text-black p-1'/>
        
        <label htmlFor="password" className='mt-4'>Passwort</label>
        <input 
            type="password" 
            id="password" 
            onChange={(e) => setPw(e.target.value)}
            value={pw}
            className='bg-gray-300 rounded-lg mt-2 text-black p-1' />
        
        <input 
            className="text-gray-300 mt-10 border rounded-lg border-green-950 border-2 bg-egg cursor-pointer p-2" 
            type="submit" 
            name="Login" 
            id="login" 
            value="Absenden"/>
    </form>
  )
}
