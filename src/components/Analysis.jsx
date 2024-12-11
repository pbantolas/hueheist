import { Image, Palette, FileJson, FileText, Download, Check, Monitor } from 'lucide-react'
import { useState } from 'react'
import { extractColors } from '../services/api'

const Analysis = ({ colors }) => {
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [selectedFormat, setSelectedFormat] = useState('json')
  const [exportData, setExportData] = useState(null)

  if (!colors) return null

  const copyToClipboard = (color, index) => {
    navigator.clipboard.writeText(color)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleExportFormat = async (format) => {
    try {
      setSelectedFormat(format)
      const response = await extractColors({ 
        url: window.location.href, // we'll need the current URL
        format 
      })
      setExportData(response.data.content)
    } catch (error) {
      console.error('Export error:', error)
    }
  }

  // Calculate if text should be light or dark based on background color
  const getTextColor = (hexColor) => {
    // Remove # if present
    const hex = hexColor.replace('#', '')
    
    // Convert hex to RGB
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    
    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    
    // Return white for dark backgrounds, black for light backgrounds
    return brightness > 128 ? 'text-zinc-900' : 'text-white'
  }

  return (
    <div className="grid gap-8">
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        {/* Website Image */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-medium mb-4 dark:text-white flex items-center gap-2">
            <Image size={24} className="text-zinc-900 dark:text-white" />
            Website image
          </h2>
          <div className="aspect-video bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 rounded-xl flex items-center justify-center">
            <Monitor size={48} className="text-zinc-400 dark:text-zinc-500" />
          </div>
        </div>

        {/* Color Palette */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-medium mb-4 dark:text-white flex items-center gap-2">
            <Palette size={24} className="text-zinc-900 dark:text-white" />
            Palette
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {colors.map((color, index) => (
              <div
                key={index}
                onClick={() => copyToClipboard(color.hex, index)}
                className="aspect-square rounded-xl shadow-sm transition-all hover:scale-105 cursor-pointer relative group"
                style={{ backgroundColor: color.hex }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className={`font-medium ${getTextColor(color.hex)}`}>
                    {copiedIndex === index ? 'COPIED!' : 'COPY'}
                  </div>
                  <div className="absolute inset-0 bg-black/10 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Export Options */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-medium mb-4 dark:text-white flex items-center gap-2">
            <Download size={24} className="text-zinc-900 dark:text-white" />
            Export options
          </h2>
          <div className="space-y-2">
            <button 
              onClick={() => handleExportFormat('css')}
              className={`w-full px-4 py-2 rounded-lg ${
                selectedFormat === 'css' 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600'
              } transition-colors text-left flex items-center gap-2`}
            >
              <FileText size={18} />
              CSS
            </button>
            <button 
              onClick={() => handleExportFormat('json')}
              className={`w-full px-4 py-2 rounded-lg ${
                selectedFormat === 'json' 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600'
              } transition-colors text-left flex items-center gap-2`}
            >
              <FileJson size={18} />
              JSON
            </button>
            <button 
              onClick={() => handleExportFormat('png')}
              className={`w-full px-4 py-2 rounded-lg ${
                selectedFormat === 'png' 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600'
              } transition-colors text-left flex items-center gap-2`}
            >
              <Image size={18} />
              PNG (base64)
            </button>
          </div>
        </div>

        {/* Export Code */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-medium mb-4 dark:text-white flex items-center gap-2">
            <FileJson size={24} className="text-zinc-900 dark:text-white" />
            Export code
          </h2>
          <pre className="p-4 bg-zinc-100 dark:bg-zinc-700 rounded-lg overflow-x-auto text-md dark:text-white">
            {exportData || JSON.stringify(colors, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default Analysis
