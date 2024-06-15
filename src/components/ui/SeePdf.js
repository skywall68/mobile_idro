import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import  './SeePdf.css'  /*importo file css*/ 
import RecuperaData from './RecuperaData';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// mi permette di vedere le liste e di recuperare le informazioni
const SeePdf = ({
  leggiFile,
  setNumeroPages, 
  setAppLista, 
  setAppData, //porta l'eventuale data in App
  setAppCliente, 
  setAppCantiere, 
  setAppOpera, 
  setAppPlan, 
  setAppElementi, //mi cattura elenco elementi
  //appRecuperaMiaLista,
  sceltaModuloApp, //mi dice se è 8pj o 16pj
 }) => {
  const [pdfPath, setPdfPath] = useState('');
  const [totalPages, setTotalPages] = useState(null);
  const [linesArray, setLinesArray] = useState([]);
  const [linesArrayElementi, setLinesArrayElementi] = useState([]);//ho solo gli elementi che iniziano con Element
  const [lista, setLista] = useState('lista ??');
  const [nomeCliente, setNomeCliente]= useState('');
  const [cantiere, setCantiere]= useState('');
  const [opera, setOpera]= useState('');
  const [plan, setPlan]= useState('');
  const [elementi, setElementi]= useState([]);//ho gli elementi che è stata tolta la scritta 'Elements:'
  let elementiArray;
  
 //----------------funzione che mi estrae tutte le righe e mi crea un array----------
 const extractAllLines = (text) => {
  // Dividi il testo in righe
  const lines = text.split('\n');

  // Mappa ogni riga in un oggetto e aggiungilo all'array
  const allLinesArray = lines.map(line => ({ elemento: line.trim() }));

  return allLinesArray;
};


//------------------------------------------------------------------
  const handleFileChange =async (e) => {
    const filePdf = e.target.files[0];
    if (filePdf.type === "application/pdf") {
       
      setPdfPath(URL.createObjectURL(filePdf));
      setLinesArray([]); // Resetta l'array quando il file cambia
      leggiFilePdf(filePdf)
      
      
  }else {
    alert("Per favore, seleziona un file PDF.");
  }

}
  //---------------------------------------------------------------
  //-----------------funzione che legge il file pdf-----------------
  const leggiFilePdf = async (file)=>{
    console.log('valore di pdf:',pdfPath)
   try {
    const pdfText = await extractTextFromPdf(file);//mi visualizza insieme di testi dove ogni 'testo' va a capo
    const allLinesArray = extractAllLines(pdfText); // fuzione che prende testo e lo trasforma in un array di oggetti:
    
    setLinesArrayElementi((extractElements(allLinesArray))) ;// dovrebbe filtrare solo gli oggetti che iniziano con Element
    elementiArray = extractElements(allLinesArray)
    console.log('prima di aggiornare su set:',elementiArray);
    rimuoviElementPrefix(elementiArray)
    
   

   } catch (error) {
    console.error("Errore nell'estrazione del testo dal PDF:", error);

   }
  }
  //-----------------------------------------------------------------

   //funzione che mi estrae tutti i valori da tutte le pagine
   const extractTextFromPdf = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (event) => {
        try {
          const typedArray = new Uint8Array(event.target.result);
          const pdf = await pdfjs.getDocument(typedArray).promise;
          const textPromises = [];
  
          for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            textPromises.push(pdf.getPage(pageNumber).then(page => page.getTextContent()));
          }
  
          const textContents = await Promise.all(textPromises);
          const text = textContents.map(textContent => 
            textContent.items.map(item => item.str).join('\n')
          ).join('\n');
  
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };
   //----------------------------------------------------------------
   //funzione che deve solo prendere determinati elementi
  const extractElements = (arrayPdf) => {
    
    return arrayPdf.filter(obj =>
      typeof obj.elemento === 'string' && obj.elemento.startsWith('Elément:')
    )
  };
  //--------------------------------------------
  //modifichiamo lo stile del pdf
  const pdfStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop:'10px',
    };
    //++++++++++++RECUPERO EVENTUALE DATA++++++++++++++++++++++++++++++++
    // let dataLista="";
    // dataLista=RecuperaData(lista)
    // if(dataLista!==""){
    //   //setAppData(dataLista)
    //   //console.log('e la lista è:',lista,' la data della lista è:',dataLista)
    // }else {
    //   dataLista=""
    //    //setAppData(dataLista)
    //   //console.log('e la lista è:',lista,' la data NON CE')
    // }

    // useEffect(()=>{
    //   setAppData(dataLista)
    // },[dataLista])
  //*********RECUPERO DATI CLIENTE**************************************** */
  const recuperaDatiCliente = async () => {
  try {
    const pdfDocument = await pdfjs.getDocument(pdfPath).promise;
    const pdfPage = await pdfDocument.getPage(1); 
    const textContent = await pdfPage.getTextContent();
    const lines = textContent.items.map(item => item.str); //array che contiene le righe della pagina 1
    setLinesArray(lines); // Aggiorna l'array con le nuove righe pagina 1
    recuperaLista(lines);//recupera intestazione lista:
} catch (error) {
    console.error('Errore durante l\'estrazione dei dati:', error);
  }

  }
 //************RECUPERA intestazione LISTA ************************************/
   const recuperaLista = (lista)=>{
    const indexLista = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 14;
    if (indexLista !== -1) {
      const posizioneLista = indexLista  // deve puntare sul valore cliente nell'array
      setLista(lista[posizioneLista])
      setAppLista(lista[posizioneLista]) //recupera la lista per mandarla tramite App.js a Compilatore.js
      
      //recupera cliente
      const indexCliente= lista.findIndex(line => line.includes('Tabella Ferri n.')) + 4;
      setNomeCliente(lista[indexCliente])
      setAppCliente(lista[indexCliente]) //recupero il cliente per mandarlo tramite App.js a Compilatore.js
      //recupera cantiere
      const indexCantiere = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 8;
      setCantiere(lista[indexCantiere])
      setAppCantiere(lista[indexCantiere]) //recupero il cantiere per mandarlo tramite App.js a Compilatore.js
      //recupera opera
      const indexOpera = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 10;
      setOpera(lista[indexOpera])
      setAppOpera(lista[indexOpera]) //recupero l'opera per mandarlo tramite App.js a Compilatore.js
      //recupera plan
      const indexPlan = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 18;
      setPlan(lista[indexPlan])
      setAppPlan(lista[indexPlan]) //recupero il plan per mandarlo tramite App.js a Compilatore.js
     
     
    } else {
      // Se 'Lista' non è trovata, resetta l'indice
      
      setLista('non trovata')
    }
   }
  
   //pulisce l'array dalla scritta Element:
   const rimuoviElementPrefix = (dati)=>{
    const elencoPulito = dati.map(item =>({... item,
      elemento:item.elemento.replace('Elément: ', '')
    }))
    recuperaElementi(elencoPulito)
    console.log('elenco da rimuoviElementPrefix:',elencoPulito)

   }

  //****************RECUPERA ELEMENTI **************************** */ NON FUNZIONA 
  const recuperaElementi = (dati) =>{
  console.log('valore di dati:',dati)
  let risultato=[]
  

  if(sceltaModuloApp === '16pj'){  //devo visualizzare solo gli elementi ACF - 
    
    console.log('elementi  16pj:',dati)
    //const risultato =  dati.filter(elenco => elenco.elemento.includes('ACF'));
     risultato=dati
    .filter(item => item.elemento.startsWith('ACF'))
    .map(item => item.elemento);
    console.log('tipo:', typeof risultato);
    setAppElementi(risultato)
    console.log('ho filtrato solo gli ACF:', risultato);
  } else {  //ho scelto '8pj'
    //visualizzo solo gli elementi saldati nella dropdownlist
              // elencoElementi = Object.keys(elencoElementi)
              // .filter(key => !elencoElementi[key].includes('ACF'))
              // .reduce((obj, key) => {
              //     obj[key] = elencoElementi[key];
              //     return obj;
              // }, {});
               risultato= dati
              .filter(item => !item.elemento.startsWith('ACF'))
              .map(item => item.elemento);
              console.log('tipo:', typeof risultato);
              //setAppElementi(risultatopj8)          

    console.log('ho filtrato SENZA ACF', typeof risultato);
  }


   //voglio portare la scritta 'Scegli...' all'inizio della dropdown list dei elementi, devo confertire l'oggetto
   let scegli = ''
  // //console.log('valore di elencoelementi:',elencoElementi)
       if(Object.keys(risultato).length === 0){
         scegli = 'NESSUN DATO PRESENTE'
       } else { scegli='Scegli...'
    }
    const agiungiScegli = [scegli,...risultato]
    console.log('valore,',agiungiScegli)
    setAppElementi(agiungiScegli)//prendo gli elementi e tramite app.js li porto in ElementiSaldati.js
  
  // //in un array, aggiungere 'scegli'  per poi riconvertirlo in un oggetto
  //   //converto l'oggetto in copie chiave-valore
  //   let arrayOggetto = Object.entries(elencoElementi)
  //   //aggiungo scegli all'Array
  //   arrayOggetto.unshift([idScegli,scegli])
  //   //converto array nell'oggetto
  //   elencoElementi = Object.fromEntries(arrayOggetto)
  // //console.log('(SeePdf.js Quali sono gli elementi finiti con Scegli:',elencoElementi)
  
  }
  //*************************fine elenco elementi************************************* */



  //tasto quando si è scelto il file pdf
  const handleLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages); //mi fa vedere tutte le pagine che se disattivato ne vedo solo 1
    setNumeroPages(numPages);
    
    //devo recuperare i dati chiamando e creando una funzione async
    recuperaDatiCliente();
    //devo recuperare tutti gli Elements:
    //console.log('prima di chiamare la funzione recuperaElementi.');
    //recuperaElementi()
  };
  return (
    <div className='pdf-container'>
       <label htmlFor="fileInput">Seleziona un file liste:</label>
      <input type="file" accept=".pdf" onChange={handleFileChange} style={{ marginTop:'40px'}} />
      
        {pdfPath && (
            <div  style={pdfStyles}>
              
                <Document file={pdfPath} onLoadSuccess={handleLoadSuccess}>
                {Array.from(new Array(totalPages), (el, index) => (
                    <Page key={`page_${index + 1}`} 
                    pageNumber={index + 1} 
                    renderTextLayer={false} 
                    //style={{width:0, height:0}}
                     />
                    ))}
                </Document>
            </div>
        )}
        {totalPages && (
        <p>
          Total Pages: {totalPages}
        </p>
      )}
    </div>
  );
};

export default SeePdf;