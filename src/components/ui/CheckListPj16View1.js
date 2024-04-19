//visualizzo la prima parte della lista pj16 in tabella da 1 a 5
import React, { useState, useEffect} from 'react'

import ModalMio from '../ModalMio'
import './CheckListPj16View1.css'

const CheckListPj16View1 = ({setListaPagina1Pj16App,elencoAzioniApp}) => {
  const [controlli, setControlli] = useState([])
  const [showModalMio, setShowModalMio]=useState(false)
  const [mioID, setMioID]=useState(0)
  const [commenti, setCommenti]=useState('')
  
 
 //console.log('valore del file json:', filePj8Json1App)
  //console.log('array di oggetti filtrato:',fileArrayObjFiltrato)

 //********** uso  useEffect con la parentesi [] vuota perchè mi fa solo una volta il render, se è senza diventa un ciclo se invece ha un valore dentro viene ripetuto tutte le volte che il valore cambia
 //prendo il file json da local storage recupero i primi sette valori e li metto dentro useState
   const filePj16Json1 =localStorage.getItem('jsonFilePj16')
 useEffect(()=>{
  let fileArrayOggetti = [];
  if (filePj16Json1) {
  fileArrayOggetti = JSON.parse(filePj16Json1);
}
   const fileArrayObjFiltrato = fileArrayOggetti.filter(elemento => elemento.id >=1 && elemento.id <=5)
   setControlli(fileArrayObjFiltrato)
 },[])

 //***********mi permette di nascondere la tabella***********************
 const [mostraTabella, setMostraTabella] = useState(true);  
 const handleToggleTabella = () => {
   setMostraTabella((prev) => !prev);
 }; 
 //*************Recupero i valori nella option box********************** 
 const handleOptionChange =(id, conformeValue)=>{
   const updatedItems = controlli.map(item =>{
     if (item.id === id) {
      setMioID(item.id) //recupero il id della riga per mandarla nel modalMio per commenti/azioni
       //APRE IL MODAL se è 'non conforme'
       if(conformeValue === false){
        console.log('dentro controlli!!!')
      //devo portare id nella modale
       setShowModalMio(true)
        }
       return { ...item, conforme: conformeValue };
     }
     return item;
   });
   setControlli(updatedItems)
   setListaPagina1Pj16App(updatedItems) //recupero i valori per portarli in App.js per poi stamparli
   }
   //console.log('valore:',controlli)
   
 //************************************************************************ */
 //******************Recupero i commenti ************************************* */
 const handleInputChangeCommenti = (id,field,value) =>{
  setControlli(prevControlli=>{
    // Creiamo un nuovo array mappando i commenti esistenti
    const updatedControlli = prevControlli.map(commento => {
      // Se l'ID corrisponde, creiamo un nuovo oggetto con il valore aggiornato
      return commento.id === id ? { ...commento, [field]: value } : commento;
    });
  // Restituiamo il nuovo array aggiornato
 // console.log('valore Recupero i valori COMMENTO in update:',updatedControlli)
return updatedControlli;
});
   //console.log(`ID: ${id}, Campo: ${field}, Valore: ${value}`);
   //setListaPagina1Pj16App(controlli) //recupero i valori per portarli in App.js per poi stamparli ??????????????????????????????????
 }
 //*************************************************************************** */
 //***********************Recupero le azioni********************************** */
 const handleInputChangeAzione = (id,field,value) =>{

   setControlli((prevControlli)=>
     prevControlli.map((azione)=>
      azione.id === id ? {...azione,[field]:value}: azione
     )
   )
   setListaPagina1Pj16App(controlli) //recupero i valori per portarli in App.js per poi stamparli ???????????ma una sovrascrive l'altra, non è meglio mandare un array???????????????????????
 }

 useEffect(()=>{
  setListaPagina1Pj16App(controlli)
  //console.log('valore di AZIONE PJ16:',controlli)
},[controlli])
//***********************Lavoro con ModalMio***************************
//funzione che chiude Modal richiamata dal componente ModalMio
const closeModalMio =()=>{
  //console.log('controlli.',controlli)
  setShowModalMio(false)
}
//*********************************fine******************************** */ 

 return (
    <div className='checklistPj16'>
    <div className='bottone'>
      <button onClick={handleToggleTabella}>
      {mostraTabella ? 'O' : 'V'}
      </button>
      {/* <h2 style={{marginTop:'-20px', backgroundColor:'lightgrey'}}>Controlli</h2> */}
     </div>
     <div>
     {mostraTabella && ( 
     <table className='tabella pj16'>
     <thead>
     <tr>
       <th>CONTROLLI</th>
       <th colSpan="2">RISULTATO CONTROLLO</th>
       {/* <th >COMMENTI/PRECISAZIONI</th>
       <th>AZIONE CURATIVA</th> */}
     </tr>
     <tr>
       <th></th>
       <th>CONFORME</th>
       <th>NON CONFORME</th>
       {/* <th></th>
       <th></th> */}
     </tr>
   </thead>
   <tbody>
     {
       controlli.map((controllo)=>(
         <tr key={controllo.id}>
           <td>{controllo.nome}</td>
            <td>
               <label>
                 <input
                   type="radio"
                   name={`risultato-${controllo.id}`}
                   value="true"
                   checked={controllo.conforme === true}
                   onChange={()=> handleOptionChange(controllo.id, true)}
                  />
             </label>
             </td>
             <td>
               <label>
                 <input
                   type="radio"
                   name={`risultato-${controllo.id}`}
                   value="false"
                   checked={controllo.conforme === false}
                   onChange={()=> handleOptionChange(controllo.id, false)}
                  />
               </label>
             </td>
             {/* <td>
               <input
                 type='text'
                 value={controllo.commenti}
                 onChange={(e)=>handleInputChangeCommenti(controllo.id, 'commenti', e.target.value)}
                 placeholder='commenti'
               />
             </td>
             <td>
               <input
                 type='text'
                 value={controllo.azioneCurativa}
                 onChange={(e)=>handleInputChangeAzione(controllo.id, 'azioneCurativa', e.target.value)}
                 placeholder='azione curativa'
               />
             </td> */}
         </tr>
       ))
     }
    </tbody>
 </table>
     )}{/*fine mostra tabella*/}
     <ModalMio 
     showModalMio={showModalMio} 
     closeModalMio={closeModalMio}
     handleInputChangeCommenti={handleInputChangeCommenti}
     handleInputChangeAzione={handleInputChangeAzione}
     setControlli={setControlli}
     controlli={controlli}
     commenti={commenti}
     setCommenti={setCommenti}
     mioID={mioID}
     elencoAzioniApp={elencoAzioniApp}
     /> 
    </div>
 </div>
)
}

export default CheckListPj16View1