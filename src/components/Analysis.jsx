import { Image, Palette, FileJson, FileText, Download } from 'lucide-react'

const Analysis = ({ colors }) => {
  if (!colors) return null

  return (
    <div className="grid gap-8">
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        {/* Website Image */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-medium mb-4 dark:text-white flex items-center gap-2">
            <Image size={24} className="text-zinc-900 dark:text-white" />
            Website image
          </h2>
          <div className="aspect-video bg-zinc-100 dark:bg-zinc-700 rounded-xl"></div>
        </div>

        {/* Color Palette */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-medium mb-4 dark:text-white flex items-center gap-2">
            <Palette size={24} className="text-zinc-900 dark:text-white" />
            Palette
          </h2>
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
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-medium mb-4 dark:text-white flex items-center gap-2">
            <Download size={24} className="text-zinc-900 dark:text-white" />
            Export options
          </h2>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors text-left flex items-center gap-2">
              <FileText size={18} />
              CSS
            </button>
            <button className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors text-left flex items-center gap-2">
              <FileJson size={18} />
              JSON
            </button>
            <button className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors text-left flex items-center gap-2">
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
          <pre className="p-4 bg-zinc-100 dark:bg-zinc-700 rounded-lg overflow-x-auto text-sm dark:text-white">
            {JSON.stringify(colors, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default Analysis
