import React, { useState, useEffect} from 'react'

import ModalMio from '../ModalMio'
import './CheckListCHDimensioniView.css'

const CheckListCHDimensioniView = ({setListaPagina2Pj8App, elencoAzioniApp, appPulisciCampo, setAppPulisciCampo}) => {
  //recupero la seconda  parte del modulo pj8 da local storage
  const [controlli, setControlli] = useState([])
  const [inizioControlli, setInizioControlli]=useState([])
  const [showModalMio, setShowModalMio]=useState(false)
  const [mioID, setMioID]=useState(0)
  const [commenti, setCommenti]=useState('')

   //recupero il file memorizzato
    //*******prendo il file json da local storage recupero dal id7 al id20 dentro useState***************
    const filePj8CHJson1 =localStorage.getItem('jsonFileCH') 
    //carico la tabella
    useEffect(()=>{
      let fileArrayOggetti =[] //definisco un array vuoto
      if (filePj8CHJson1) {   // se abbiamo dei dati allora carica l'array
        fileArrayOggetti = JSON.parse(filePj8CHJson1);
      }
      const fileArrayObjFiltrato = fileArrayOggetti.filter(elemento => elemento.id >=8 && elemento.id <=15) //recupera i valori dell'array da id7 a id14
       setControlli(fileArrayObjFiltrato)
       setInizioControlli(fileArrayObjFiltrato)
       //console.log('chekdimensioni prima volta 1:',controlli)
       //console.log('chekdimensioni prima volta 2:',inizioControlli)
  
      },[])
      // //ricarico la tabella senza le spunte
      useEffect(()=>{
        if(appPulisciCampo){
         
          let fileArrayOggetti =[]
          if (filePj8CHJson1) {
            fileArrayOggetti = JSON.parse(filePj8CHJson1);
          }
          const fileArrayObjFiltrato = fileArrayOggetti.filter(elemento => elemento.id >=8 && elemento.id <=15)
           setControlli(fileArrayObjFiltrato)
           setInizioControlli(fileArrayObjFiltrato)
           //console.log('chekdimensioni prima volta 3:',controlli)
           //console.log('chekdimensioni prima volta 4:',inizioControlli)
           setAppPulisciCampo(false)
          }
      },[appPulisciCampo])
 //******************mi permette di nascondere la tabella********************* */
      const [mostraTabella, setMostraTabella] = useState(true); //mi permette di nascondere la tabella
      //mostra tabella:
      const handleToggleTabella =()=>{
      setMostraTabella((prev)=> !prev)
 }
 //****************prende il valore della checkbox**************** */
 const handleCheckboxChange = (event,id)=>{
  const newControlli = [...controlli];
  if (event.target.checked) {
    newControlli[id].conforme = event.target.name;
  } else {
    newControlli[id].conforme = '';
  }
  setControlli(newControlli);
  //console.log('valore di checkbox:', id, controlli[id].conforme, 'id:', controlli[id].id) 
  setMioID(controlli[id].id) 
  //setListaPagina2Pj8App(controlli)
  //APRE IL MODAL se è 'non conforme'
  if(controlli[id].conforme ==='Non Conforme'){
    //devo portare id nella modale
    setShowModalMio(true)
  }

}
//**************prende il valore del commento ******************* */
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
    
//console.log(`(CheckCHDimensioni.js f:handleInputChangeCommenti)ID: ${id}, Campo: ${field}, Valore: ${value}`);
//console.log('dentro CH:', controlli)
setCommenti('')


}
//****************prende il valore dell'azione ********************* */
const handleInputChangeAzione = (id,field,value) =>{
  setControlli((prevControlli)=>
    prevControlli.map((azione)=>
     azione.id === id ? {...azione,[field]:value}: azione
  )
)
//console.log(`(CheckCHDimensioni.js f:handleInputChangeAzione)ID: ${id}, Campo: ${field}, Valore: ${value}`);
setListaPagina2Pj8App(controlli)
}

//aggiornamento prima di mandare il valori ad App.js
useEffect(()=>{
  setListaPagina2Pj8App(controlli)
},[controlli])

