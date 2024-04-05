import React, { useState,useEffect} from 'react'

import './TipologiaView.css'

const TipologiaView = ({setTipologiaSceltaApp}) => {
  const [tipologiaSelezionata, setTipologiaSelezionata]=useState('') //tipologia elemento scelto
  const [elencoTipologia, setElencoTipologia]= useState([])

  //carico la dropdownlist dei tipi di elementi da localstorage
  const elencoTipiElementiData = async()=>{
    try {
      const elencoStringa = await localStorage.getItem('tipologia');
          if (elencoStringa) {
            const elencoArray = JSON.parse(elencoStringa);
            setElencoTipologia(elencoArray);
          }
      } catch (error) {
      console.log('Errore nel recupero dati tipologia.tpl da localStorage:', error);
    }
  }

  //recupero il tipo di elemento scelto nella dropdownlist
  const handleSelectChange = (event)=>{
  const tipologiaScelta = event.target.value
  setTipologiaSelezionata(tipologiaScelta)
  setTipologiaSceltaApp(tipologiaScelta)
  }

  //memorizzo la tipologia scelta sullo store
  useEffect(()=>{
    localStorage.setItem('tipologiaselezionata',JSON.stringify(tipologiaSelezionata))
    },[tipologiaSelezionata])


    //quando premo il click sull'elemento mi fa partire la funzione che memorizza il dato sullo store
  const handleOptionClick =()=>{
    elencoTipiElementiData()
  }

  return (
    <div className='tipologiaBody'>
      <h2>Tipologia</h2>
        <select className='select_tipologia' onChange={handleSelectChange} onClick={handleOptionClick}>
         {elencoTipologia.map((tipologie,index)=>(
          <option key={index} value={tipologie}>
            {tipologie}
          </option>
         ))}
        </select>
      </div>
  )
}

export default TipologiaView