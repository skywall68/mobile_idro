import React,{ useRef, useState, useEffect} from 'react'
import { PDFDocument } from 'pdf-lib'

import './Impostazioni.css'

import ElencoMacchine from './ElencoMacchine'
import ParametriStampa from './ParametriStampa'
import ElencoSaldatori from './ElencoSaldatori';
import CheckListPj8 from './CheckListPj8';
import CheckListPj16 from './CheckListPj16'
import ScegliPjPDF from './ScegliPjPDF'



const Impostazioni = ({
  //porto i valori su App.js
  setpj8App, 
  setpj16App, 
  setVisualizzaModulo,
  setSceltaModuloApp,
  setFilePj8Json1App,
  setFilePj16JsonApp
}) => {
  const fileInputRef = useRef() //non viene modificato nei diversi render
  const [selectedFile, setSelectedFile]= useState(null) //mi memorizza solo il nome
  const [selectedParametriStampa, setSelectedParametriStampa]= useState(false)//se il file è stato selezionato mi da 'true' per visualizzare il tasto 'OK'
  const [selectMacchineOrsaldatori,setSelectMacchineOrsaldatori]=useState(false)
  const [filePj8Json1, setFilePj8Json1] = useState([]) //memorizzo il file pj8 per la tabella
  const [filePj16Json, setFilePj16Json] = useState([]) //memorizzo il file pj16 per la tabella
  const [selectedPj8OrPj16, setSelectedPj8OrPj16]=useState(false) //se il file è selezionato allore attiva il tasto 'ok'

  const importPDF = async ()=> {
    // scegliere il file:
    const fileInput = fileInputRef.current;
        if (fileInput.files.length === 0) {
          alert('Seleziona un file PDF prima di procedere.');
          return;
        }
    const pdfFile = fileInput.files[0]; 
    setVisualizzaModulo(true)
    
    try {
      
      // porto in App.js i valori dei 2 pdf 
      if(pdfFile.name === 'PJ 8 - rev 6 - IT.pdf'){
        console.log('hai scelto il 8:',pdfFile.name)
        setpj8App(pdfFile)
        setFilePj8Json1App(filePj8Json1) //porto su App.js il file json preso da <CheckListPj8 />
        setSceltaModuloApp(8) //determina l'apertura del modulo saldatori
      } else if (pdfFile.name === 'PJ 16 - rev 2 - IT.pdf'){
        console.log('hai scelto il 16', pdfFile.name)
        setpj16App(pdfFile)
        setFilePj16JsonApp(filePj16Json)
        setSceltaModuloApp(16)//determina l'apertura del modulo macchine
      }
      
    } catch (error) {
      console.error("Errore durante l'analisi del documento PDF:", error.message);  
    } 

  }
   

 // file: PJ 8 - rev 6 - IT.pdf
 // file: PJ 16 - rev 2 - IT.pdf
  const handleFileChange = () => {
    // Puoi eseguire azioni aggiuntive quando il file viene selezionato
    setSelectedFile(fileInputRef.current.files[0].name)
   
    console.log("File selezionato:", fileInputRef.current.files[0].name);
  };
  //creiamo la condizione di vedere o non vedere gli elementi :
  let elencoSaldatori;
  let elencoMacchine;
  let checklistPj8;
  let checlistpj16;
  let vuoto;

  if(selectedFile === 'PJ 8 - rev 6 - IT.pdf'){
    elencoSaldatori= <ElencoSaldatori setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori}/>
    checklistPj8= <CheckListPj8 setFilePj8Json1={setFilePj8Json1} setSelectedPj8OrPj16={setSelectedPj8OrPj16} /> 
  } else if (selectedFile === 'PJ 16 - rev 2 - IT.pdf'){
    elencoMacchine= <ElencoMacchine setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori} />
    checlistpj16=<CheckListPj16 setFilePj16Json={setFilePj16Json} setSelectedPj8OrPj16={setSelectedPj8OrPj16} />
  } else {
    vuoto="<h2>Nessun parametro scelto!!</h2>"
  }

 return (
    <div className='containerImpostazioni'> <h1>Impostazioni:</h1>

     <ParametriStampa setSelectedParametriStampa={setSelectedParametriStampa}/>
    
    <div className='pj'>
       <h3>Scegli il formato pj</h3>
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
   
      <div>
        {/* {selectedFile === 'PJ 8 - rev 6 - IT.pdf' && <ElencoSaldatori setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori}/> }
        <CheckListPj8 setFilePj8Json1={setFilePj8Json1} /> 
        {selectedFile === 'PJ 16 - rev 2 - IT.pdf' && <ElencoMacchine setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori} /> }
        {!selectedFile && <h2>Vuoto</h2>} */}
        {elencoSaldatori}
        {elencoMacchine}
        {checklistPj8}
        {checlistpj16}
      </div>
    
      {selectedFile && selectedParametriStampa && selectMacchineOrsaldatori && selectedPj8OrPj16
       ? <button onClick={importPDF}>OK</button> : <h3>completare i campi</h3> }
      
       
     
    


    </div>
  )
}

export default Impostazioni