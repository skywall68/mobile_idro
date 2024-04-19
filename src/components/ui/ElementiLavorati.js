import React, {useEffect, useState} from 'react'

import './ElementiLavorati.css'

const ElementiLavorati = ({appElementi,setAppElementoScelto}) => {
    const[elementiLavorati, setElementiLavorati]=useState([])
    const[elementoScelto, setElementoScelto]=useState('')

    //Catturiamo gli elementi che arrivano da App.js che a sua volta arrivano da SeePdf.js
    useEffect(()=>{
      const copiaElementi = async () =>{
        if(appElementi != null){
          let data=[];
          if (Array.isArray(appElementi)) {
            // Se appElementiSaldati è già un array, lo usiamo direttamente
            data = appElementi;
        }  else if (typeof appElementi === 'object') {
          // Se appElementi è un oggetto, otteniamo i valori
          data = Object.values(appElementi);
        } else {
          // Se appElementi non è né un array né un oggetto, gestisci come desideri
          data = [];
        }
       
        setElementiLavorati(data);
      } else {
        setElementiLavorati([]);
      }
      }
      copiaElementi()
    },[appElementi])



    const handleSelectChange=(e)=>{
      setElementoScelto(e.target.value) //recupero il valore selezionato
      setAppElementoScelto(e.target.value)
      //console.log('elemento scelto:',e.target.value)

    }
    return (
    <div className='elementiLavorati'>

        <h2>Elementi Lavorati</h2>
         {elementiLavorati.length === 1 ?<div className='noElementi'> <h4>{elementiLavorati[0]}</h4></div>: 
              <select className='elementi_select'onChange={handleSelectChange}>
                  {
                    elementiLavorati.map((elem, index)=>(
                      <option key={index} value={elem} >
                      {elem}
                      </option>
                    ))
                   }
              </select>
          }   
    </div>
  )
}

export default ElementiLavorati