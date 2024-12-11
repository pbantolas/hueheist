# Color Extractor UI Tech Stack

## Core Dependencies

- **React** v18.3.1
- **React DOM** v18.3.1
- **Lucide React** v0.468.0 (Icon library)

## Build Tools & Development Dependencies

- **Vite** v6.0.1 (Build tool and dev server)
- **Tailwind CSS** v3.4.16 (Utility-first CSS framework)
- **PostCSS** v8.4.49 (CSS transformer)
- **Autoprefixer** v10.4.20 (PostCSS plugin)

## Code Quality Tools

- **ESLint** v9.15.0
  - eslint-plugin-react v7.37.2
  - eslint-plugin-react-hooks v5.0.0
  - eslint-plugin-react-refresh v0.4.14

## Type Definitions

- **@types/react** v18.3.12
- **@types/react-dom** v18.3.1

## Project Structure
```
src/
├── components/
│   ├── Analysis.jsx    # Color analysis display
│   └── ThemeToggle.jsx # Theme switching component
├── context/
│   └── ThemeContext.jsx # Theme management
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
```
