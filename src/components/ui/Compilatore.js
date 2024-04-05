import React, {useState} from 'react'

import './Compilatore.css'

const Compilatore = ({appLista, appCliente, appCantiere,appOpera, appPlan}) => {
 
  return (
    
    <div className='bodyCompilatore'>
      
    <table className='tabella'>
      <thead>
        <tr>
          <th>LISTA</th>
          <th>CLIENTE</th>
          <th>CANTIERE</th>
          <th>OPERA</th>
          <th>PLAN</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{appLista}</td>
          <td>{appCliente}</td>
          <td>{appCantiere}</td>
          <td>{appOpera}</td>
          <td>{appPlan}</td>
        </tr>
        
      </tbody>
    </table>
    
    
    </div>
    
  )
}

export default Compilatore