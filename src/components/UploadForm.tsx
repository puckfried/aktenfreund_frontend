import React, { useState } from 'react'
import { useRef } from 'react';


export default function UploadForm() {

  const uploader = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true)

    try {
      const formData= new FormData()
      formData.append("file", file)

      const res = await fetch(`http://localhost:8000/upload_data`, {
        method: "POST",
        body: formData,
        credentials: "include"
      })
      const result = await res.json()
      if (res.status !== 200){
        throw new Error("Upload fehlgeschlagen")
      }
      console.log(result)
      if (uploader.current) {
        uploader.current.value = '';
      }
      setIsUploading(false)
    } catch(e){
      console.log(e)
      setIsUploading(false)

    }

  };


  const activateInput = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files;
    console.log(files)
     if (files.length > 0 && uploader.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(files[0]);
      uploader.current.files = dataTransfer.files;
      const changeEvent = new Event('change', { bubbles: true });
      uploader.current.dispatchEvent(changeEvent);
     }

  }

  const handleDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault()
  }




  return (
     <form 
          className='border w-md p-6 h-[300px] rounded border-3 border-dashed border-gray-200 flex flex-col items-center justify-center '
          onDrop={activateInput}
          onDragOver={handleDragOver}
          >
          <label
            htmlFor='file-upload'
          >Die Pdf hier ablegen oder klicken</label>
          <input 
            id={"file-upload"}
            ref={uploader} 
            type="file" 
            accept='.pdf, application/pdf'
            onChange={handleFileUpload} 
            className='sr-only'
            aria-label='PDF-Datei auswählen'
            
            />
            {isUploading && <label>UPLOAD LÄUFT</label>}
        </form>
  )
}
