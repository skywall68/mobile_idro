//Scelgo il pdf pj8 o pj16
import React,{ useRef, useState, useEffect} from 'react'

import './ScegliPjPDF.css'

const ScegliPjPDF = ({setPjPdf,setSelectedFile}) => {
  const fileInputRef = useRef() //non viene modificato nei diversi render
  const [isGreen, setIsGreen]=useState(false)

  const handleFileChange = () => {
    // Puoi eseguire azioni aggiuntive quando il file viene selezionato
    setSelectedFile(fileInputRef.current.files[0].name)
    setPjPdf(fileInputRef.current);
    setIsGreen(true)
   
    //console.log("File selezionato:", fileInputRef.current.files[0].name, 'nome:',fileInputRef.current);
  };
  

  return (
    <div className={!isGreen ?'containerPjPdf':'containerPjPdfGreen'}>
        <h2>Pj</h2>
        <label htmlFor="fileInput"></label>
        <input
        id="fileInput"
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{fontSize:20}}
      />
        </div>
  )
}

export default ScegliPjPDF