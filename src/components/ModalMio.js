import React, { useState, useEffect } from 'react'

import './ModalMio.css'

const ModalMio = ({showModalMio, closeModalMio,commenti,setCommenti, mioID, setControlli,controlli,handleInputChangeCommenti,handleInputChangeAzione, elencoAzioniApp }) => {
  const [commentiModal, setCommentiModal]=useState('')
 //console.log('DENTRO MODAL commento:',commenti, 'id:',mioID)

 const handleInputChange = ()=>{
  handleInputChangeCommenti(mioID, 'commenti', commentiModal)
  setCommentiModal('')
 closeModalMio()
 }

  return (
    <>
    { showModalMio && ( 
    <div className='modal-background'>
     <div className='modal-content'>
     <h2>Note:</h2>
    <div style={{display:'flex',position:'relative', alignItems: 'center', textAlign:'center'}}>
       <input style={{margin:'0px ', width:'300px', height:'20px', fontSize:'20px'}}
      type='text'
      value={commentiModal}
      onChange={(e)=>setCommentiModal(e.target.value)}
      placeholder='commenti'
       />
        <select style={{ width: "20%", height:"80%", color: "red",cursor: "pointer"}} 
        onChange={(e)=>handleInputChangeAzione(mioID, 'azioneCurativa', e.target.value)}>
                                {
                                  elencoAzioniApp.map((elenco, index)=>(
                                    <option  key={index} value={elenco} style={{fontSize:'20px'}}>
                                    {elenco}
                                    </option>
                                  ))
                                }
                               </select>
    </div>
     
    

     <div style={{display:'flex', margin:'30px -15px 0px -10px',justifyContent: 'space-between'}}>
      <button className='button button--inverse' onClick={closeModalMio}>Annulla</button>
     <button className='button' style={{marginLeft: 'auto'}} onClick={handleInputChange}>Conferma</button>
     </div>
     
     </div>
       </div>
       )}
    
    </>
   
  )
}

export default ModalMio