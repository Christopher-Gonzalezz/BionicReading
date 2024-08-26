import React, { useState, useEffect } from 'react';
import { LuBrain } from "react-icons/lu";
import DarkMode from './DarkMode';
import PDFUploader from './PDFUploader';

export function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const openPdfModal = () => {
    setShowPdfModal(true);
  };

  const closePdfModal = () => {
    setShowPdfModal(false);
  };


  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('bionicHistory')) || [];
    setHistoryItems(savedHistory);
  }, []);
  

  return (
    <>
      <nav className="border-gray-200 dark:bg-neutral-900 dark:text-gray-100 relative rounded-lg">
        <div className="min-w-[430px] flex flex-wrap items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <LuBrain className='h-10 w-10 text-neutral-900 dark:text-neutral-100' />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">TocoLeyendo</span>
          </div>
          <div className="flex items-center space-x-3 md:space-x-8">
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded={navbarOpen}
              onClick={toggleNavbar}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div className={`absolute top-full right-0 w-full bg-gray-100 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700 md:relative md:flex md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-neutral-900 dark:border-neutral-700 ${navbarOpen ? 'block' : 'hidden'} z-50`} id="navbar-user">
              <ul className="flex flex-col bg-gray-100 dark:bg-neutral-900 md:flex-row md:space-x-8 font-medium p-4 md:p-0 space-y-4 md:space-y-0">
                <li>
                  <button
                    onClick={openPdfModal}
                    className="block py-2 px-3 text-gray-900 bg-gray-100 rounded hover:bg-gray-300 dark:text-gray-100 dark:bg-neutral-900 dark:hover:bg-gray-700"
                  >
                    Subir PDF
                  </button>
                </li>
                <li>
                  <DarkMode />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {showPdfModal && (
        <PDFUploader onClose={closePdfModal} />
      )}
    </>
  );
}
