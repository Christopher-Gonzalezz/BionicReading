import React, { useState, useEffect, useRef } from 'react';
import { CiTrash } from 'react-icons/ci';
import { FaEllipsisV } from 'react-icons/fa';

function HistoryModal({ isOpen, onClose, historyItems = [], onDelete }) {
  const [visibleItems, setVisibleItems] = useState(5);
  const [deleteItem, setDeleteItem] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null); // Referencia para el menú desplegable

  useEffect(() => {
    if (isOpen) {
      setVisibleItems(5); // Restablecer a 5 cada vez que se abre el modal
    }
  }, [isOpen]);

  useEffect(() => {
    if (openMenu) {
      // Listener para detectar clics fuera del menú
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setOpenMenu(null); // Cierra el menú si se hace clic afuera
        }
      };
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside); // Limpia el listener cuando se desmonta
      };
    }
  }, [openMenu]);

  const loadMoreItems = () => {
    setVisibleItems((prev) => prev + 5);
  };

  const handleDeleteClick = (item) => {
    setDeleteItem(item);
  };

  const confirmDelete = () => {
    if (deleteItem) {
      onDelete(deleteItem);
      setDeleteItem(null);
    }
  };

  const cancelDelete = () => {
    setDeleteItem(null);
  };

  const handleMenuClick = (item) => {
    setOpenMenu(openMenu === item ? null : item);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-container') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-container"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">Historial</h2>
        <ul className="space-y-4">
          {historyItems.slice(0, visibleItems).map((item, index) => (
            <li key={index} className="flex items-start justify-between border-b pb-4 dark:border-neutral-600">
              <div className="flex-1">
                <p className="text-neutral-800 dark:text-neutral-200">{item.originalText}</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => handleMenuClick(item)}
                  className="text-neutral-600 dark:text-neutral-400 p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full focus:outline-none"
                >
                  <FaEllipsisV className="h-5 w-5" />
                </button>
                {openMenu === item && (
                  <div ref={menuRef} className="absolute right-0 mt-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => handleDeleteClick(item)}
                      className="flex items-center p-3 text-red-600 dark:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 w-full text-left"
                    >
                      <CiTrash className="h-5 w-5" />
                      <span className="ml-2">Eliminar</span>
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        {visibleItems < historyItems.length && (
          <button
            onClick={loadMoreItems}
            className="mt-6 w-full bg-neutral-800 dark:bg-neutral-600 text-white py-2 rounded-lg hover:bg-neutral-900 dark:hover:bg-neutral-500 transition"
          >
            Cargar más
          </button>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-neutral-700 dark:bg-neutral-600 text-white py-2 rounded-lg hover:bg-neutral-900 dark:hover:bg-neutral-500 transition"
        >
          Cerrar
        </button>

        {deleteItem && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Confirmación</h3>
              <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                ¿Estás seguro de que quieres eliminar este elemento?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 dark:bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 dark:hover:bg-red-400 transition"
                >
                  Eliminar
                </button>
                <button
                  onClick={cancelDelete}
                  className="bg-gray-500 dark:bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryModal;
