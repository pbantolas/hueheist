import { Sun, Moon } from 'lucide-react'

const ThemeToggle = ({ isDark, onChange }) => {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => onChange(false)}
        className={`px-6 py-2 text-sm transition-all relative z-10 rounded-t-xl flex items-center gap-2 ${
          !isDark 
            ? 'bg-amber-400 text-black font-bold ring-2 ring-black dark:ring-white shadow-[0_0_20px_5px_rgba(251,191,36,0.9)]' 
            : 'bg-white text-black font-medium'
        }`}
      >
        <Sun size={16} /> light
      </button>
      <div className="h-px bg-gray-200 dark:bg-gray-700" />
      <button
        onClick={() => onChange(true)}
        className={`px-6 py-2 text-sm transition-all relative z-10 rounded-b-xl flex items-center gap-2 ${
          isDark 
            ? 'bg-amber-400 text-black font-bold ring-2 ring-black dark:ring-white shadow-[0_0_20px_5px_rgba(251,191,36,0.9)]' 
            : 'bg-black text-white font-medium'
        }`}
      >
        <Moon size={16} /> dark
      </button>
    </div>
  )
}

export default ThemeToggle
