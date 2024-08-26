import React, { useState, useEffect } from 'react';
import HistoryModal from './HistoryModal';

export function InputWithButton() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [history, setHistory] = useState([]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('bionicHistory')) || [];
    setHistory(savedHistory);
  }, []);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const translateToBionic = (text) => {
    const words = text.split(' ');
    const translatedWords = words.map(word => {
      const midpoint = Math.floor(word.length / 2);
      return `<b>${word.slice(0, midpoint)}</b>${word.slice(midpoint)}`;
    });
    return translatedWords.join(' ');
  };

  const handleTranslateClick = () => {
    const translation = translateToBionic(inputText);

    if (inputText !== '' && translation !== translatedText) {
      setTranslatedText(translation);

      const existsInHistory = history.some(item => item.originalText === inputText);

      if (!existsInHistory) {
        const newHistoryItem = {
          originalText: inputText,
          translatedText: translation,
          fullText: translation, // Asegúrate de almacenar el texto completo
          fragment: `${inputText.slice(0, 40)}...`,
          timeAgo: 'Just now',
        };

        const updatedHistory = [newHistoryItem, ...history];
        setHistory(updatedHistory);
        localStorage.setItem('bionicHistory', JSON.stringify(updatedHistory));
      }
    }
  };

  const openHistoryModal = () => {
    setIsHistoryModalOpen(true);
  };

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };

  const handleDeleteHistoryItem = (itemToDelete) => {
    const updatedHistory = history.filter(item => item !== itemToDelete);
    setHistory(updatedHistory);
    localStorage.setItem('bionicHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="flex items-center justify-center mt-8 bg-gray-100 dark:bg-neutral-900">
      <div className="w-full max-w-lg p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm box-border">
        <textarea
          value={inputText}
          onChange={handleInputChange}
          className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-neutral-700 dark:text-white resize-none max-h-32 overflow-auto box-border"
          rows="3"
          placeholder="Ingresa el texto aquí"
        ></textarea>
        <button
          onClick={handleTranslateClick}
          className="mt-2 w-full bg-black dark:bg-neutral-800 dark:text-neutral-100 font-bold text-white py-2 rounded-lg box-border"
        >
          Traducir a Bionic
        </button>
        {translatedText && (
          <div className="mt-4 p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-gray-100 dark:bg-neutral-800 dark:text-white max-h-60 overflow-auto box-border">
            <h3 className="font-bold mb-2">Texto en formato Bionic:</h3>
            <div
              dangerouslySetInnerHTML={{ __html: translatedText }}
              className="overflow-auto"
            />
          </div>
        )}
        <button
          onClick={openHistoryModal}
          className="mt-2 w-full bg-black dark:bg-neutral-800 dark:text-neutral-100 font-bold text-white py-2 rounded-lg box-border"
        >
          Ver Historial
        </button>
      </div>

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={closeHistoryModal}
        historyItems={history}
        onDelete={handleDeleteHistoryItem}
      />
    </div>
  );
}
