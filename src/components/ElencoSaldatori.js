import React, {useState, useEffect} from 'react'

import './Saldatori.css'


const ElencoSaldatori = ({setSelectMacchineOrsaldatori}) => {
  
  const [elencoTxt, setElencoTxt]=useState([])
  const [isGreen,setIsGreen]=useState(false)

  useEffect(()=>{
    localStorage.setItem('elencoSaldatori',JSON.stringify( elencoTxt))
   
  },[elencoTxt])

  const handleFileChange = async(e)=>{
    const file = e.target.files[0]
    if(file){
      try {
        const fileContenuto = await readFile(file)
        const lines = fileContenuto.split('\n').filter(line => line.trim() !=='') //mi crea un array prendendo riga per riga
        setElencoTxt(lines)
        setSelectMacchineOrsaldatori(true) //mi permette di visualizzare il dato OK su Impostazioni.js
        setIsGreen(true) //mi porta il colore da rosso a verde
        // console.log('dentro Elencosaldatori.js.',lines)
       
       
        
      } catch (error) {
        console.log('da ElencoSaldatori.js errore caricamento file', error)
      }
    }
  }

  const readFile = (file)=>{
    return new Promise((resolve,reject)=>{
      const reader = new FileReader()
      reader.onload = (e)=>{
      resolve(e.target.result)
      }
      reader.onerror = (e)=>{
        reject(new Error('Errore nel leggere articolo (ElencoSaldatori.js)', e))
      }
      reader.readAsText(file)
    })
  }
  //style={{backgroundColor: isGreen ? 'chartreuse': 'red'}}
 
  return (
    <div className={!isGreen ? 'containerSaldatori':'containerSaldatoriGreen'}>
      <h2>  Elenco saldatori</h2>
      <label htmlFor="fileInput"></label>
      <input type='file' accept='.txt' onChange={handleFileChange} style={{fontSize:20}}/>
      </div>
  )
}

export default ElencoSaldatori