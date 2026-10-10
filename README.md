# Notes App

Notes App is a browser-based sticky-notes board for capturing and arranging ideas. Users can place notes on the board, move and resize them, edit their text, and remove them. Notes are saved automatically in the browser's local storage, so they remain available on the same device and browser.

## Features

- Place notes at a chosen position on the board.
- Move notes by dragging their handle or using the keyboard.
- Resize notes and edit their text directly.
- Delete notes from the board.
- Automatically save and restore notes using browser local storage.

## Technology

- React and TypeScript
- Vite for development and production builds
- Tailwind CSS and component-specific CSS
- Jest and React Testing Library for automated tests

## Run locally

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Vite prints the local URL after the server starts.

## Build and verify

```sh
npm run build
npm run lint
npm test
```

The production bundle is written to `dist/`. To serve that bundle locally:

```sh
npm run preview
```

## Project architecture

The application uses a feature-oriented structure to keep related functionality together and make the codebase easier to navigate. Most board behavior lives under `src/features/notes`, while reusable application elements and cross-cutting concerns have their own locations.

The design applies clean-architecture principles in a lightweight way rather than implementing a strict set of Clean Architecture layers:

1. **Feature-based organization:** The notes feature contains the board, note cards, interaction logic, and feature styles. For example, changes to note placement or resizing can generally be made within `src/features/notes`.
2. **Separation of concerns:** `App.tsx` composes the main UI and coordinates note state and persistence. `NotesBoard` and `NoteCard` render the interface; `useNotesBoardInteractions` handles board interactions; and `loadNotes` / `saveNotes` isolate browser storage access.
3. **Shared types and configuration:** The `Note` type defines the shape of note data. Storage keys and available note colors are centralized in `src/const/notesConst.ts`, while starter content is defined separately in `src/data/storage.ts`.
4. **Explicit boundaries:** Persistence is accessed through service functions instead of being mixed into board components. This makes storage behavior easier to test and leaves room to replace or extend the persistence mechanism later.
5. **Focused automated tests:** Jest and React Testing Library tests cover board and shared UI behavior, as well as loading and saving notes. These tests help detect regressions and verify expected functionality; they complement, rather than replace, manual and product-level validation.
6. **Typed component contracts:** TypeScript types describe note data and component props, helping catch mismatches as features evolve.

### Source layout

```text
src/
├── App.tsx                   # App composition, note state, and autosave
├── features/
│   └── notes/                # Board, note card, interactions, styles, and tests
├── shared/
│   ├── footer/               # Shared footer component and tests
│   └── header/               # Shared header component and tests
├── services/                 # Local-storage load/save operations and tests
├── const/                    # Shared note-related constants
├── data/                     # Starter note data
├── types/                    # Shared TypeScript types
└── test/                     # Jest setup and asset/style mocks
```

## Design notes

- **Local-first persistence:** Notes are stored in the current browser's local storage; the application does not require a server for the board's core functionality.
- **Resilient loading:** Stored data is parsed and checked before it is used. If storage is empty, malformed, or unavailable, the board can fall back to its starter notes.
- **Interaction accessibility:** Board controls and note movement support keyboard interaction in addition to pointer-based actions.
- **Maintainable styling:** Shared application styles live in `src/index.css`; notes-board-specific styles live alongside the notes feature, and Tailwind CSS is available for utility styling.
