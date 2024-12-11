import { useState } from 'react'
import { ArrowRight, SwatchBook } from 'lucide-react'
import ThemeToggle from './components/ThemeToggle'
import Analysis from './components/Analysis'

function App() {
  const [url, setUrl] = useState('')
  const [analysisMode, setAnalysisMode] = useState(false)
  const [colors, setColors] = useState(null)

  // Mock data for now
  const mockColors = {
    palette: ['#000000', '#FF4B4B', '#4CAF50', '#E0E0E0']
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setColors(mockColors)
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-300 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* URL Input Section */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
            className="flex-1 px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            required
          />
          <ThemeToggle isDark={analysisMode} onChange={setAnalysisMode} />
          <button
            type="submit"
            className="px-8 py-2 rounded-xl font-medium
              bg-white dark:bg-zinc-800 
              text-zinc-900 dark:text-white
              border border-zinc-300 dark:border-zinc-700
              hover:bg-zinc-50 dark:hover:bg-zinc-700
              transition-all duration-300
              flex items-center gap-2"
          >
            <SwatchBook size={32} className="transform translate-y-[1px]" /> <span className="text-2xl">enjoy</span>
          </button>
        </form>

        {/* Force light mode and override with dark when needed */}
        <div className={`light ${analysisMode ? 'dark' : ''}`}>
          <Analysis colors={colors} />
        </div>
      </div>
    </main>
  )
}

export default App
