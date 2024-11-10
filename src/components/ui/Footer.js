import React, { useState,useRef, useEffect } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import pdfFile8 from '../../PJ8.pdf'
import pdfFile16 from '../../PJ16.pdf'


import Tasto from '../Tasto'
import Modal from './Modal'

import './Footer.css'


const Footer = ({
  setAppRecuperaLista, //porto in app la lista
  appLista, //numero lista
  appCliente,
  appCantiere,
  appOpera,
  appPlan,
  appData, //data controllo
  appOperatore,
  pj8App,//file pdf
  pj16App,//file pdf
  pjCH,
  pjPanier,
  elementoCHSceltoApp, //elemento ch
  elementoPanierSceltoApp, //elemento panier 
  appElementoScelto,
  appControllatoNdi,
  listaPagina1Pj8App,//prima pagina di pj8 
  listaPagina2Pj8App,// seconda pagina di pj8
  listaPagina1Pj16App,
  listaPagina2Pj16App,
  saldatoreSceltoApp,
  tipologiaSceltaApp,
  macchinaSceltaApp,
  onCancel,
  setAppPulisciCampo,
  appInputValue,//data?
  

}) => {


const [showModalPrint, setShowModalPrint] = useState(false)
const [parametriStampa, setParametriStampa]=useState([])
const [fontSizeX,setFontSizeX]=useState() //mi recupera fontsize
const [nonConformeXpag1, setNonConformeXpag1]=useState()//valore asse x per in NON CONFORME
const [nonConformeXpag2, setNonConformeXpag2]=useState()//valore asse x per in NON CONFORME
const [idPagina1, setIdPagina1]= useState() //mi dice da dove partire (id) a recuperare i parametri per la stampa della 1° pagina il valore ricevuto esempio=10, parte id 11
const [idPagina2, setIdPagina2]= useState() //mi dice da dove partire (id) a recuperare i parametri per la stampa della 2° pagina
const [commentiXpag1, setCommentiXpag1]=useState('') //valore commenti asse x
const [commentiXpag2, setCommentiXpag2]=useState('') //valore commenti asse x

const [ azioneCurativaXpag1, setAzioneCurativaXpag1]= useState() //valore azione curativa asse x
const [ azioneCurativaXpag2, setAzioneCurativaXpag2]= useState() //valore azione curativa asse x

const [controllato1DiYX, setControllato1DiYX] = useState([]) //valori x e y di Controllato 1 elemento di
const [dataControlloYX, setDataControlloYX]= useState([])  //valori x e y di data controllo
const [operatoreYX, setOperatoreYX]= useState([]) //valori x e y di operatore
const [pdfModificato, setPdfModificato]=useState([]) //sequenza di bytes modificati

  
//console.log('data dentro footer:', appData)


//recupero parametri stampa:
  
  //console.log('PARAMETRI STAMPA:',parametriDiStampaJson)
    const parametriDiStampaJson = localStorage.getItem('parametriStampa')
    const paramStampa=(JSON.parse(parametriDiStampaJson))
    
  //carica tutti i valori necessari per la stampa recuperati dal file json
  useEffect(()=>{
    setParametriStampa(paramStampa)
    const font = paramStampa.find(elemento => elemento.nome==="font")
    const fontS = font ? font.size : "size non trovato"
    //console.log('VALORE DI SIZE DI FONT:',fontS)
    setFontSizeX(fontS)

    const nconf_pag1= paramStampa.find(ele=>ele.nome === "non_conforme_pag1")
    const nConforme_pag1 = nconf_pag1 ? nconf_pag1.x : "valore di x non trovato non_Conforme_pag1"
    setNonConformeXpag1(nConforme_pag1)

    const nconf_pag2= paramStampa.find(ele=>ele.nome === "non_conforme_pag2")
    const nConforme_pag2 = nconf_pag2 ? nconf_pag2.x : "valore di x non trovato non_Conforme_pag2"
    setNonConformeXpag2(nConforme_pag2)

    const idP1 = paramStampa.find(ele => ele.nome==="idPagina1")
    const idPag1 = idP1 ? idP1.valorePartenza : "valore di id non trovato idPagina1"
    setIdPagina1(idPag1)

    const idP2 = paramStampa.find(ele => ele.nome==="idPagina2")
    const idPag2 = idP2 ? idP2.valorePartenza : "valore di id non trovato idPagina2"
    setIdPagina2(idPag2)

    const comm_pag1 = paramStampa.find(ele => ele.nome==="commenti_pag1")
    const commX_pag1 = comm_pag1 ? comm_pag1.x : "valore di x non trovato commenti_pag1"
    setCommentiXpag1(commX_pag1)

    const comm_pag2 = paramStampa.find(ele => ele.nome==="commenti_pag2")
    const commX_pag2 = comm_pag2 ? comm_pag2.x : "valore di x non trovato commenti_pag2"
    setCommentiXpag2(commX_pag2)

    const azioneC_pag1 = paramStampa.find(ele => ele.nome==="azioni_pag1")
    const azionC_pag1 = azioneC_pag1 ? azioneC_pag1.x : "valore x di azione_pag1 curativa non trovato"
    setAzioneCurativaXpag1(azionC_pag1)

    const azioneC_pag2 = paramStampa.find(ele => ele.nome==="azioni_pag2")
    const azionC_pag2 = azioneC_pag2 ? azioneC_pag2.x : "valore x di azione curativa non trovato"
    setAzioneCurativaXpag2(azionC_pag2)
   //console.log('azione curativa:',azioneCurativaXpag2)

    const controllato = paramStampa.find(ele => ele.nome==="controllato 1 di")
    if(controllato){
      const {y,x} = controllato
      const controllatoXY = [y,x]
      setControllato1DiYX(controllatoXY)
      
    }

    const dataCont = paramStampa.find(ele => ele.nome === "data_controllo")
    if(dataCont){
      const { y, x } = dataCont
      const dataYX = [y,x]
      setDataControlloYX(dataYX)
    } else {console.log('valore y, x DATA non trovato')}

    const operatore = paramStampa.find( ele => ele.nome === "operatore")
    if(operatore){
      const { y, x} = operatore
      const operYX = [y,x]
      setOperatoreYX(operYX)
    } else { console.log('valore y e x di OPERATORE NON TROVATO')}
    



  },[])


 

 //********************gestione del Modal CONFERMA************************ */
 const openModalPrintHandler = ()=>{   //chiamata dal tasto CONFERMA
  

 
   if (appData ===''){
    alert('inserire la data di consegna nell\'apposito box prima di confermare  !!!')
    return
  } else if (appData === null){
    alert('inserire la data di consegna nell\'apposito box prima di confermare  !!!')
    return
  }
   else {
    
    //console.log('Dentro footer la data è in else:',appData, appInputValue)
    
    //console.log('sono dentro conferma e vediamo i dati:',listaPagina2Pj8App)
    setShowModalPrint(true)// mi apre una finestra modal quando premo tasto conferma
    
     
  }
 } 
 const closeModalPrintHandler = ()=> setShowModalPrint(false) //chiude il modal
 //************************************************************** */
  //elenco delle parti da stampare:
  
 let dataControllo = appData
  
  let lista = ''
  if(appElementoScelto !==''){
    lista = appLista
  } else if (elementoCHSceltoApp !==''){
    lista = elementoCHSceltoApp
    dataControllo = appData
  } else if (elementoPanierSceltoApp !==''){
    lista = elementoPanierSceltoApp
    dataControllo = appData
   
  }
    
  const operatore = appOperatore
  const cliente = appCliente
  const saldatori = saldatoreSceltoApp
  const macchina= macchinaSceltaApp
  //se siamo con modulo CH non serve la tipologia e quindi non va stampata e visto che mi chiede la tipologia per stampare in fooder l'unica cosa che ho per sapere se 
  //dobbiamo stampare i CH  è questo:elementoCHSceltoApp che se è '' vuol dire che non è un CH e quindi va scelta la tipologia

  let tipologia = ''
  if(appElementoScelto !==''){
    tipologia = tipologiaSceltaApp
  } else if(elementoCHSceltoApp !=='' || elementoPanierSceltoApp !==''){  //??????????????????????????????
    tipologia=''
  }

 
  const opera = `${appOpera}    /`
  const plan = appPlan
  
  let etichetta 
  if(appElementoScelto !==''){
     etichetta = appElementoScelto
  } else if(elementoCHSceltoApp !==''){
    etichetta = elementoCHSceltoApp
  } else if (elementoPanierSceltoApp !==''){
    etichetta = elementoPanierSceltoApp  //mi stampa etichetta
  }
  
  const parametri_stampa = parametriStampa
  const nElementi = appControllatoNdi
  const spuntaFabbrica='x'
  const spuntaSuPiano = 'x'
  const cantiere = `${appCantiere}   /`
  let macchinaOsaldatori=''
  
  
  let pdfFile=''
  let listaPagina1=''
  let listaPagina2=''
  let nomeAbbreviatoPDF=''
  //scelta del modulo
  if(pj8App){
    pdfFile=pdfFile8
    listaPagina1=listaPagina1Pj8App
    listaPagina2=listaPagina2Pj8App
    nomeAbbreviatoPDF='pj8'
    macchinaOsaldatori=saldatori
   }
  if(pj16App){
    pdfFile=pdfFile16
    listaPagina1=listaPagina1Pj16App
    listaPagina2=listaPagina2Pj16App
    nomeAbbreviatoPDF='pj16'
    macchinaOsaldatori=macchina
   }
   if(pjCH){
    pdfFile=pdfFile8
    listaPagina1=listaPagina1Pj8App
    listaPagina2=listaPagina2Pj8App
    nomeAbbreviatoPDF='ch'
    macchinaOsaldatori=macchina
   }
   if(pjPanier){
    pdfFile=pdfFile16
    listaPagina1=listaPagina1Pj16App
    listaPagina2=listaPagina2Pj16App
    nomeAbbreviatoPDF=`${dataControllo}_pan`
    macchinaOsaldatori=macchina
   }

   const paginaUnoAlto = [spuntaFabbrica,spuntaSuPiano,tipologia,cantiere,opera,cliente,plan,lista,etichetta,macchinaOsaldatori,] //cicla questi valori
   //DEVO CONTROLLARE LA LUNGHEZZA NOME CANTIERE - NOME CLIENTE - RIF.OPERA  se la lunghezza supera un determinato valore ACCORCIAMO o dimminuiamo il font
   const indexNomeCantiere=paginaUnoAlto.indexOf(cantiere) //mi cerca l'indice dove si trova NOME CANTIERE
   if (indexNomeCantiere !==-1){
    const lunghezzaStringa = paginaUnoAlto[indexNomeCantiere].length
     if(lunghezzaStringa > 25){
      const parteIniziale = paginaUnoAlto[indexNomeCantiere].slice(0,25)
      const nuovoNomeCantiere = parteIniziale.slice(0,24)+ '.'
      paginaUnoAlto.splice(indexNomeCantiere,1) //rimuovi cantiere
      paginaUnoAlto.splice(indexNomeCantiere,0,nuovoNomeCantiere) //aggiungi cantiere modificato
     // console.log('troncato:',nuovoNomeCantiere)

     }
   }//fine controllo lunghezza cantiere


  //*************************FUNZIONE DI STAMPA************************************************************ */
  const stampaFilePdf = async ()=>{
    if(dataControllo===''){
      alert('data mancante')
      return
    }
    let testoDaStampare=''
    
    try {
        
        //const existingPdfBytes = await pdfFile.arrayBuffer();
        // Leggi il file come ArrayBuffer
        const response = await fetch(pdfFile);
        const existingPdfBytes = await response.arrayBuffer();
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const page1 = pdfDoc.getPages()[0]; // dichiara una variabile page che contiene l'oggetto rappresentante la prima pagina del documento PDF.
        const { width, height } = page1.getSize(); //utilizza la destructuring assignment di JavaScript per estrarre i valori delle proprietà width e 
        //height dall'oggetto restituito dal metodo getSize() chiamato su un oggetto di pagina (page). 
        const page2 = pdfDoc.getPages()[1];
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);//utilizzato per disegnare testo sulla pagina del PDF utilizzando quel font specifico
        //prima parte pagina 1 in alto
        let coordinate=0
        let valoreY=0
        //inizia un ciclo
         paginaUnoAlto.forEach((testo, index)=>{  //è un array con i valori di intestazione
         coordinate = parametri_stampa[index]
         testoDaStampare=testo
         valoreY=coordinate.y 
         //console.log('testo da stampare:','testo:',testo,'coordinate:', coordinate.x,valoreY)
         page1.drawText(testoDaStampare, {
           x: coordinate.x,
           y: height  - coordinate.y, 
           font,
           size:fontSizeX,
           color: rgb(0,0,0),
         })
        })
        //partenza coordinate conforme pagina 1
       const testo_spuntato = 'x'
       //definiamo un ciclo dei controlli che conforme sia 'Conforme' o 'Non Conforme' poi  DA METTERE EVENTUALI COMMENTI ED AZIONI PER OGNI RIGA
       let mioIdPagina1 = idPagina1  //corrisponde id:11 del file paramentri stampa
       let coordinate_pagina = []
       //let xNonconforme = nonConformeX
       //console.log('lista pagina1:',listaPagina1)

       listaPagina1.forEach((controllo )=>{
       coordinate_pagina = parametri_stampa[mioIdPagina1]
        if(controllo.conforme === true) {
          page1.drawText(testo_spuntato, {
            x:coordinate_pagina.x,
            y: height - coordinate_pagina.y,
            font,
            size:fontSizeX,
            color: rgb(0, 0, 0),
            
          }
          
          )
          //console.log('stampo il testo:',testo_spuntato)
         } else if (controllo.conforme === false) {
          page1.drawText(testo_spuntato, {
            x:coordinate_pagina.x + nonConformeXpag1,
            y: height -coordinate_pagina.y,
            font,
            size:fontSizeX,
            color: rgb(0, 0, 0),
          })
            //mettere if per commenti ed azioni
            if(controllo.commenti !==''){
              page1.drawText(controllo.commenti,{
                x:commentiXpag1,
                y: height -coordinate_pagina.y,
                font,
                size:fontSizeX,
                color: rgb(0, 0, 0),  
              })
              //console.log('sei dentro if di commenti,valore di azione è:',controllo.azioneCurativa)
              page1.drawText(controllo.azioneCurativa,{
                x:azioneCurativaXpag1,
                y: height -coordinate_pagina.y,
                font,
                size:fontSizeX,
                color: rgb(0, 0, 0),  
              })
            }
          }
          mioIdPagina1++
      })
      //se l'elemento controllato è maggiore di uno allora riportalo
      if(nElementi>1) {
        const testoCommento=`Controllato 1 elemento di ${nElementi}`
       page1.drawText(testoCommento, {
         x:controllato1DiYX[1],
         y: height - controllato1DiYX[0],
         font,
         size:fontSizeX,
         color: rgb(0, 0, 0),
       })
      } 
      //passiamo alla SECONDA PAGINA
      let mioIdPagina2 = idPagina2 //corrisponde id:18(pj8) del file paramentri stampa
      listaPagina2.forEach((controllo)=>{
      coordinate_pagina = parametri_stampa[mioIdPagina2]
      //console.log('lista pagina2:',listaPagina2)
      if(controllo.conforme === 'Conforme' ){
        page2.drawText(testo_spuntato, {
         x:coordinate_pagina.x,
         y: height -coordinate_pagina.y,
         font,
         size:fontSizeX,
         color: rgb(0, 0, 0),
        })
     } else if (controllo.conforme === 'Non Conforme'){
         page2.drawText(testo_spuntato, {
         x:coordinate_pagina.x + nonConformeXpag2,
         y: height -coordinate_pagina.y,
         font,
         size:fontSizeX,
         color: rgb(0, 0, 0),
        })
        //mettere if per commenti ed azioni
        if(controllo.commenti !==''){
          page2.drawText(controllo.commenti,{
            x:commentiXpag2,
            y: height -coordinate_pagina.y,
            font,
            size:fontSizeX,
            color: rgb(0, 0, 0),  
          })
          }
          if(controllo.azioneCurativa !== undefined){
             page2.drawText(controllo.azioneCurativa,{
            x:azioneCurativaXpag2,
            y: height -coordinate_pagina.y,
            font,
            size:fontSizeX,
            color: rgb(0, 0, 0),  
          })
          }
         
        
     } //fine if NON CONFORME
     mioIdPagina2++
    })
    //data del controllo:
    let dataInvertita =dataControllo.replace(/(\d{2})\/(\d{2})\/(\d{2})/, "$3_$2_$1");
    
    page2.drawText(dataControllo, {
      
      x:dataControlloYX[1],
      y: height - dataControlloYX[0],
      font,
      size:fontSizeX,
      color: rgb(0, 0, 0),
     })
     // //operatore:
     page2.drawText(operatore,{
       x:operatoreYX[1],
       y: height - operatoreYX[0],
       font,
       size:fontSizeX,
       color: rgb(0, 0, 0),

     })
     const modifiedPdfBytes = await pdfDoc.save(); //consente di salvare le modifiche apportate al documento PDF e ottenere i byte rappresentanti il PDF modificato
     //salvaPdf(modifiedPdfBytes)
     //setPdfModificato(modifiedPdfBytes)
    
     const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });// crea un oggetto Blob  rappresenta un blocco di dati, in questo caso, l'array di byte che costituisce il documento PDF modificato
     saveAs(blob, 'fileSalvato.pdf'); /* utilizza FileSaver.js per avviare il processo di salvataggio del file nel browser. Il browser visualizzerà quindi una finestra di dialogo per il salvataggio, consentendo 
     //all'utente di scaricare il file PDF modificato con il nome specificato ('output.pdf').*/ 
      //recupero la lista da visualizzare come ultima fatta:
      setAppRecuperaLista(appLista)
    } catch (error) {
      console.error("Errore durante l'analisi del documento PDF:", error.message);
      console.log('data:',dataControllo, 'lista:',lista,'nome abbreviato:',nomeAbbreviatoPDF)
    }

  }
  //****************************FINE*********************************************************************** */
  
  //funzione di salvataggio
  //  function salvaPdf(){
  //   const pdfBytes =  pdfModificato
  //   // Crea un Blob dal PDF modificato
  // const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  // // Crea un URL dal Blob
  // const pdfUrl = URL.createObjectURL(blob);
  // // Crea un elemento <a> temporaneo per simulare il download
  // const downloadLink = document.createElement('a');
  // downloadLink.href = pdfUrl;
  // downloadLink.download = 'documento_modificato.pdf';
  // // Aggiungi l'elemento al DOM e clicca su di esso per scaricare
  // document.body.appendChild(downloadLink);
  // downloadLink.click();
  // Rimuovi l'elemento dopo il download
 // document.body.removeChild(downloadLink);

  //}

  // function salvaPdf(){
  //     const pdfBytes =  pdfModificato
  //     // Crea un Blob dal PDF modificato
  //     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //     // Crea un URL dal Blob
  //     const pdfUrl = URL.createObjectURL(blob);
  //      // Crea un link di download
  //     const downloadLink = document.createElement('a');
  //     downloadLink.href = pdfUrl;
  //     downloadLink.download = 'pdf_creato.pdf';

  //    // Aggiungi l'elemento al DOM e clicca su di esso per scaricare
  //     document.body.appendChild(downloadLink);
  //     downloadLink.click();

  // // Rimuovi l'elemento dopo il download
  // document.body.removeChild(downloadLink);

  // }
  // async function salvaPdf(){
  //   const existingPdfBytes = await pdfFile.arrayBuffer();
  //   const pdfDoc = await PDFDocument.load(existingPdfBytes);
  //   // Prepara il PDF per la stampa
  // const pdfBytes = await pdfDoc.save();
  //  // Crea un Blob dal PDF
  //  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //  // Crea un URL dal Blob
  // const pdfUrl = URL.createObjectURL(blob);

  // // Utilizza l'URL per aprire il PDF in una nuova finestra/tab del browser
  // window.open(pdfUrl, '_blank');

  // }
  // async function salvaPdf(){
  //   const doc = new jsPDF();
  //   const base64Data = await new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(new Blob([pdfModificato], { type: 'application/pdf' }));
  //     reader.onload = () => resolve(reader.result);
  //   });
  
  //   const imgData = base64Data.split(',')[1]; // Extract base64 data
  //   doc.addImage(imgData, 'PNG', 0, 0); // Add the modified PDF content as an image
  
  //   const filename = 'pdfModificato.pdf';
  //   doc.save(filename);

  // }
  //esempio:
  const salvaPdf= async(pdfBuffer)=>{
    console.log('dentro salva file il valore è:',pdfBuffer)
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();
  
    // Modifica il contenuto del PDF qui
    // Ad esempio, aggiungi un testo sulla prima pagina
    const page = pages[0];
    const text = 'Hello World!';
    const font = await pdfDoc.embedFont('Helvetica');
    page.drawText(text, {
      x: 100,
      y: 100,
      size: 24,
      font,
    });
  
    // Salva il PDF modificato
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
  
    // Scarica il PDF sul dispositivo
    const link = document.createElement('a');
    link.href = url;
    link.download = 'metaAi.pdf';
    link.click();
  }

  //***********************COMANDO DI STAMPA****************************************************************
  const handlePrintClick = ()=> {
    if((operatore !=='' && saldatori!=='Scegli' && tipologia !=='Scegli')||(operatore !=='' && macchina!=='Scegli' && tipologia !=='Scegli')){
      setAppRecuperaLista(appLista) //mi porta su App.js il numero della lista creata
      //chiama la funzione di stampa:
      stampaFilePdf()
      //pulisci textbox di Data.js e CheckListDimensioniPj8View/CheckListDimensioniPj16View
      if(pj8App || pj16App){
        handleCancel()
      }
      
    //chiudi modal
    closeModalPrintHandler();
  } else if (operatore ==='') {
    alert('Operatore mancante')
    closeModalPrintHandler();

  } else if((saldatori==='Scegli')||(macchina==='Scegli')){
    alert('Scegliere i saldatori o la macchina')
    closeModalPrintHandler();
  } else if(tipologia ==='Scegli') {
    alert('Scegliere la tipologia')
    closeModalPrintHandler();
  } 
  
  else {
    alert('errore generico')
    closeModalPrintHandler();
  }

  }
  //****************************FINE*********************************************************************** */
  //CANCEL
  //cancella la textbox della data e svuota CheckListDimensioniPj8View/CheckListDimensioniPj16View
  const handleCancel =()=>{
    onCancel();//metodo che arriva da App.js
    setAppPulisciCampo(true)
    
  }

const nodeRef = useRef(null);
//console.log('dentro footer elenco listaPagina2Pj8App ',listaPagina2Pj8App)
//console.log('dentro footer, la pagina listaPagina2Pj16App:',listaPagina2Pj16App)
  return (
    <React.Fragment>
      <Modal 
      // header={<h2>Stampa pdf</h2>}
      show={showModalPrint} 
      onCancel={closeModalPrintHandler} 
      contentClass ="place-item__modal-content"
      footerClass = "place-item__modal-actions"
      nodeRef={nodeRef}
      
      >
        <div className='button-container-stampa'>
          <Tasto onClick={closeModalPrintHandler} label={"cancel"} />
          <Tasto onClick={handlePrintClick} label={"stampa"}/>
        </div>
      </Modal >
      <div className='footer'>
        
              <button className='button-container-conferma'  onClick={handleCancel}>CANCELLA</button>
             
              <button className='button-container-conferma'  onClick={openModalPrintHandler}>CONFERMA</button>
            
         
      </div>
    </React.Fragment>

  )
}

export default Footer