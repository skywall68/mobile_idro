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
  const [linesArrayElementi, setLinesArrayElementi] = useState([]);
  const [lista, setLista] = useState('lista ??');
  const [nomeCliente, setNomeCliente]= useState('');
  const [cantiere, setCantiere]= useState('');
  const [opera, setOpera]= useState('');
  const [plan, setPlan]= useState('');
  const [elementi, setElementi]= useState([]);
  //const [recuperaMiaLista , setRecuperaLista]= useState(appRecuperaMiaLista);
  
  //console.log('(SeePdf.js)il modulo che hai scelto è:',sceltaModuloApp) //8pj oppure 16pj

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
       console.log('questo è il file scelto:', file)
      //console.log('recupera lista da app.js.',recuperaMiaLista) //ho la lista che arriva da App.js
      console.log('nome lista scelta:',lista)
      setPdfPath(URL.createObjectURL(file));
      setLinesArray([]); // Resetta l'array quando il file cambia
      //leggiFile()
    }
  };
  //modifichiamo lo stile del pdf
  const pdfStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop:'10px',
    };
    //++++++++++++RECUPERO EVENTUALE DATA++++++++++++++++++++++++++++++++
    let dataLista="";
    dataLista=RecuperaData(lista)
    if(dataLista!==""){
      //setAppData(dataLista)
      console.log('e la lista è:',lista,' la data della lista è:',dataLista)
    }else {
      dataLista=""
       //setAppData(dataLista)
      console.log('e la lista è:',lista,' la data della lista è:',dataLista)
    }

    useEffect(()=>{
      setAppData(dataLista)
    },[dataLista])
  //*********RECUPERO DATI CLIENTE**************************************** */
  const recuperaDatiCliente = async (npagine) => {
  try {
    const pdfDocument = await pdfjs.getDocument(pdfPath).promise;
    const pdfPage = await pdfDocument.getPage(1); 
    const textContent = await pdfPage.getTextContent();

    const elementiPdf = await pdfDocument.getPage(npagine); // recupera l'ultima pagina
    const textElementi = await elementiPdf.getTextContent();
    

    const lines = textContent.items.map(item => item.str); //array che contiene le righe della pagina 1
    const elementiLines = textElementi.items.map(item => item.str) // array che contiene righe ultima pagina

    setLinesArray(lines); // Aggiorna l'array con le nuove righe pagina 1
    setLinesArrayElementi(elementiLines); // Aggiorna l'array con le nuove righe pagina ultima
    //recupera intestazione lista:
    recuperaLista(lines);
    //recupera elementi
    recuperaElementi(elementiLines);
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
   

  //****************RECUPERA ELEMENTI **************************** */ NON FUNZIONA 
  const recuperaElementi = (dati) =>{
      //RIMUOVO VALORI VUOTI
      const datiPuliti = Object.keys(dati).reduce((acc, key)=>{ //creiamo un iterazione con 'reduce'
         const valore = dati[key].trim(); //assegno a valore i dati tolti dello spazio iniziale e finale
         if(valore !== ''){ //se il valore è diverso da '' allora 
          acc[key]=valore  // assegna a acc (accumulatore) il valore
         }
         return acc;
      }, {})
      

      // RECUPERO GLI INDICI tolti quelli che avevano lo spazio
  const indexElementiDa = Object.keys(dati).findIndex(key => dati[key].includes("acierfrance@idrocentro.com - www.idrocentro.com"));
  const indexElementiA = Object.keys(dati).findIndex(key => dati[key].includes("Pagina"));

      //console.log('dal numero elemento:', indexElementiDa);
      //console.log('al numero elemento:', indexElementiA);
      //console.log('valore di lista:', lista)
      let intervalloInferiore=indexElementiDa + 2;
      let intervalloSuperiore=indexElementiA -2;
     // Filtra le chiavi nell'intervallo specificato
     const elencoChiavi = Object.keys(datiPuliti).filter(key => key >= intervalloInferiore && key <= intervalloSuperiore);

  // Crea un nuovo oggetto con le chiavi filtrate e senza la scritta 'Element:'
  let elencoElementi = elencoChiavi.reduce((acc, key) => {
    acc[key] = dati[key].replace('Elément: ','');//rimuovo la scritta 'Elément:' per avere gli elementi puri:
    return acc;
  }, {});
  setElementi(elencoElementi) //ho gli elementi puliti
  
  if(sceltaModuloApp === '16pj'){  //devo visualizzare solo gli elementi ACF - 
    //const risultato =  array.filter(elemento => elemento.includes('ACF'));
    elencoElementi = Object.keys(elencoElementi)
    .filter(key => elencoElementi[key].includes('ACF'))
    .reduce((obj, key) => {
        obj[key] = elencoElementi[key];
        return obj;
    }, {});

//console.log('ho filtrato solo gli ACF',elencoElementi);
  } else {  //ho scelto '8pj'
    //visualizzo solo gli elementi saldati nella dropdownlist
    elencoElementi = Object.keys(elencoElementi)
    .filter(key => !elencoElementi[key].includes('ACF'))
    .reduce((obj, key) => {
        obj[key] = elencoElementi[key];
        return obj;
    }, {});
    //console.log('ho filtrato SENZA ACF',elencoElementi);
  }


  const idScegli= 1
  let scegli = ''
  //console.log('valore di elencoelementi:',elencoElementi)
  if(Object.keys(elencoElementi).length === 0){
    scegli = 'NESSUN ACF PRESENTE'
  } else { scegli='Scegli...'}
  //voglio portare la scritta 'Scegli...' all'inizio della dropdown list dei elementi, devo confertire l'oggetto
  //in un array, aggiungere 'scegli'  per poi riconvertirlo in un oggetto
    //converto l'oggetto in copie chiave-valore
    let arrayOggetto = Object.entries(elencoElementi)
    //aggiungo scegli all'Array
    arrayOggetto.unshift([idScegli,scegli])
    //converto array nell'oggetto
    elencoElementi = Object.fromEntries(arrayOggetto)
  //console.log('(SeePdf.js Quali sono gli elementi finiti con Scegli:',elencoElementi)
  setAppElementi(elencoElementi)//prendo gli elementi e tramite app.js li porto in ElementiSaldati.js
  }
  //*************************fine elenco elementi************************************* */



  //tasto quando si è scelto il file pdf
  const handleLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages); //mi fa vedere tutte le pagine che se disattivato ne vedo solo 1
    setNumeroPages(numPages);
    
    //devo recuperare i dati chiamando e creando una funzione async
    recuperaDatiCliente(numPages);
  };
  return (
    <div className='pdf-container'>
       <label htmlFor="fileInput">Seleziona un file liste:</label>
      <input type="file" accept=".pdf" onChange={handleFileChange} style={{marginTop:'40px', marginLeft:'50%'}} />
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
