import React,{ useRef, useState, useEffect} from 'react'
import { PDFDocument } from 'pdf-lib'

import './Impostazioni.css'

import ElencoMacchine from './ElencoMacchine'
import ElencoAzioni from './ElencoAzioni'
import ParametriStampa from './ParametriStampa'
import ElencoSaldatori from './ElencoSaldatori';
import CheckListPj8 from './CheckListPj8';
import CheckListPj16 from './CheckListPj16'
import ScegliPjPDF from './ScegliPjPDF'
import ElencoTipologia from './ElencoTipologia'
import { blue, yellow } from '@mui/material/colors'
import Planning from './Planning'
import CheckListCH from './ch/CheckListCH'
import ElencoCHSceltaFile from './ch/ElencoCHSceltaFile'
import CheckListPanier from './panier/CheckListPanier'
import ElencoPanierSceltaFile from './panier/ElencoPanierSceltaFile'
import './Tasto.css'

// PJ 8 - rev 6 - CH    Se scelgo i CH

const Impostazioni = ({
  //porto i valori su App.js
  setpj8App, 
  setpj16App,
  setPjCH,
  setPjPanier,
  setVisualizzaModulo,
  setSceltaModuloApp,
  setAppVisualizzaModuloCH,
  setAppVisualizzaModuloPanier,

  
  
}) => {
  
  const [pjPdf, setPjPdf] = useState() //memorizzo il file pdf
  const [selectedFile, setSelectedFile]= useState(null) //mi memorizza solo il nome
  const [selectedParametriStampa, setSelectedParametriStampa]= useState(false)//se il file è stato selezionato mi da 'true' per visualizzare il tasto 'OK'
  const [selectMacchineOrsaldatori,setSelectMacchineOrsaldatori]=useState(false)
  const [selectCH, setSelectCH]=useState(false) //se viene selezionato CH
  const [selectPanier, setSelectPanier]=useState(false)
  const [selectTipologia,setSelectTipologia]=useState(false) //controlla che abbia scelto il file tipologia
  // const [filePj8Json1, setFilePj8Json1] = useState([]) //memorizzo il file pj8 per la tabella
  // const [filePj16Json, setFilePj16Json] = useState([]) //memorizzo il file pj16 per la tabella
  const [selectedPj8OrPj16, setSelectedPj8OrPj16]=useState(false) //se il file è selezionato allore attiva il tasto 'ok'
  let modulo='';

  const importPDF = async ()=> {
    // scegliere il file:
    const fileInput = pjPdf;
        if (pjPdf.files.length === 0) {
          alert('Seleziona un file PDF prima di procedere.');
          return;
        }
    const pdfFile = fileInput.files[0]; 
    //setVisualizzaModulo(true)
    
    try {
      
      // porto in App.js i valori dei 4 pdf 
      if(pdfFile.name === 'PJ 8 - rev 6 - IT.pdf'){
       modulo='8pj'
       setpj8App(pdfFile)
       setSceltaModuloApp( modulo) //determina l'apertura del modulo saldatori
       setVisualizzaModulo(true)
      } else if (pdfFile.name === 'PJ 16 - rev 2 - IT.pdf'){
        modulo='16pj'
        setpj16App(pdfFile)
        setSceltaModuloApp(modulo)//determina l'apertura del modulo macchine
        setVisualizzaModulo(true)
        
      } else if (pdfFile.name === 'PJ 8 - rev 6 - CH.pdf'){
        modulo='ch'
        setPjCH(pdfFile)
        setSceltaModuloApp(modulo) // mi serve per modificare i css di operatore, macchine, data
        setAppVisualizzaModuloCH(true) //mi determina i moduli CH che si aprono in App.js

      } else if (pdfFile.name === 'PJ 16 - rev 2 - PANIER.pdf'){
        modulo='panier'
        setPjPanier(pdfFile)
        setSceltaModuloApp(modulo) // mi serve per modificare i css di operatore, macchine, data
        setAppVisualizzaModuloPanier(true) //mi determina i moduli CH che si aprono in App.js

      }

      
    } catch (error) {
      console.error("Errore durante l'analisi del documento PDF:", error.message);  
    } 

  }
   
 //creiamo la condizione di vedere o non vedere gli elementi :
 let sceltaPdf;
 let parametriStampa;
  let elencoSaldatori;
  let elencoMacchine;
  let elencoAzioni;
  let elencoTipologia;
  let checklistPj8;
  let checlistpj16;
  let checklistCH;
  let elencoCHSceltaFile;
  let checklistPanier;
  let elencoPanierSceltaFile;
  let vuoto;
  let planning;

  if(selectedFile === 'PJ 8 - rev 6 - IT.pdf'){
    parametriStampa=<ParametriStampa setSelectedParametriStampa={setSelectedParametriStampa} selectedFile={selectedFile} />
    elencoAzioni=<ElencoAzioni setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori} />
    elencoSaldatori= <ElencoSaldatori setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori}/>
    checklistPj8= <CheckListPj8 setSelectedPj8OrPj16={setSelectedPj8OrPj16} /> 
    elencoTipologia = <ElencoTipologia setSelectTipologia={setSelectTipologia} />
    planning=<Planning />
    
  } else if (selectedFile === 'PJ 16 - rev 2 - IT.pdf'){
    parametriStampa=<ParametriStampa setSelectedParametriStampa={setSelectedParametriStampa} selectedFile={selectedFile} />
    elencoAzioni=<ElencoAzioni setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori} />
    elencoMacchine= <ElencoMacchine setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori} />
    checlistpj16=<CheckListPj16 setSelectedPj8OrPj16={setSelectedPj8OrPj16} />
    elencoTipologia = <ElencoTipologia setSelectTipologia={setSelectTipologia} />
    planning=<Planning />
  } else if (selectedFile === 'PJ 8 - rev 6 - CH.pdf'){
    parametriStampa=<ParametriStampa setSelectedParametriStampa={setSelectedParametriStampa} selectedFile={selectedFile} />
    elencoAzioni=<ElencoAzioni setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori} />
    elencoMacchine= <ElencoMacchine setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori} />
    checklistCH=<CheckListCH setSelectCH={setSelectCH} />
    elencoCHSceltaFile = <ElencoCHSceltaFile/> //mi memorizza il file elenco CH

  }else if (selectedFile === 'PJ 16 - rev 2 - PANIER.pdf'){
    parametriStampa=<ParametriStampa setSelectedParametriStampa={setSelectedParametriStampa} selectedFile={selectedFile} />
    elencoAzioni=<ElencoAzioni setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori} />
    elencoMacchine= <ElencoMacchine setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori} />
    checklistPanier=<CheckListPanier setSelectPanier={setSelectPanier} />
    elencoPanierSceltaFile = <ElencoPanierSceltaFile/> //mi memorizza il file elenco panier

  }
  else {
    vuoto="<h2>Nessun parametro scelto!!</h2>"
  }
  
  
  
  

 return (
    <div className='containerImpostazioni'> <h1>Moduli:</h1>

      
     {/* {selectedParametriStampa ? <ScegliPjPDF setPjPdf={setPjPdf} setSelectedFile={setSelectedFile} /> : <h3></h3> } */}
    
    
   
      <div style={{backgroundColor:'lightgrey'}}>
        <ScegliPjPDF setPjPdf={setPjPdf} setSelectedFile={setSelectedFile} />
        {planning}
        {parametriStampa}
        {elencoSaldatori}
        {elencoMacchine}
        {elencoAzioni}
        {elencoTipologia}
        {checklistPj8}
        {checlistpj16}
        {elencoCHSceltaFile}
        {checklistCH}
         {elencoPanierSceltaFile}
        {checklistPanier}
       
       
        
      </div>
    
      {selectedFile && 
      selectedParametriStampa && 
      selectMacchineOrsaldatori && 
      selectedPj8OrPj16 && 
      selectTipologia || 
      selectCH ||
      selectPanier
        ? <button className='button' onClick={importPDF} > OK </button> : <h3></h3> }
       {/* ? <Tasto onClick={importPDF}>OK</Tasto> : <h3></h3> } */}
       
     
    


    </div>
  )
}

export default Impostazioni