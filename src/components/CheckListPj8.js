import React, { useState} from 'react'

import './CheckListPj8.css'

const CheckListPj8 = ({setSelectedPj8OrPj16}) => {
  //recupero la  parte del modulo pj8 da un file json
  const [fileJson, setFileJson]=useState(null)
  const [isGreen, setIsGreen]=useState(false)
  
  const handleFileRead = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      setFileJson(content);

      // Memorizza il contenuto del file JSON in App.js
      //setFilePj8Json1(content)
      // Memorizza il contenuto del file JSON pj8 in localStorage
      localStorage.setItem('jsonFilePj8', content);
       //assegna true perchè è stato selezionato, questo per far apparire il tasto 'ok' su impostazioni.js
       setSelectedPj8OrPj16(true)
       setIsGreen(true)
      
      
    };

    reader.readAsText(file);
  };

 


  return (
    <div className={ !isGreen ? 'containerPj81':'containerPj81Green'}>
       <h2>Parametri Pj8 (pj8checklistCompleto)</h2>
       <label htmlFor="fileInput"></label>
        <input id="fileInput" type="file" accept=".txt" onChange={handleFileRead} style={{fontSize:20}} />
            
    </div>
  )
}

export default CheckListPj8