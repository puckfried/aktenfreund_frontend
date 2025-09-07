import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserContextProvider } from './context/UserContext.tsx'
import { MessageContextProvider } from './context/MessageContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <MessageContextProvider>
         <UserContextProvider>
          <App />
         </UserContextProvider>
        </MessageContextProvider>
      
  </StrictMode>,
)
