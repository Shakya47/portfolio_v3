# Developer Portfolio Website 🌐

A clean, high-performance portfolio built with **Astro**, **React**, and **TypeScript**.

---

## ⚙️ Content Architecture (`src/data/portfolio.ts`)

All content (profile information, skills, projects, contributions, and contact details) is centralized inside **`src/data/portfolio.ts`**. 

Updating, adding, or removing items does not require editing HTML or page template structures. You only need to modify the data arrays inside this single configuration file.

---

## 🚀 Project Structure

```text
/
├── src/
│   ├── data/
│   │   └── portfolio.ts    # Centralized type-safe content and experience data
│   ├── components/
│   │   └── ...             # Interactive React components (Theme Toggle, filters)
│   ├── layouts/
│   │   └── Layout.astro    # Base HTML document wrap & SEO meta tags
│   └── pages/
│       ├── index.astro     # Landing page aggregation
│       └── work/
│           └── ...         # Dedicated project case study pages
```

---

## 🧞 Commands

Run commands from the project root using npm:

| Command | Action |
| :--- | :--- |
| `npm install` | Installs project dependencies |
| `npm run dev` | Starts local development server at `localhost:4321` |
| `npm run build` | Compiles the production-ready static site to `/dist` |
| `npm run preview` | Runs a preview server for the compiled static build |
