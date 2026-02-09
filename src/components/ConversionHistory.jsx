import { useContext } from 'react';
import { FiX, FiCopy, FiTrash2 } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';

export default function ConversionHistory() {
  const { history, removeHistoryItem, clearHistory } = useContext(AppContext);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p className="text-sm">変換履歴はまだありません</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-slideUp">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">変換履歴</h3>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-sm text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
          >
            <FiTrash2 className="text-lg" />
            すべてクリア
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex-1 text-sm">
              <span className="font-semibold text-gray-800 dark:text-white">
                {entry.value} {entry.fromUnit}
              </span>
              <span className="text-gray-500 dark:text-gray-400 mx-2">→</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {entry.result} {entry.toUnit}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                ({entry.category})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  copyToClipboard(`${entry.value} ${entry.fromUnit} = ${entry.result} ${entry.toUnit}`)
                }
                className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-colors"
                title="コピー"
              >
                <FiCopy className="text-lg" />
              </button>
              <button
                onClick={() => removeHistoryItem(entry.id)}
                className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                title="削除"
              >
                <FiX className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
