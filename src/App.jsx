import { useState } from 'react'
import { SearchCode } from 'lucide-react'
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
    <main className="bg-white dark:bg-zinc-900 p-8 min-h-screen transition-colors duration-300">
      <div className="space-y-8 mx-auto max-w-6xl">
        <h1 className='my-4 font-black text-4xl'>HueHeist</h1>
        {/* URL Input Section */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
            className="flex-1 border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 px-4 py-2 border rounded-xl dark:text-white"
            required
            disabled={loading}
          />
          <ThemeToggle isDark={analysisMode} onChange={setAnalysisMode} />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 border-zinc-300 dark:border-zinc-700 bg-white hover:bg-zinc-50 dark:hover:bg-zinc-700 dark:bg-zinc-800 disabled:opacity-50 px-8 py-2 border rounded-xl font-medium text-zinc-900 dark:text-white transition-all duration-300 disabled:cursor-not-allowed"
          >
            <SearchCode size={24} className="transform translate-y-[1px]" />
            <span className="text-2xl">{loading ? 'extracting...' : 'heist'}</span>
          </button>
        </form>

        {error && (
          <div className="text-center text-red-500 dark:text-red-400">
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
