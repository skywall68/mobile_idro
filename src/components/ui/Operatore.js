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
        <label htmlFor="operatore"><h2>Operatore</h2></label>
        <input
        className={sceltaModuloApp ==='ch' ?'inputBoxOperatoreCH':
        sceltaModuloApp ==='panier' ?'inputBoxOperatorePanier':
        'inputBoxOperatore'}
        type='text'
        id="operatore"
        onChange={handleInputChange}
         />
    </div>
  )
}

export default Operatore