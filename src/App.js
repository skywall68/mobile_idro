import React, {useState, useEffect} from 'react'
import 'react-pdf/dist/Page/AnnotationLayer.css';

import './App.css';
import Impostazioni from './components/Impostazioni';
import SaldatoriView from './components/ui/SaldatoriView';
import MacchineView from './components/ui/MacchineView';
import Compilatore from './components/ui/Compilatore';
import ElementiSaldati from './components/ui/ElementiSaldati';
import ElementiLavorati from './components/ui/ElementiLavorati';
import TipologiaView from './components/ui/TipologiaView';
import CheckListPj8View1 from './components/ui/CheckListPj8View1'; //modulo da compilare
import CheckListPj16View from './components/ui/CheckListPj16View1';
import SeePdf from './components/ui/SeePdf';
import Footer from './components/ui/Footer';
import Operatore from './components/ui/Operatore';
import CheckListDimensioniPj8View from './components/ui/CheckListDimensioniPj8View';
import CheckListDimensioniPj16View from './components/ui/CheckListDimensioniPj16View';
import Data from './components/ui/Data';

import CheckListCHView from './components/ch/CheckListCHView';
import CheckListCHDimensioniView from './components/ch/CheckListCHDimensioniView';
import ElencoCHView from './components/ch/ElencoCHView';

import ElencoPanierView from './components/panier/ElencoPanierView'
import CheckListPanierView from './components/panier/CheckListPanierView'
import CheckListDimensioniPanierView from './components/panier/CheckListDimensioniPanierView'




