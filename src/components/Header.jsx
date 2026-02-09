import { useContext, useState } from 'react';
import { FiMoon, FiSun, FiSettings } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';
import Settings from './Settings';

export default function Header() {
  const { darkMode, toggleDarkMode } = useContext(AppContext);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-8 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold">⚙️</div>
            <div>
              <h1 className="text-3xl font-bold">単位変換ツール</h1>
              <p className="text-sm opacity-90">様々な単位をかんたんに変換</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
              title="ダークモード切り替え"
            >
              {darkMode ? (
                <FiSun className="text-2xl" />
              ) : (
                <FiMoon className="text-2xl" />
              )}
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
              title="設定"
            >
              <FiSettings className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Settings onClose={() => setShowSettings(false)} />
        </div>
      )}
    </>
  );
}
