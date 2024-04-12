//mi fa scegliere il file con tutte le voci per poi essere tabellizzate in App.js

import React, { useState} from 'react'

import './CheckListCH.css'

const CheckListCH = ({setSelectCH}) => {
    //recupero la  parte del modulo CH da un file json
  const [fileJson, setFileJson]=useState()
  const [isGreen, setIsGreen]=useState(false)

  const handleFileRead = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      setFileJson(content);

     
      
      // Memorizza il contenuto del file JSON pj8-CH in localStorage
      localStorage.setItem('jsonFileCH', content);
       //assegna true perchè è stato selezionato, questo per far apparire il tasto 'ok' su impostazioni.js
       setSelectCH(true) //abilita OK in impostazioni
       setIsGreen(true) //diventando true mi visalizza lo sfondo color verde
      
      
    };

    reader.readAsText(file);
  };


  return (
    <div className={ !isGreen ? 'containerCH':'containerCHGreen'}>
    <h2>ch_Completo</h2>
    <label htmlFor="fileInput"></label>
     <input type="file" accept=".CH" onChange={handleFileRead} style={{fontSize:20}} />
         
 </div>
  )
}

export default CheckListCH