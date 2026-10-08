# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Notes App

  A desktop sticky-notes board built with React, TypeScript, Vite, and Tailwind CSS.
  Notes can be placed at a chosen point and size, moved, resized, edited, and saved
  in the browser's local storage.

  ## Run locally

  ```sh
  npm install
  npm run dev
  ```

  Vite prints the local URL after the development server starts.

  ## Build

  ```sh
  npm run build
  npm run preview
  ```

  The production bundle is written to `dist/`. `npm run preview` serves that bundle
  locally for a final check.

  ## Use the board

  - Choose S, M, or L, select **Place a note**, then click the board to position it.
  - Drag a note by its top handle. Use arrow keys to nudge a focused handle; hold
    Shift for larger steps.
  - Drag the lower-right corner to resize. Edit text directly and use the x button
    to remove a note.
  - Notes are saved automatically in this browser on this device.

