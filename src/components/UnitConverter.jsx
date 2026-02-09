import { useState, useContext } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';

export const UnitConverter = ({ category, categoryId, units, conversionFunction }) => {
  const { precision, addToHistory } = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState(units[0]);
  const [toUnit, setToUnit] = useState(units[1] || units[0]);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!inputValue || isNaN(inputValue)) {
      setResult('');
      return;
    }

    const convertedValue = conversionFunction(
      parseFloat(inputValue),
      fromUnit,
      toUnit
    );

    const formattedResult = convertedValue
      .toFixed(precision)
      .replace(/\.?0+$/, '');

    setResult(formattedResult);

    // Add to history
    addToHistory({
      category,
      categoryId,
      value: inputValue,
      fromUnit,
      toUnit,
      result: formattedResult,
    });
  };

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult('');
    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === '') {
      setResult('');
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(`${result} ${toUnit}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-slideUp">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        {category}
      </h2>

      <div className="grid grid-cols-3 gap-4 md:gap-6 items-end">
        {/* From Unit */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            From
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onKeyUp={handleConvert}
            onBlur={handleConvert}
            placeholder="0"
            step="any"
            className="input-field w-full text-lg"
          />
          <select
            value={fromUnit}
            onChange={(e) => {
              setFromUnit(e.target.value);
              if (inputValue) {
                setTimeout(handleConvert, 0);
              }
            }}
            className="input-field w-full"
          >
            {units.map((unit) => (
              <option key={`from-${unit}`} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwapUnits}
            className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all transform hover:scale-110"
            title="単位を入れ替え"
          >
            ⇄
          </button>
        </div>

        {/* To Unit */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            To
          </label>
          <div className="input-field text-lg font-semibold text-gray-800 dark:text-white flex items-center justify-between">
            <span>{result || '—'}</span>
            {result && (
              <button
                onClick={copyToClipboard}
                className="ml-2 p-1 text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                title="コピー"
              >
                {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
              </button>
            )}
          </div>
          <select
            value={toUnit}
            onChange={(e) => {
              setToUnit(e.target.value);
              if (inputValue) {
                setTimeout(handleConvert, 0);
              }
            }}
            className="input-field w-full"
          >
            {units.map((unit) => (
              <option key={`to-${unit}`} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
