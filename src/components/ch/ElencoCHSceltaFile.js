import React, { useState,useEffect} from 'react'

import './ElencoCHSceltaFile.css'

const ElencoCHSceltaFile = () => {
    const [elencoTxt, setElencoTxt]=useState([])
    const [isGreen, setIsGreen]=useState(false)

     //memorizzo in localstorage
    useEffect(()=>{
    localStorage.setItem('elencoCH',JSON.stringify(elencoTxt))
   
  },[elencoTxt])

  const handleFileChange =async(e)=>{
    const file = e.target.files[0]
    if(file){
      try {
        const fileContenuto = await readFile(file)
        const lines = fileContenuto.split('\n').filter(line => line.trim() !=='') //mi crea un array prendendo riga per riga
        setElencoTxt(lines)
        //setSelectMacchineOrsaldatori(true) //mi permette di visualizzare il dato OK su Impostazioni.js
        setIsGreen(true) //mi rende il componente verde
       // console.log('dentro ElencoMacchine.js.',lines)

        
      } catch (error) {
        console.log('da ElencoCHSceltaFile.js errore caricamento file', error)
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
            reject(new Error('Errore nel leggere articolo (ElencoMacchine.js)', e))
          }
          reader.readAsText(file)
    
        })
      }
    


  return (
    <div className={!isGreen ? 'containerCHElenco' :'containerCHElencoGreen'  }><h2>Carico elenco CH</h2>
    <label htmlFor="fileInput"></label>
    <input type='file' accept='.chelenco' onChange={handleFileChange} style={{fontSize:20}}/>
    </div>
  )
}

export default ElencoCHSceltaFile