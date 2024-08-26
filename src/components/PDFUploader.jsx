import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { translateToBionic } from './bionicUtils'; // Asegúrate de que esta función esté disponible

// Configurar el trabajador para la versión correcta de pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.8.162/build/pdf.worker.min.js';

export default function PDFUploader({ onClose }) {
  const [pdfFile, setPdfFile] = useState(null);
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleTranslateClick = async () => {
    if (!pdfFile) {
      alert('Por favor, selecciona un archivo PDF.');
      return;
    }
    setLoading(true);

    try {
      // Leer el archivo PDF
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(pdfFile);
      fileReader.onload = async () => {
        try {
          const pdfData = new Uint8Array(fileReader.result);
          const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

          let text = '';

          for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(' ');
            text += pageText + '\n'; // Agregar un salto de línea al final de cada página
          }

          // Traducir el texto a Bionic Reading
          const translatedText = translateToBionic(text);
          setTranslatedText(translatedText);
        } catch (error) {
          console.error('Error al procesar el PDF:', error);
        } finally {
          setLoading(false);
        }
      };
    } catch (error) {
      console.error('Error al leer el archivo PDF:', error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Subir y Traducir PDF</h2>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full mb-4 p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
        />
        <div className="flex space-x-2">
          <button
            onClick={handleTranslateClick}
            className="flex-1 bg-black dark:bg-neutral-800 dark:text-neutral-100 font-bold text-white py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-neutral-700"
            disabled={loading}
          >
            {loading ? 'Traduciendo...' : 'Traducir PDF'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-black dark:bg-neutral-800 dark:text-neutral-100 font-bold text-white py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-neutral-700"
          >
            Cerrar
          </button>
        </div>
        {translatedText && (
          <div className="mt-4 p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-gray-100 dark:bg-neutral-800 dark:text-white max-h-60 overflow-auto">
            <h3 className="font-bold mb-2 text-neutral-900 dark:text-white">Texto en formato Bionic:</h3>
            <div 
              dangerouslySetInnerHTML={{ __html: translatedText }}
              className="whitespace-pre-wrap" // Asegura que se mantengan los saltos de línea y espacios
            />
          </div>
        )}
      </div>
    </div>
  );
}
