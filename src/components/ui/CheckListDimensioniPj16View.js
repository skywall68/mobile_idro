//visualizzo la seconda parte (pagina) modulo pj16
import React, { useState, useEffect} from 'react'

import ModalMio from '../ModalMio'
import './CheckListDimensioniPj16View.css'
const CheckListDimensioniPj16View = ({setListaPagina2Pj16App,appPulisciCampo,setAppPulisciCampo,elencoAzioniApp}) => {
   //recupero la seconda  parte del modulo pj8 da local storage
   const [controlli, setControlli] = useState([])
   const [inizioControlli, setInizioControlli]=useState([])
   const [showModalMio, setShowModalMio]=useState(false)
   const [mioID, setMioID]=useState(0)
   const [commenti, setCommenti]=useState('')
   //recupero il file memorizzato
   //*******prendo il file json da local storage recupero dal id6 al id18 dentro useState***************
   //viene eseguito 1 sola volta
   const filePj16Json1 =localStorage.getItem('jsonFilePj16')
   //Carico la tabella
   useEffect(()=>{
    let fileArrayOggetti =[]
    if (filePj16Json1) {
      fileArrayOggetti = JSON.parse(filePj16Json1);
    }
    const fileArrayObjFiltrato = fileArrayOggetti.filter(elemento => elemento.id >=6 && elemento.id <=18)
     setControlli(fileArrayObjFiltrato)
     setInizioControlli(fileArrayObjFiltrato)
    },[])
  //viene eseguito ogni volta che cambia lo stato di appPulisciCampo
    useEffect(()=>{
      if(appPulisciCampo){
        
        let fileArrayOggetti =[]
        if (filePj16Json1) {
          fileArrayOggetti = JSON.parse(filePj16Json1);
        }
        const fileArrayObjFiltrato = fileArrayOggetti.filter(elemento => elemento.id >=6 && elemento.id <=18)
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
    //******************************************************** */
     //****************prende il valore della checkbox**************** */
     const handleCheckboxChange = (event,id)=>{
      const newControlli = [...controlli];
      if (event.target.checked) {
        newControlli[id].conforme = event.target.name;
      } else {
        newControlli[id].conforme = null;
      }
      setControlli(newControlli);
      setMioID(controlli[id].id) 
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
   // console.log(`(CheckDimensioni.js f:handleInputChangeCommenti)ID: ${id}, Campo: ${field}, Valore: ${value}`);
    setCommenti('')
  }
  //****************prende il valore dell'azione ********************* */
  const handleInputChangeAzione = (id,field,value) =>{
    setControlli((prevControlli)=>
      prevControlli.map((azione)=>
       azione.id === id ? {...azione,[field]:value}: azione
    )
  )
  console.log(`(CheckDimensioni.js f:handleInputChangeAzione)ID: ${id}, Campo: ${field}, Valore: ${value}`);
  
  }
 //aggiornamento prima di mandare il valori ad App.js
  useEffect(()=>{
    setListaPagina2Pj16App(controlli)
  },[controlli])
//***********************ModalMio***************************
//funzione che chiude Modal richiamata dal componente ModalMio
 const closeModalMio =()=>{
  console.log('controlli.',controlli)
  setShowModalMio(false)
}
//*********************************fine******************************** */ 


  return (
    <div className='checklist_dimensioni'>
         <div className='bottone_check_list'></div>
         <button onClick={handleToggleTabella}>
        {mostraTabella ? 'O' : 'V'}
        </button>
        <div>
        { mostraTabella && (
                <table className='tabella pj16'>
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
                        
                        <td>{controllo.gruppo}</td>
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
                               checked={controllo.conforme === true}
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

export default CheckListDimensioniPj16View