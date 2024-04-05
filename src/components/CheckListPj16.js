import React, {useState} from 'react'

import './CheckListPj16.css'

const CheckListPj16 = ({setSelectedPj8OrPj16}) => {
    //recupero la  parte del modulo pj8 da un file json
  const [fileJson, setFileJson]=useState(null)
  const [isGreen, setIsGreen]=useState(false)

  const handleFileRead = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      setFileJson(content);
      // Memorizza il contenuto del file JSON pj16 in localStorage
      localStorage.setItem('jsonFilePj16', content);

      // Memorizza il contenuto del file JSON in App.js
      //setFilePj16Json(content)
      //assegna true perchè è stato selezionato, questo per far apparire il tasto 'ok' su impostazioni.js
      setSelectedPj8OrPj16(true)
      setIsGreen(true) //mi modifica il colore una volta selezionato
      
      
    };

    reader.readAsText(file);
  };

  return (
    <div className={ !isGreen ?'containerPj16': 'containerPj16Green'}>
        <h2>Parametri Pj16</h2>
        <label htmlFor="fileInput"></label>
        <input type="file" accept=".pj16" onChange={handleFileRead}style={{fontSize:20}} />
    </div>
  )
}

export default CheckListPj16