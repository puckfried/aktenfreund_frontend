/* eslint-disable react-refresh/only-export-components */
import { useState, useContext, createContext, type ReactNode } from "react"


interface MessageData{
  
  message?: string
  error?: boolean
}

interface MessageContextType {
    isVisible: boolean
    messageData: MessageData
    createMessage: (m: MessageData) => void
    closeMessage: () => void
}

interface MessageContextProviderProps {
  children: ReactNode
}


export const MessageContext = createContext<MessageContextType | undefined>(undefined)



export function MessageContextProvider({children} : MessageContextProviderProps){
    const [isVisible, setIsVisible] = useState(false)
    const [messageData, setMessageData] = useState<MessageData>({})

    const createMessage = (message: MessageData) => {
        setMessageData(message)
        setIsVisible(true)
        
        setTimeout(() => setIsVisible(false), 5000)
    }

    const closeMessage = () => {
        setIsVisible(false)
    }
    
    
    return (
        <MessageContext.Provider 
            value={{
                isVisible,
                messageData,
                createMessage,                
                closeMessage

        }}>
        
            {children}
        
        </MessageContext.Provider>
    )
}


export function useMessage(): MessageContextType{
    const context = useContext(MessageContext)
    if (context === undefined) {
        throw new Error('useMessage must be used within a UserContextProvider')
    }
    return context
}