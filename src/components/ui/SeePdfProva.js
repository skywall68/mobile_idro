import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Imposta il worker di pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const SeePdfProva = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);

  //----------------funzione che mi estrae tutte le righe e mi crea un array----------
  const extractAllLines = (text) => {
    // Dividi il testo in righe
    const lines = text.split('\n');
  
    // Mappa ogni riga in un oggetto e aggiungilo all'array
    const allLinesArray = lines.map(line => ({ elemento: line.trim() }));
  
    return allLinesArray;
  };
  //------------------------------------------------------------------

  const onFileChange = async (event) => {
    const filePdf = event.target.files[0];
    if (filePdf.type === "application/pdf") {
      setFile(file);
      try {
        const pdfText = await extractTextFromPdf(filePdf);//mi visualizza insieme di testi dove ogni 'testo' va a capo
        console.log('valore pdfText:', pdfText);
        const allLinesArray = extractAllLines(pdfText); // fuzione che prende testo e lo trasforma in un array di oggetti:
        console.log('totale elementi:',allLinesArray);

        const elementsArray = extractElements(allLinesArray);// dovrebbe filtrare solo gli oggetti che iniziano con Element
       console.log('elementi distinti:',elementsArray);
        // Qui puoi fare ulteriori operazioni con elementsArray
      } catch (error) {
        console.error("Errore nell'estrazione del testo dal PDF:", error);
      }
    } else {
      alert("Per favore, seleziona un file PDF.");
    }
  };
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
  //--------------------------------------------------
  //funzione che deve solo prendere determinati elementi
  const extractElements = (arrayPdf) => {
    
    return arrayPdf.filter(obj =>
      typeof obj.elemento === 'string' && obj.elemento.startsWith('Elément:')
    )
  };
  //--------------------------------------------

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      {file && (
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      )}
    </div>
  );
};





export default SeePdfProva
