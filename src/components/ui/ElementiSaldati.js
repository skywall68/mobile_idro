import React, {useEffect, useState} from 'react'

import './ElementiSaldati.css'

function ElementiSaldati({appElementi, setAppElementoScelto}) {
  const [elementiSaldati, setElementiSaldati]=useState([])
  const [elementoScelto, setelementoScelto]= useState('')

  //const arrayAppElementi=Object.values(appElementi)
  
  useEffect(() => {
    const copiaElementi = async () => {
      if (appElementi != null) {
        let data=[];
       
        if (Array.isArray(appElementi)) {
          // Se appElementiSaldati è già un array, lo usiamo direttamente
          data = appElementi;
         
        } else if (typeof appElementi === 'object') {
          // Se appElementiSaldati è un oggetto, otteniamo i valori
          data = Object.values(appElementi);
        } else {
          // Se appElementiSaldati non è né un array né un oggetto, gestisci come desideri
          data = [];
        }
        
        setElementiSaldati(data);
      } else {
        setElementiSaldati([]);
      }
    };
    copiaElementi(); 
      
  }, [appElementi]);
  


  const  handleSelectChange = (e)=>{
   
    setelementoScelto(e.target.value)
    setAppElementoScelto(e.target.value)//lo mando in App.js per spedirlo in fooder.js per la stampa
    console.log('Elemento scelto:',e.target.value)
}


    

  return (

    <div className='ElementiSaldati'>
        <h2>Elementi Saldati</h2>
        <select className='elementi_select' onChange={handleSelectChange}>
          {elementiSaldati.map((elem, index) => (
             <option key={index} value={elem}>
               {elem}
             </option>
          ))}
        </select>
       
        </div>
  )
}

export default ElementiSaldati;