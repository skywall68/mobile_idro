import React, { useState} from 'react'
import './Operatore.css'

const Operatore = ({setAppOperatore,sceltaModuloApp}) => {
 //const[operatore, setOperatore]=useState('')

 const handleInputChange =(e)=>{
   setAppOperatore(e.target.value)
 }
 //console.log('operatore:', operatore)
 //setAppOperatore(operatore)

  return (
    <div className={sceltaModuloApp ==='ch' ?'containerOperatoreCH':
    sceltaModuloApp ==='panier' ?'containerOperatorePanier':
    'containerOperatore'}>
        <h2>Operatore:</h2>
        <input
        className={sceltaModuloApp ==='ch' ?'inputBoxOperatoreCH':
        sceltaModuloApp ==='panier' ?'inputBoxOperatorePanier':
        'inputBoxOperatore'}
        type='text'
        onChange={handleInputChange}
         />
    </div>
  )
}

export default Operatore