export default function CategoryCard({ icon, name, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105
        ${isActive
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-lg'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white hover:border-blue-500'
        }
      `}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-sm font-semibold text-center">{name}</div>
    </button>
  );
}
