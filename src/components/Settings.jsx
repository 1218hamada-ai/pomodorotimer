import { useContext } from 'react';
import { FiX } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';

export default function Settings({ onClose }) {
  const { precision, updatePrecision, clearHistory } = useContext(AppContext);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md animate-slideUp">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">設定</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <FiX className="text-2xl" />
        </button>
      </div>

      <div className="space-y-6">
        {/* 小数点精度設定 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            小数点の精度
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="10"
              value={precision}
              onChange={(e) => updatePrecision(parseInt(e.target.value, 10))}
              className="flex-1 h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-lg font-semibold text-blue-600 min-w-[2rem]">
              {precision}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            小数点以下の桁数を設定します
          </p>
        </div>

        {/* 危険なアクション */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            その他
          </h3>
          <button
            onClick={() => {
              clearHistory();
              alert('変換履歴をクリアしました');
            }}
            className="w-full px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors font-semibold"
          >
            変換履歴をクリア
          </button>
        </div>

        {/* クローズボタン */}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
        >
          完了
        </button>
      </div>
    </div>
  );
}
