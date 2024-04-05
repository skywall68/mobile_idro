import React, { useState, useEffect} from 'react'
import './MacchineView.css'

const MacchineView = ({setMacchinaSceltaApp,sceltaModuloApp}) => {
    const [macchinaSelezionata, setMacchinaSelezionata]=useState('')
    const [elencoMacchine, setElencoMacchine]= useState([])

    useEffect(()=>{
        elencoMacchineData() //chiamo la funzione per caricare elenco macchine
    },[])

    const handleSelectChange=(event)=>{
        const macchina = event.target.value //recupero la macchina
        setMacchinaSelezionata(macchina)
        setMacchinaSceltaApp(macchina)
    }

    //memorizzo la macchina scelta
    useEffect(()=>{
        localStorage.setItem('macchina',JSON.stringify(macchinaSelezionata))
    },[macchinaSelezionata])

    //carico le macchine prendendole da local storage:
    const elencoMacchineData = async ()=>{
        try {
            const elencoStringa = localStorage.getItem('elencoMacchine')
            if(elencoStringa){
                const elencoArray = JSON.parse(elencoStringa)
                setElencoMacchine(elencoArray)
                
            }
            
        } catch (error) {
            console.log('Errore nel recupero dati da localStorage:', error);
        }

    }

    // const handleOptionClick =()=>{
    //     elencoMacchineData()
    // }



  return (
    <div className={sceltaModuloApp === 'ch' ? 'containerMacchineCH select_macchineCH' :
    sceltaModuloApp === 'panier' ? 'containerMacchinePanier select_macchinePanier' :
    'containerMacchine select_macchine'}>
        <h4>Macchine:</h4>
        <select className={sceltaModuloApp === 'ch' ? 'select_macchineCH' :
        sceltaModuloApp === 'panier' ? 'select_macchinePanier' :
        ' select_macchine'} onChange={handleSelectChange} >
         {
            elencoMacchine.map((macchine, index)=>(
                <option key={index} value={macchine}>
                  {macchine}
                </option>
            ))
         }
        </select>
    </div>
  )
}

export default MacchineView