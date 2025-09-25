# Dynamic Dashboard Assignment

This is a small React + Vite project implementing a dynamic dashboard where categories contain widgets. Users can add/remove widgets per category, create new widgets, and search the master widget list.

Features implemented:
- JSON-style initial state lives in `src/store/widgetsSlice.js` (categories + allWidgets)
- Add/remove widgets from categories
- Modal panel to select available widgets or create a new widget and add it
- Master "All Widgets" panel with search and quick-add to categories
- Redux Toolkit used as local store

Run locally (Windows):

1. Open a terminal in `c:\Users\shiva\Downloads\dashboard_frontend\frontend`
2. Install dependencies:

```bash
npm install
```

3. Start dev server:

```bash
npm run dev
```

Open the printed localhost URL in the browser.

Notes:
- This is intentionally minimal and focused on the assignment features. Styles are simple and responsive enough for demo.
- To package for submission, zip the `frontend` folder or push to GitHub.
