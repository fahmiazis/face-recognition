import React, { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
const {REACT_APP_BACKEND_URL} = process.env

export default function AllPages(props) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const { pdf, dataFile } = props;
  const genData = dataFile === undefined ? 'file.pdf' : dataFile.path.split('/')
  const cekDoc = genData[2].split('.')

  return (
    cekDoc[1] === 'jpg' || cekDoc[1] === 'png' ? 
    <div>
      <img src={`${REACT_APP_BACKEND_URL}/${dataFile.path}`} />
    </div>
    : <Document
      file={pdf}
      options={{ workerSrc: "../../public/pdf.worker.js" }}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
}
