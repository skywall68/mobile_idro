import React, { useState,useEffect} from 'react'


import  './SaldatoriView.css'

const SaldatoriView = ({setSaldatoreSceltoApp})=>{
    const [saldatoreSelezionato, setSaldatoreSelezionato]=useState('') //ricevo il saldatore scelto
    const [elencoSaldatori, setElencoSaldatori] = useState([])
    

    const handleSelectChange= (event)=>{
        const saldatoreScelto = event.target.value //recupero saldatore selezionato
        setSaldatoreSelezionato(saldatoreScelto)
        setSaldatoreSceltoApp(saldatoreScelto)
        }
        
        //memorizzo saldatore scelto
        useEffect(()=>{
            localStorage.setItem('saldatoreSelezionato',JSON.stringify(saldatoreSelezionato))
            
        },[saldatoreSelezionato])

    const elencoSaldatoriData = async () => {
        try {
          const elencoStringa = await localStorage.getItem('elencoSaldatori');
          if (elencoStringa) {
            const elencoArray = JSON.parse(elencoStringa);
            setElencoSaldatori(elencoArray);
            
            
          }
        } catch (error) {
          console.log('Errore nel recupero dati da localStorage:', error);
        }
      };

    // useEffect(()=>{
    //     elencoSaldatoriData()
    // },[])
    const handleOptionClick = ()=>{
        elencoSaldatoriData()
    }
  

    return(
        <div className='ElencoSaldatori'>
        <h2>Elenco saldatori:</h2>
        
          <select className='select_saldatori' onChange={handleSelectChange} onClick={handleOptionClick}>
            {elencoSaldatori.map((saldatori, index) => (
              <option key={index} value={saldatori} >
                {saldatori}
              </option>
            ))}
          </select>
        
      </div>
    );
  };

export default SaldatoriView