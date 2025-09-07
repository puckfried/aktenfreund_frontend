import { useState } from 'react'
import { useMessage } from '../context/MessageContext';

export function useMistral(){

  interface BlobData {
    filename: string
    data: Blob
  }

    const [isUploading, setIsUploading] = useState(false)
    const [blobData, setBlobData]       = useState<null | BlobData>(null)
    const {createMessage}               = useMessage()  

    const downloadBlob = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        link.click()
        URL.revokeObjectURL(url)
        setBlobData(null)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, uploader: React.RefObject<HTMLInputElement | null>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true)
    createMessage({error: false, message: "Upload gestartet"})
    try {
      const formData= new FormData()
      formData.append("file", file)

      const res = await fetch(`http://localhost:8000/upload_data`, {
        method: "POST",
        body: formData,
        credentials: "include"
      })
       // ZIP-Datei als Blob herunterladen
      const blob = await res.blob()
      const filename = `${file.name.replace('.pdf', '.zip')}`
      // downloadBlob(blob, filename)
      if (res.status !== 200){
        throw new Error("Upload fehlgeschlagen")
      }
      if (uploader.current) {
        uploader.current.value = '';
      }
      setBlobData({data: blob, filename})
      setIsUploading(false)
    } catch(e){
      console.log(e)
      setIsUploading(false)
      createMessage({error: true, message: "Upload fehlgeschlagen"})

    }

  };

    return {
        handleFileUpload, downloadBlob, isUploading, blobData
    }    
}