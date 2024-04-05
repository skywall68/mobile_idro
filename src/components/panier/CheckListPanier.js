//mi fa scegliere il file con tutte le voci per poi essere tabellizzate in App.js

import React, { useState} from 'react'

import './CheckListPanier.css'

const CheckListPanier = ({setSelectPanier}) => {
 //recupero la  parte del modulo Panier da un file json
 const [fileJson, setFileJson]=useState()
 const [isGreen, setIsGreen]=useState(false)

 const handleFileRead = (e) => {
   const file = e.target.files[0];
   const reader = new FileReader();

   reader.onload = (event) => {
     const content = event.target.result;
     setFileJson(content);

    
     
     // Memorizza il contenuto del file JSON pj16-Panier in localStorage per visualizzare nelle due tabelle
     localStorage.setItem('jsonFilePanier', content);
      //assegna true perchè è stato selezionato, questo per far apparire il tasto 'ok' su impostazioni.js
      setSelectPanier(true) //abilita OK in impostazioni
      setIsGreen(true) //diventando true mi visalizza lo sfondo color verde
     
     
   };

   reader.readAsText(file);
 };


 return (
   <div className={ !isGreen ? 'containerPanier':'containerPanierGreen'}>
   <h2>panierCompleto:</h2>
   <label htmlFor="fileInput"></label>
    <input type="file" accept=".PANIER" onChange={handleFileRead} style={{fontSize:20}} />
        
</div>
 )
}

export default CheckListPanier