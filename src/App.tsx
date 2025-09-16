import './index.css'
import UploadForm from './components/UploadForm'
import { useUser } from './context/UserContext'
import LoginForm from './components/LoginForm'
import logoutIcon from "./assets/logout.svg"
import icon from "./assets/icon.png"
import { useMessage } from './context/MessageContext'
import MessageBox from './components/MessageBox'
import { useMistral } from './hooks/useMistral'

function App() {

    const {userData, userHandleLogout} = useUser()
    const {isVisible} = useMessage()
    const {downloadBlob, blobData, handleFileUpload , isUploading} = useMistral()

  return (
    <div className='min-h-screen flex flex-col text-gray-200 '>
    <header className='p-10 flex justify-between items-center'>
        <div className='flex items-center gap-10'>
          <img src={icon} alt="Aktenfreund Icon" className='h-20'/>          
          <h1 className='text-gray-200 text-5xl myFont font-medium'>Aktenfreun.de</h1>

        </div>
        <button className='cursor-pointer' onClick={userHandleLogout}>
          <img src={logoutIcon} alt="Logout Icon" />
        </button>
      </header>

      <main className='flex-1 flex items-center justify-center' >
        { userData.id ? 
        <div>
          {!blobData ? 
            <UploadForm handleFileUpload={handleFileUpload} isUploading={isUploading}/> : 
            <div 
              className='text-center p-10 border-5 border-dashed border-myred hover:scale-125 transition duration-500 cursor-pointer'
              onClick={() => downloadBlob(blobData.data, blobData.filename)}
            >
              <h2 className='text-2xl '>Jetzt herunterladen:
                <span className='ml-5'> &rarr; {blobData.filename} &larr;</span>
              </h2>
            </div>
        }
        
        </div>
        : <LoginForm />}
      </main>
      {isVisible && <MessageBox />}
    </div>
  )
}

export default App
