# Copilot Instructions for CSE-335 Final Project

## Project Overview
This is a Vite-based React application using React 19.2.4 and Vite 8.0.1. It's a single-page application with hot module replacement (HMR) for development.

## Architecture
- **Entry Point**: `index.html` loads `/src/main.jsx`, which renders `<App />` into `#root`.
- **Component Structure**: Main component in `src/App.jsx`. Add new components to `src/` directory.
- **Assets**: Static assets in `public/`, imported assets in `src/assets/`.
- **Styling**: Global styles in `src/index.css` with CSS custom properties (variables) for theming.

## Development Workflow
- **Start Dev Server**: `npm run dev` (Vite with HMR)
- **Build for Production**: `npm run build` (outputs to `dist/`)
- **Preview Build**: `npm run preview`
- **Linting**: `npm run lint` (ESLint with React hooks and refresh rules)

## Key Patterns
- **JSX**: Use `.jsx` for components with JSX.
- **Imports**: ES modules, import React hooks from 'react'.
- **Styling**: Use CSS classes and custom properties from `:root` in `index.css` (e.g., `--accent`, `--bg`).
- **ESLint Rules**: Unused vars ignored if starting with uppercase (for React components). Enforces React hooks rules.

## File Structure Examples
- Add components: `src/MyComponent.jsx`
- Add styles: `src/MyComponent.css` (import in component)
- Update app: Import and use in `src/App.jsx`

## Dependencies
- React 19 (latest) with `createRoot` API
- Vite for build tooling
- ESLint for code quality

Focus on building features in `src/App.jsx` initially, then refactor into separate components as needed.