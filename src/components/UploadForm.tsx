import { useRef } from 'react';


interface UploadFormProps {
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, uploader: React.RefObject<HTMLInputElement | null>) => void;
  isUploading: boolean;
}

export default function UploadForm(props: UploadFormProps) {

  const {handleFileUpload , isUploading} = props
  const uploader                         = useRef<HTMLInputElement>(null);



  const activateInput = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files;
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
    <>
     <form 
          className='border w-xs md:w-lg p-6 h-[400px] rounded border-5 border-dashed border-myred flex flex-col items-center justify-center '
          onDrop={activateInput}
          onDragOver={handleDragOver}
          >
          <label className='md:text-2xl underline cursor-pointer'
            htmlFor='file-upload'
            >Die Pdf ablegen oder hier klicken</label>
          <input 
            id={"file-upload"}
            ref={uploader} 
            type="file" 
            accept='.pdf, application/pdf'
            onChange={(e) => handleFileUpload(e, uploader)} 
            className='sr-only'
            aria-label='PDF-Datei auswählen'
            
            />
            {isUploading && <label>UPLOAD LÄUFT</label>}
        </form>
    </>
  )
}
