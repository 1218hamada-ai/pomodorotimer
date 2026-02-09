import { createContext, useState, useCallback, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [precision, setPrecision] = useState(6);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedPrecision = parseInt(localStorage.getItem('precision') || '6', 10);
    const savedHistory = JSON.parse(localStorage.getItem('history') || '[]');

    setDarkMode(savedDarkMode);
    setPrecision(savedPrecision);
    setHistory(savedHistory);

    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem('darkMode', newValue);
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newValue;
    });
  }, []);

  const updatePrecision = useCallback((newPrecision) => {
    setPrecision(newPrecision);
    localStorage.setItem('precision', newPrecision);
  }, []);

  const addToHistory = useCallback((entry) => {
    const newEntry = {
      id: Date.now(),
      ...entry,
      timestamp: new Date().toISOString(),
    };

    setHistory((prev) => {
      const updated = [newEntry, ...prev].slice(0, 50); // Keep last 50 entries
      localStorage.setItem('history', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('history');
  }, []);

  const removeHistoryItem = useCallback((id) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem('history', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        history,
        addToHistory,
        clearHistory,
        removeHistoryItem,
        precision,
        updatePrecision,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
