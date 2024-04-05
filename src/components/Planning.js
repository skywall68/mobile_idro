import React, { useState } from 'react';
import * as XLSX from 'xlsx';

import './Planning.css'

const Planning = () => {
    const [excelData, setExcelData] = useState([]);
    const [isGreen,setIsGreen]=useState(false) //mi determina se è aperto
    /////////////////vado a cercare il file xls/////////////////////////////////
 const handleFileUpload = async (e) => {
    setIsGreen(true)
    const file = e.target.files[0];

    const reader = new FileReader();

     reader.onload = async (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const allData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
     
       /////filtriamo i dati /////////////////////
       const filteredRows = allData
       .map((rowMia) =>{
        // const recuperaData = rowMia.findIndex((cell) => (typeof cell === 'string' && /\b\d{2}-\d{2}-\d{4}\b/.test(cell))||(typeof cell === 'string' && /\b\d{2}-\d{2}-\d{2}\b/.test(cell))||(typeof cell === 'string' && /\\b\\d{2}\/\\d{2}\/\\d{2}\\b/.test(cell))) // se la data stringa è nn-nn-nnnn
        const recuperaData = rowMia.findIndex(
          (cell) =>
            (typeof cell === "string" && /\b\d{2}-\d{2}-\d{4}\b/.test(cell)) ||
            (typeof cell === "string" && /\b\d{2}-\d{2}-\d{2}\b/.test(cell)) ||
            (typeof cell === "string" && /\\b\\d{2}\/\\d{2}\/\\d{2}\\b/.test(cell)) ||
            (typeof cell === "string" && /\b\d{2}\/\d{2}\/\d{2}\b/.test(cell))
        );
         //se presente la stringa 'nn-nn-nnnn' allora copia la data
         if(recuperaData !== -1){
             const dataMia = rowMia[recuperaData] //prendi il valore dentro la cella
             const listeMia = [] //creo un array vuoto per poi inserire le liste
             //creo un ciclo per cercare tutte le liste nella medesima riga
             for(let i = recuperaData + 1; i < rowMia.length; i++) {
              const contenutoCella = rowMia[i];
              // adesso cosa trovo? se è quello che voglio allora memorizza:
              if(typeof contenutoCella === 'string'){
                 const matches = contenutoCella.match(/\b\d{5}\b/g) // per cercare tutti i match di sequenze di 5 cifre 
                 if (matches){
                     listeMia.push(...matches);
                 }
              } else if( (typeof contenutoCella ==='number' || (typeof contenutoCella === 'string' && /\b\d{5}\b/.test(contenutoCella))) &&
              /\b\d{5}\b/.test(contenutoCella)){
               //console.log('valore di else if:',contenutoCella)
               const valoreN = contenutoCella
               if(valoreN){
                 listeMia.push(contenutoCella.toString())
               }
               
              }
             } //fine ciclo for
             return { data:dataMia, liste:listeMia}
         }
         return null
       })
       .filter(Boolean);
 
 
         
       setExcelData(filteredRows);
       console.log('Filtered Rows:', filteredRows);
       localStorage.setItem('dataLista',JSON.stringify(filteredRows)) //memorizza l'array di oggetti data e liste[]
      
     };
     reader.readAsBinaryString(file);
    };
    ///////////////////////////////////////////////////////////
     console.log('se è salvato in excelData',excelData )
  
     //////////////////comando click///////////////////////////
     
   //className={!isGreen ?'containerPjPdf':'containerPjPdfGreen'}>
  return (
    <div className={!isGreen ?'containerPlanning':'containerPlanningGreen'} ><h2>Planning</h2>
    <label htmlFor="fileInput"></label>
     <input type="file" accept='.xls' onChange={handleFileUpload} style={{fontSize:20}}/>
    </div>
  )
}

export default Planning