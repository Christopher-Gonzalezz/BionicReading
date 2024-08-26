import React, { useState, useEffect } from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

export function DarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    const storedPreference = localStorage.getItem('darkMode');
    return storedPreference ? JSON.parse(storedPreference) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const rootElement = document.documentElement;
    if (darkMode) {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <BsFillSunFill className="text-yellow-500 w-6 h-6" />
      ) : (
        <BsFillMoonFill className="text-gray-800 dark:text-gray-200 w-6 h-6" />
      )}
    </button>
  );
}

export default DarkMode;
