//recuperiamo l'elemento scelto e lo portiamo in App.js
import React, { useState, useEffect} from 'react'

import './ElencoPanierView.css'

const ElencoPanierView = ({setAppElementoPanierScelto}) => {
     //mi visualizza un elenco di Panier presi da local storage e poi posso scegliere l'elemento da mandare in App.js per poi mandarlo alla stampa
 const [panierSelezionato, setPanierSelezionato] = useState('')
 const [ elencoPanier, setElencoPanier]=useState([])

 //carico elenco ch:
 useEffect(()=>{
  elencoPanierData()
 },[])

 const elencoPanierData = ()=> {
  try {
    const elencoStringa = localStorage.getItem('elencoPanier')
    if(elencoStringa){
        const elencoArray = JSON.parse(elencoStringa)
        setElencoPanier(elencoArray)
      }
    
  } catch (error) {
    console.log('Errore nel recupero dati elenco Panier da localStorage:', error);
  }
 }

 const handleSelectChange=(event)=>{
  const singoloPanier = event.target.value 
  setPanierSelezionato(singoloPanier)
  setAppElementoPanierScelto(singoloPanier)
  //console.log('Elemento ch scelto:',singoloCH)
 }

  return (
    <div className='containerListaPanier'>
     <h2>Elenco: </h2> 
     
     <select className='elencoPanier' onChange={handleSelectChange}  >
      {elencoPanier.map((elenco, index)=>(
         <option key={index} value={elenco}>
          {elenco}
         </option>
      ))

      }
      </select>
      </div>
  )
}

export default ElencoPanierView