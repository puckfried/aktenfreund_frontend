import './index.css'
import UploadForm from './components/UploadForm'
import { useUser } from './context/UserContext'
import LoginForm from './components/LoginForm'



function App() {

    const {userData, userHandleLogout} = useUser()

  return (
    <div className='min-h-screen flex flex-col text-gray-200 '>
    <header className='p-8 flex justify-between items-center'>
        <h1 className='text-gray-200 text-7xl myFont font-medium'>Aktenfreun.de</h1>
        <button className='cursor-pointer' onClick={userHandleLogout}>Logout</button>
      </header>

      <main className='flex-1 flex items-center justify-center' >
        { userData.id ? <UploadForm/> : <LoginForm />}
      </main>
    </div>
  )
}

export default App