function App() {
  const [appParametriStampa]=useState([])
  const [pj8App, setpj8App]=useState();//porto il file pdf preso da Impostazioni.js
  const [pj16App, setpj16App]= useState();//porto il file pdf preso da Impostazioni.js
  const [pjCH,setPjCH]=useState();//porto il file pdf preso da Impostazioni.js
  const [pjPanier, setPjPanier]=useState();//porto il file pdf preso da Impostazioni.js
  const [numeroPages, setNumeroPages] = useState('0');
  const [appLista, setAppLista]= useState('');
  const [appData,setAppData]=useState('')
  const [appInputValue, setAppInputValue] = useState(''); //serve per svuotare data inputvalue è dentro Data.js, setInputData è dentro Footer.js
  const [appCliente, setAppCliente] = useState('');
  const [appCantiere, setAppCantiere] = useState('');
  const [appOpera, setAppOpera] = useState('');
  const [appPlan, setAppPlan] = useState('');
  const [appOperatore, setAppOperatore] = useState ('');
  const [appRecuperaMiaLista, setAppRecuperaLista]= useState('') //recupero la lista da eventuale click
  const[saldatoreSceltoApp, setSaldatoreSceltoApp] = useState('')
  const [tipologiaSceltaApp, setTipologiaSceltaApp]= useState('Scegli')
  const[macchinaSceltaApp, setMacchinaSceltaApp]= useState('')
  const [appElementi, setAppElementi]= useState([]) //mi compila la dropdown list di elementi saldati o lavorati
  const [appElementoScelto,setAppElementoScelto]=useState('')
  const [appControllatoNdi, setAppControllatoNdi]= useState('') // al numero di elementi appartiene l'elemento controllato
  const [visualizzaModulo, setVisualizzaModulo]= useState(false)
  const [visualizzaModuloCHApp, setAppVisualizzaModuloCH]= useState(false) //se è true mi visualizza il modulo CH
  const [visualizzaModuloPanierApp, setAppVisualizzaModuloPanier]= useState(false) //se è true mi visualizza il modulo Panier
  const [sceltaModuloApp, setSceltaModuloApp]= useState('0') //se è 8 pj8 se è 16 pj16 questo mi permette di creare moduli diversi a seconda della scelta
  //const [filePj8Json1App, setFilePj8Json1App]= useState([]) //recupero il modulo pj8 da visualizzare in una tabella CANCELLATO, HO USATO LOCAL STORAGE
  //const [filePj16JsonApp, setFilePj16JsonApp]= useState([]) //recupero il modulo pj16 da visualizzare in una tabella
  const [listaPagina1Pj8App, setListaPagina1Pj8App]=useState([]) //recupero i valori pagina 1 pj8 da mandare in stampa
  const [listaPagina2Pj8App, setListaPagina2Pj8App]=useState([]) //recupero i valori pagina 2 pj8 da mandare in stampa
  const [listaPagina1Pj16App, setListaPagina1Pj16App]=useState([]) //recupero i valori pagina 1 pj16 da mandare in stampa
  const [listaPagina2Pj16App, setListaPagina2Pj16App]=useState([]) //recupero i valori pagina 2 pj16 da mandare in stampa
  const [appPulisciCampo, setAppPulisciCampo]=useState(false)
  const [elementoCHSceltoApp, setAppElementoCHScelto]= useState('') //recupero l'elemento scelto
  const [elementoPanierSceltoApp, setAppElementoPanierScelto]=useState('')
  const [elencoAzioniApp, setElencoAzioniApp]=useState([])
  //cancello dati nella textbox di Data.js
   const handleCancel = ()=>{
    setAppInputValue('')
   }

  // useEffect(()=>{
  //   //recupera data da Planning
  //   if(appLista !==''){
  //     setAppData(RecuperaData(appLista))
  //     console.log('sono in App.js e recupero lista:',appLista)
  //     console.log('sono in App.js e recupero data',appData)
  //     console.log("sono in App e recupero elementi:", appElementi)
  //     console.log('elemento CH scelto:', elementoCHSceltoApp)
  //   }
  
  // },[appLista])
  //console.log('elemento CH scelto:', elementoCHSceltoApp)

  //recupero il numero dopo N. di elementi dalla stringa ricevuta da appControllatoNdi che arriva da ElementiSaldati.js
  useEffect(()=>{
    //creo una funzione che riceve una stringa 'bla bla N.4' mi recupera solo '4' viene poi richiamata dando in pasto appElementoScelto che è la stringa che arriva da ElementiSaldati.js
    // e poi da ElementiLavorati.js
    const trovaNElementoDi = (testo)=>{
     const posizioneN = testo.indexOf('N.')
      if(posizioneN !== -1){
        // Trova la posizione dello spazio successivo dopo 'N.'
        const posizioneSpazio = testo.indexOf(' ', posizioneN);
        // Estrai i caratteri dopo 'N.' fino allo spazio successivo
        const caratteriDopoN = testo.substring(posizioneN + 2, posizioneSpazio);
        setAppControllatoNdi(caratteriDopoN)
      } else {
        setAppControllatoNdi('1')
      }
  }
  trovaNElementoDi(appElementoScelto)
  //console.log('NUMERO ELEMENTI SALDATI:',appControllatoNdi)
  },
  [tipologiaSceltaApp,appElementoScelto])

  //creo una funzione che mi recupera da local storage la lista di Azioni
  const elencoAzioniData = ()=>{
    try {
      const elencoStringa = localStorage.getItem('elencoAzioni')
      if(elencoStringa){
        const elencoArray = JSON.parse(elencoStringa)
        setElencoAzioniApp(elencoArray)
        console.log('Elenco AZIONI:',elencoAzioniApp)
      }
      
    } catch (error) {
      console.log('Errore nel recupero dati elenco Azioni da localStorage:', error);
    }
  }
  useEffect(()=>{
    elencoAzioniData()
  },[])

  
  //creiamo la condizione di vedere o non vedere gli elementi :
  let impostazioni;
  let seePdf;
  let data;
  let compilatore;
  let operatore;
  let saldatoriView;
  let macchineView;
  let elementiSaldati;
  let elementiLavorati;
  let tipologia;
  let checkListPj8View1;
  let checkListDimensioniPj8View;
  let checkListDimensioniPj16View
  let checklistPj16View;

  let checkListCHView;
  let checkListCHDimensioniView;
  let elencoCHView;

  let checkListPanierView;
  let checkListPanierDimensioniView;
  let elencoPanierView;


  let footer;
  // console.log('App 124 Visualizza modulo CH:',visualizzaModuloCHApp)
  // console.log('App 125 Visualizza modulo :',visualizzaModulo)
  

  if(visualizzaModulo){   //se il modulo è true allora...
     seePdf = <SeePdf
              //leggiFile={leggiFile}   //non ricordo a xchè lo messo
              setNumeroPages={setNumeroPages}
              setAppLista={setAppLista}
              setAppData={setAppData}
              setAppCliente={setAppCliente}
              setAppCantiere={setAppCantiere}
              setAppOpera= {setAppOpera}
              setAppPlan = {setAppPlan}
              setAppElementi= { setAppElementi}  /* mi legge gli elementi nel pdf*/ 
              //appRecuperaMiaLista = {appRecuperaMiaLista}
              sceltaModuloApp={sceltaModuloApp} //mi dice se è 8pj o 16pj
                />
    compilatore = <Compilatore
              numeroPages={numeroPages} 
              appLista={appLista}
              appCliente={appCliente}
              appCantiere={appCantiere}
              appOpera={appOpera}
              appPlan={appPlan}
                />
    data=<Data appData={appData} setAppData={setAppData}  appInputValue={appInputValue} setAppInputValue={setAppInputValue}  />
    operatore = <Operatore setAppOperatore={setAppOperatore} />            
    //Scelta della scheda Saldatori o Macchine
                if(sceltaModuloApp === '8pj'){
                  //console.log('in App il modulo scelto è:',sceltaModuloApp)
                  saldatoriView = <SaldatoriView setSaldatoreSceltoApp={setSaldatoreSceltoApp}  />
                  checkListPj8View1= <CheckListPj8View1
                    setListaPagina1Pj8App={setListaPagina1Pj8App}  
                    elencoAzioniApp={elencoAzioniApp} /> //mi carica la prima pagina per la spunta option  porto elenco azioni
                  checkListDimensioniPj8View=<CheckListDimensioniPj8View 
                  setListaPagina2Pj8App={setListaPagina2Pj8App} 
                  appPulisciCampo={appPulisciCampo} 
                  setAppPulisciCampo={setAppPulisciCampo} 
                  elencoAzioniApp={elencoAzioniApp} /> //mi carica la seconda pagina per la spunta checkbox
                  //Visualizza Elenco elementi saldati
                  elementiSaldati =<ElementiSaldati
                              appElementi={appElementi} 
                            setAppElementoScelto={setAppElementoScelto}
                            />
                } else if( sceltaModuloApp === '16pj') {
                // console.log('in App il modulo scelto è:',sceltaModuloApp)
                  macchineView = <MacchineView setMacchinaSceltaApp={setMacchinaSceltaApp}  />
                  checklistPj16View = <CheckListPj16View
                   setListaPagina1Pj16App={setListaPagina1Pj16App} 
                   elencoAzioniApp={elencoAzioniApp} />  //mi carica la prima pagina per la spunta option
                  checkListDimensioniPj16View=<CheckListDimensioniPj16View 
                  setListaPagina2Pj16App={setListaPagina2Pj16App} 
                  appPulisciCampo={appPulisciCampo} 
                  setAppPulisciCampo={setAppPulisciCampo} 
                  elencoAzioniApp={elencoAzioniApp}/> //mi carica la seconda pagina per la spunta checkbox
                  elementiLavorati=<ElementiLavorati
                              appElementi={appElementi} 
                              setAppElementoScelto={setAppElementoScelto} 
                              />
                }
                else {
                  //console.log('in App il modulo scelto è:',sceltaModuloApp)
                  return
                }
    
     //Visualizza tipologia elementi
     tipologia = <TipologiaView setTipologiaSceltaApp={setTipologiaSceltaApp} />

      //******************Raccolta dati per la stampa:
      footer=<Footer 
      setAppRecuperaLista={setAppRecuperaLista}
      appLista={appLista}
      appCliente={appCliente} 
      appCantiere={appCantiere}
      appData={appData}
      appOperatore={appOperatore}
      pj8App={pj8App}
      pj16App={pj16App}
      pjCH={pjCH}
      appParametriStampa={appParametriStampa}
      listaPagina1Pj8App={listaPagina1Pj8App}
      listaPagina2Pj8App={listaPagina2Pj8App}
      listaPagina1Pj16App={listaPagina1Pj16App}
      listaPagina2Pj16App={listaPagina2Pj16App}
      saldatoreSceltoApp={saldatoreSceltoApp}
      elementoCHSceltoApp={elementoCHSceltoApp}
      appElementoScelto={appElementoScelto}
      tipologiaSceltaApp={tipologiaSceltaApp}
      macchinaSceltaApp={macchinaSceltaApp}
      appControllatoNdi={appControllatoNdi}
      appOpera={appOpera}
      appPlan={appPlan}
      onCancel={handleCancel}//mi serve per eliminare il campo da Data.js
      setAppPulisciCampo={setAppPulisciCampo} //pulisce i campi di CheckListDimensioniPj8View/CheckListDimensioniPj16View
     
      />
    //***************************fine raccolta per la stampa pj8 e pj16******************************************** */
    //SE UN MODULO CH
  } else if(visualizzaModuloCHApp){
    data=<Data setAppData={setAppData}  appInputValue={appInputValue} setAppInputValue={setAppInputValue} sceltaModuloApp={sceltaModuloApp}  />
    operatore = <Operatore setAppOperatore={setAppOperatore} sceltaModuloApp={sceltaModuloApp} /> 
    macchineView = <MacchineView setMacchinaSceltaApp={setMacchinaSceltaApp} sceltaModuloApp={sceltaModuloApp}  />
    checkListCHView=<CheckListCHView
     setListaPagina1Pj8App={setListaPagina1Pj8App}
     elencoAzioniApp={elencoAzioniApp}
     appPulisciCampo={appPulisciCampo} 
     setAppPulisciCampo={setAppPulisciCampo}/>
    checkListCHDimensioniView=<CheckListCHDimensioniView
     setListaPagina2Pj8App={setListaPagina2Pj8App} 
     appPulisciCampo={appPulisciCampo} 
     setAppPulisciCampo={setAppPulisciCampo} 
     elencoAzioniApp={elencoAzioniApp}/>
    elencoCHView=<ElencoCHView setAppElementoCHScelto={setAppElementoCHScelto} />
    footer=<Footer 
    setAppRecuperaLista={setAppRecuperaLista}
    appLista={appLista}
    appCliente={appCliente} 
    appCantiere={appCantiere}
    appData={appData}
    appOperatore={appOperatore}
    pj8App={pj8App}
    pj16App={pj16App}
    pjCH={pjCH}
    appParametriStampa={appParametriStampa}
    listaPagina1Pj8App={listaPagina1Pj8App}
    listaPagina2Pj8App={listaPagina2Pj8App}
    listaPagina1Pj16App={listaPagina1Pj16App}
    listaPagina2Pj16App={listaPagina2Pj16App}
    saldatoreSceltoApp={saldatoreSceltoApp}
    elementoCHSceltoApp={elementoCHSceltoApp}
    appElementoScelto={appElementoScelto}
    tipologiaSceltaApp={tipologiaSceltaApp}
    macchinaSceltaApp={macchinaSceltaApp}
    appControllatoNdi={appControllatoNdi}
    appOpera={appOpera}
    appPlan={appPlan}
    onCancel={handleCancel}//mi serve per eliminare il campo da Data.js
    setAppPulisciCampo={setAppPulisciCampo} //pulisce i campi di CheckListDimensioniPj8View/CheckListDimensioniPj16View
    appInputValue={appInputValue} //contiene data?
    
    />

  }
  //se sono PANIER allora eseguo:
  else if(visualizzaModuloPanierApp){
    data=<Data setAppData={setAppData}  appInputValue={appInputValue} setAppInputValue={setAppInputValue} sceltaModuloApp={sceltaModuloApp}  />
    operatore = <Operatore setAppOperatore={setAppOperatore} sceltaModuloApp={sceltaModuloApp} /> 
    macchineView = <MacchineView setMacchinaSceltaApp={setMacchinaSceltaApp} sceltaModuloApp={sceltaModuloApp}  />
    checkListPanierView = <CheckListPanierView
     setListaPagina1Pj16App={setListaPagina1Pj16App}
      elencoAzioniApp={elencoAzioniApp}
      appPulisciCampo={appPulisciCampo} 
      setAppPulisciCampo={setAppPulisciCampo}/>
    checkListPanierDimensioniView=<CheckListDimensioniPanierView
     setListaPagina2Pj16App={setListaPagina2Pj16App} 
     elencoAzioniApp={elencoAzioniApp} 
     appPulisciCampo={appPulisciCampo} 
     setAppPulisciCampo={setAppPulisciCampo}/>
    elencoPanierView=<ElencoPanierView setAppElementoPanierScelto={setAppElementoPanierScelto} />
    footer=<Footer 
    setAppRecuperaLista={setAppRecuperaLista}
    appLista={appLista}
    appCliente={appCliente} 
    appCantiere={appCantiere}
    appData={appData}
    appOperatore={appOperatore}
    pj8App={pj8App}
    pj16App={pj16App}
    pjCH={pjCH}
    pjPanier={pjPanier}
    appParametriStampa={appParametriStampa}
    listaPagina1Pj8App={listaPagina1Pj8App}
    listaPagina2Pj8App={listaPagina2Pj8App}
    listaPagina1Pj16App={listaPagina1Pj16App}
    listaPagina2Pj16App={listaPagina2Pj16App}
    saldatoreSceltoApp={saldatoreSceltoApp}
    elementoCHSceltoApp={elementoCHSceltoApp}
    elementoPanierSceltoApp={elementoPanierSceltoApp}
    appElementoScelto={appElementoScelto}
    tipologiaSceltaApp={tipologiaSceltaApp}
    macchinaSceltaApp={macchinaSceltaApp}
    appControllatoNdi={appControllatoNdi}
    appOpera={appOpera}
    appPlan={appPlan}
    onCancel={handleCancel}//mi serve per eliminare il campo da Data.js
    setAppPulisciCampo={setAppPulisciCampo} //pulisce i campi di CheckListDimensioniPj8View/CheckListDimensioniPj16View
    appInputValue={appInputValue} //contiene data?
    
    />

  }
   else {
    
    impostazioni=
    <Impostazioni 
    setpj8App={setpj8App} 
    setpj16App={setpj16App} 
    setPjCH={setPjCH}
    setPjPanier={setPjPanier}
    setVisualizzaModulo={setVisualizzaModulo} 
    setAppVisualizzaModuloCH={setAppVisualizzaModuloCH}
    setAppVisualizzaModuloPanier={setAppVisualizzaModuloPanier}
    setSceltaModuloApp={setSceltaModuloApp}
    //setFilePj16JsonApp={setFilePj16JsonApp}
    />
  }
  console.log('App 228 Visualizza modulo CH:',visualizzaModuloCHApp)

  
 
  //console.log('pdf8 su App.js:',pj8App)
  //console.log('tipologia dentro App:',tipologiaSceltaApp, 'modulo:',sceltaModuloApp)
  console.log('In checkdimensione8:',listaPagina2Pj8App)

  return (
    <div>
    
    <div style={{display:'-ms-flexbox',position:'relative', alignItems: 'center', textAlign:'center'}}>
    {impostazioni}
    </div>
    
  
       {/* Colonna sinistra: PDF */}
          
            {visualizzaModulo ?
             <div style={{display:'grid'}} >
              <div className='pdf' style={{}}>
                
                {seePdf}
                </div>
              <div style={{
                  
                  }}>    
                  
                  {compilatore}
                  <h2>{appOperatore}</h2>
                  
                 
                    <div className='contenitore'>
                      {data}
                      {operatore}
                      {saldatoriView}
                      {macchineView}
                      {elementiSaldati}
                      {elementiLavorati}
                      {tipologia}
                    </div>
                  
                  {checkListPj8View1}
                  {checkListDimensioniPj8View}
                  {checklistPj16View}
                  {checkListDimensioniPj16View}
                  {footer}
                  </div>
            </div>
            : visualizzaModuloCHApp ?
            <div>
              <h1 style={{textAlign:'center'}}>Controllo CH</h1>
              {data}
              {operatore}
              {macchineView}
              {elencoCHView}
              {checkListCHView}
              {checkListCHDimensioniView}
              {footer}
            </div>
            : visualizzaModuloPanierApp ?
            <div>
            <h1 className='panier'>Controllo Panier</h1>
            {data}
            {operatore}
            {macchineView}
            {elencoPanierView}
            {checkListPanierView}
            {checkListPanierDimensioniView}
            {footer}
          </div>
           :<p>&copy;2024 WM ver: 0.0.1</p>
            }
            
       

        
   
   </div>
  );
}

export default App;
