import { useState } from 'react'
import { ArrowRight, SwatchBook } from 'lucide-react'
import ThemeToggle from './components/ThemeToggle'
import Analysis from './components/Analysis'
import { extractColors } from './services/api'

function App() {
  const [url, setUrl] = useState('')
  const [analysisMode, setAnalysisMode] = useState(false)
  const [colors, setColors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url) return

    try {
      setLoading(true)
      setError(null)
      const response = await extractColors({ url, theme: analysisMode ? 'dark' : 'light' })
      setColors(response.data.colors)
    } catch (err) {
      setError(err.message)
      setColors(null)
    } finally {
      setLoading(false)
    }
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
            disabled={loading}
          />
          <ThemeToggle isDark={analysisMode} onChange={setAnalysisMode} />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2 rounded-xl font-medium
              bg-white dark:bg-zinc-800 
              text-zinc-900 dark:text-white
              border border-zinc-300 dark:border-zinc-700
              hover:bg-zinc-50 dark:hover:bg-zinc-700
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300
              flex items-center gap-2"
          >
            <SwatchBook size={32} className="transform translate-y-[1px]" />
            <span className="text-2xl">{loading ? 'extracting...' : 'enjoy'}</span>
          </button>
        </form>

        {error && (
          <div className="text-red-500 dark:text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Force light mode and override with dark when needed */}
        <div className={`light ${analysisMode ? 'dark' : ''}`}>
          <Analysis colors={colors} />
        </div>
      </div>
    </main>
  )
}

export default App
