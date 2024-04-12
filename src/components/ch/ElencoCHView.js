import React, { useState, useEffect} from 'react'

import './ElencoCH.css'

const ElencoCHView = ({setAppElementoCHScelto}) => {
    //mi visualizza un elenco di CH presi da local storage e poi posso scegliere l'elemento da mandare in App.js per poi mandarlo alla stampa
 const [chSelezionato, setCHSelezionato] = useState('')
 const [elencoCH, setElencoCH]=useState([])

 //carico elenco ch:
 useEffect(()=>{
  elencoCHData()
 },[])



 const elencoCHData = ()=> {
  try {
    const elencoStringa = localStorage.getItem('elencoCH')
    if(elencoStringa){
        const elencoArray = JSON.parse(elencoStringa)
        setElencoCH(elencoArray)
      }
    
  } catch (error) {
    console.log('Errore nel recupero dati elenco CH da localStorage:', error);
  }
 }

 const handleSelectChange=(event)=>{
  const singoloCH = event.target.value 
  setCHSelezionato(singoloCH)
  setAppElementoCHScelto(singoloCH)
  //console.log('Elemento ch scelto:',singoloCH)
 }

//  const handleOptionClick =()=>{
//   elencoCHData()
// }

 

  return (
    <div className='containerListaCH'>
      <h2>Elenco CH:</h2>
      
      <select className='elencoCH' onChange={handleSelectChange}  >
      {elencoCH.map((elenco, index)=>(
         <option key={index} value={elenco}>
          {elenco}
         </option>
      ))

      }
      </select>
    </div>
  )
}

export default ElencoCHView