//***********************ModalMio***************************
//funzione che chiude Modal richiamata dal componente ModalMio
const closeModalMio =()=>{
  //console.log('controlli.',controlli)
  setShowModalMio(false)
}
//console.log('elenco checkListCHDimensioni:',controlli)
//*********************************fine******************************** */


    
 return (
  <div className='containerCheckListCHDimensioni'>
       <div className='bottone_check_list'>
       <button onClick={handleToggleTabella}>
      {mostraTabella ? 'O' : 'V'}
      </button>
      </div>
      <div>
      { mostraTabella && (
              <table className='tabellaCHView'>
          <thead>
              <tr>
                  <th colSpan="2"> CONTROLLI DIMENSIONI</th>
                  <th colSpan="2">SCARTO PERMESSO</th>
                  <th colSpan="2">RISULTATO CONTROLLO</th>
                  {/* <th >COMMENTI/PRECISAZIONI</th>
                  <th>AZIONE CURATIVA</th> */}
              </tr>
              <tr>
                  <th></th>
                  <th></th>
                  <th>MENO(mm)</th>
                  <th>PIU(mm)</th>
                  <th>CONFORME</th>
                  <th>NON CONFORME</th>
                  {/* <th></th>
                  <th></th> */}
              </tr>
          </thead>
          <tbody>
              {
                controlli.map((controllo, index)=>(
                  <tr key={controllo.id}>
                      <td>{controllo.nomePrimario}</td>
                      <td>{controllo.nome}</td>
                      <td>{controllo.meno}</td>
                      <td>{controllo.piu}</td>
                      <td>
                        <label>
                           <input
                             id="myCheckbox"
                             type="checkbox"
                             name="Conforme"
                             value="true"
                             checked={controllo.conforme}
                             onChange={(event)=> handleCheckboxChange(event,index )}
                            
                             style={{
                              // display:"flex", 
                              width: "50%", 
                              height:"50%",  
                              opacity:0,
                               position:'relative', // Posizionamento assoluto per sovrapporre lo span alla checkbox
                              // top: 10,
                              // left: 10,
                              zIndex: 1, // Assicura che la checkbox sia sopra lo span
                              cursor: "pointer" // Cambia il cursore quando passi sopra la checkbox
                             }}
                            />
                              {controllo.conforme === 'Conforme' && (
                                <span style={{
                                 position: "absolute", // Posizionamento assoluto per sovrapporre la spunta alla checkbox
                                  // top: "50%", // Posiziona il centro dello span al centro della checkbox
                                  // left: "50%", // Posiziona il centro dello span al centro della checkbox
                                  transform: "translate(-90%, -50%)", // Centra lo span rispetto al suo contenitore
                                  fontSize: "30px",
                                  color: "green",
                                  padding: "1px",
                                  zIndex: 0 // Assicura che lo span sia dietro la checkbox
                                }}>✓</span>
                                      )}
                        </label>
                      </td>
                          <td>
                           <label>
                                  <input
                                      type="checkbox"
                                      name="Non Conforme"
                                      value="false"
                                      checked={controllo.conforme === false}
                                      onChange={(event)=> handleCheckboxChange(event,index )}
                                      style={{ width: "50%", height:"50%", color: "green", opacity: 0,zIndex: 1,cursor: "pointer" }}
                                      />
                                       {controllo.conforme === 'Non Conforme' && (
                                <span style={{ 
                                  position: "absolute", // Posizionamento assoluto per sovrapporre la spunta alla checkbox
                                  transform: "translate(-90%, -50%)", // Centra lo span rispetto al suo contenitore
                                  fontSize: "30px", 
                                  color: "red",
                                  padding: "1px",
                                  zIndex:0,
                                  
                                       }}>✓</span>
                                      )}
                             </label>         
                          </td>
                          {/* <td>
                             <input
                                  type='text'
                                  value={controllo.commenti}
                                  onChange={(e)=>handleInputChangeCommenti(controllo.id, 'commenti', e.target.value)}
                                  placeholder='commenti'
                                   />
                          </td> */}
                          {/* <td> */}
                             {/* <input
                                    type='text'
                                    value={controllo.azioneCurativa}
                                    onChange={(e)=>handleInputChangeAzione(controllo.id, 'azioneCurativa', e.target.value)}
                                    placeholder='azione curativa'
                               /> */}
                               {/* <select style={{ width: "30%", height:"60%", color: "red",cursor: "pointer" }} onChange={(e)=>handleInputChangeAzione(controllo.id, 'azioneCurativa', e.target.value)}>
                                {
                                  elencoAzioniApp.map((elenco, index)=>(
                                    <option  key={index} value={elenco}>
                                    {elenco}
                                    </option>
                                  ))
                                }
                               </select>
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

export default CheckListCHDimensioniView