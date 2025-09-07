import { useMessage } from '../context/MessageContext'

export default function MessageBox() {

    const {messageData, closeMessage} = useMessage()
    

return (
    <div className='w-[300px] min-h-[180px] bg-gray-300 border border-myred p-5 border-dashed absolute bottom-10 right-10 rounded-xl flex align-center flex-col justify-between'>
        <div className='flex justify-between align-center flex-1'>
            <h3 className={`${messageData.error ? 'text-red-400' : 'text-green-900'} text-lg font-bold`}>{messageData.error ? "Fehler" : "Info"}</h3>
            <span className='text-myred font-bold w-[30px] h-[30px] border flex justify-center align-center rounded-2xl hover:bg-myred hover:text-white cursor-pointer'  onClick={() => closeMessage()}>X</span>
        </div>
        <p className={`text-black text-center  `}>{messageData.message}</p>
        <span className='flex-1'></span>
    </div>


  )
}
