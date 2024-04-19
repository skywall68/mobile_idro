import React,{ useState} from 'react'

import './ParametriStampa.css'

const ParametriStampa = ({setSelectedParametriStampa,selectedFile}) => {
    const[fileJson, setFileJson]=useState(null)
    const [isGreen, setIsGreen]=useState(false)
    //const [tipopj, setTipoPj]= useState('') //mi dice quale pj è stato selezionato per poi farmi visualizzare i parametri stampa giusti visto che sono leggermente differenti
    
    
    const handleFileRead = (e) => {
        if(fileJson === null){
           const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (event) => {
          const content = event.target.result;
          setFileJson(content);
    
          // Memorizza il contenuto del file JSON in localStorage
          localStorage.setItem('parametriStampa', content);
          setSelectedParametriStampa(true)
          setIsGreen(true)
        };
    
        reader.readAsText(file);
        } 
       
      };

    return (
        <div className={!isGreen ?'containerParametriStampa':'containerParametriStampaGreen'}>
            <h2>Parametri Stampa</h2>
            {/* <label htmlFor="fileInput">Seleziona un file .pst:</label>
            <div id="customFileInput" onClick={() => document.getElementById('fileInput').click()}>
             Parametri Stampa
            </div> */}
              <label htmlFor="fileInput"></label>
            { selectedFile ==='PJ 8 - rev 6 - IT.pdf' ?
          //  <input id="fileInput" type="file" accept=".pst8" onChange={handleFileRead} style={{ display: 'none' }} /> :
          //  <input id="fileInput" type="file" accept=".pst16" onChange={handleFileRead} style={{ display: 'none' }} />
           <input id="fileInput" type="file" accept=".txt" onChange={handleFileRead} style={{fontSize:20}} /> :
            selectedFile ==='PJ 16 - rev 2 - IT.pdf' ?
           <input id="fileInput" type="file" accept=".txt" onChange={handleFileRead} style={{fontSize:20}}  /> :
           selectedFile ==='PJ 8 - rev 6 - CH.pdf' ?
           <input id="fileInput" type="file" accept=".txt" onChange={handleFileRead} style={{fontSize:20}}  /> :
           selectedFile ==='PJ 16 - rev 2 - PANIER.pdf' ?
           <input id="fileInput" type="file" accept=".txt" onChange={handleFileRead} style={{fontSize:20}}  /> :
           
           <input id="fileInput" type="file" onChange={handleFileRead} style={{fontSize:20}}  />

            }
            
        </div>
      )
    }

export default ParametriStampa