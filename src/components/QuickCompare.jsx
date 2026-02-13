import { useState, useMemo } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function QuickCompare({ value, fromUnit, units, conversionFunction, precision }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const conversions = useMemo(() => {
    if (!value || isNaN(value) || !isExpanded) return [];

    try {
      return units
        .filter(unit => unit !== fromUnit)
        .map(toUnit => {
          try {
            const result = conversionFunction(parseFloat(value), fromUnit, toUnit);
            return {
              unit: toUnit,
              value: result.toFixed(precision).replace(/\.?0+$/, '')
            };
          } catch {
            return null;
          }
        })
        .filter(Boolean);
    } catch {
      return [];
    }
  }, [value, fromUnit, units, conversionFunction, precision, isExpanded]);

  if (!value || isNaN(value)) return null;

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
      >
        {isExpanded ? (
          <>
            <FiEyeOff className="text-lg" />
            クイック比較を非表示
          </>
        ) : (
          <>
            <FiEye className="text-lg" />
            他の単位と比較
          </>
        )}
      </button>

      {isExpanded && conversions.length > 0 && (
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 animate-slideUp">
          {conversions.map(({ unit, value }) => (
            <div
              key={unit}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-3 rounded-lg border border-gray-200 dark:border-gray-500"
            >
              <div className="text-xs text-gray-600 dark:text-gray-300 font-semibold mb-1">
                {unit}
              </div>
              <div className="text-lg font-bold text-gray-800 dark:text-white truncate" title={value}>
                {value}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
