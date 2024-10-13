import React, { createContext, useState, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setMessage(msg);
    if (type === 'errorMessage') {
      toast.error(msg);
    } else {
      toast.success(msg);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);