import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [url, setUrl] = useState('')
  const [isDark, setIsDark] = useState(false)
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
    <main className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-white'} transition-colors duration-300 p-8`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* URL Input Section */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            required
          />
          <ThemeToggle isDark={isDark} onChange={setIsDark} />
          <button
            type="submit"
            className="px-8 py-2 rounded-xl font-bold text-white 
              bg-gradient-to-r from-blue-500 to-blue-600 
              hover:from-blue-600 hover:to-blue-700
              shadow-[0_0_15px_rgba(59,130,246,0.5)]
              hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]
              ring-1 ring-blue-400
              transition-all duration-300
              transform hover:scale-105
              flex items-center gap-2"
          >
            GO <ArrowRight size={18} className="transform translate-y-[1px]" />
          </button>
        </form>

        {colors && (
          <div className="grid gap-8">
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
              {/* Website Image */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-medium mb-4 dark:text-white">Website image</h2>
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl"></div>
              </div>

              {/* Color Palette */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm lg:col-span-2">
                <h2 className="text-xl font-medium mb-4 dark:text-white">Palette</h2>
                <div className="grid grid-cols-4 gap-4">
                  {colors.palette.map((color, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-xl shadow-sm transition-transform hover:scale-105 cursor-pointer"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Export Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Export Options */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-medium mb-4 dark:text-white">Export options</h2>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-left">
                    CSS
                  </button>
                  <button className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-left">
                    JSON
                  </button>
                  <button className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-left">
                    PNG (base64)
                  </button>
                </div>
              </div>

              {/* Export Code */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm lg:col-span-2">
                <h2 className="text-xl font-medium mb-4 dark:text-white">Export code</h2>
                <pre className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto text-sm dark:text-white">
                  {JSON.stringify(colors, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default App
