# Andra Wicaksono Portfolio Website

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- 🌓 Dark/Light mode
- 🎨 Modern UI with Tailwind CSS
- 🔄 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🎯 SEO optimized
- ⚡ Fast performance
- 🧩 Modular component architecture

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM

## Prerequisites

- Node.js v18+
- npm v9+

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/andrawicaksono/personal-profile.git
cd personal-profile
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Building for Production

1. Build the application

```bash
npm run build
```

2. Preview the production build

```bash
npm run preview
```

## Deployment

This site can be deployed to any static hosting platform:

- Vercel (Recommended)
- Netlify
- GitHub Pages
- Any static hosting provider

### Deploying to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Project Structure

```
src/
├─ assets/           # Static assets (images, fonts, etc.)
├─ components/       # Reusable React components
├─ pages/           # Page components
├─ data/           # JSON data files
├─ router/         # React Router configuration
├─ types/          # TypeScript type definitions
├─ App.tsx         # Root component
└─ main.tsx        # Entry point
```

## Customization

### Styling

- Edit `tailwind.config.js` to customize theme
- Modify component styles in their respective files

### Content

- Update data in `src/data/` directory
- Modify text content in components
- Replace images in `src/assets/`

### Adding New Sections

1. Create new component in `src/components/`
2. Add component to `src/pages/Home.tsx`
3. Update navigation if needed

## Performance Optimization

- Images are lazy loaded
- Components use React.lazy() for code splitting
- Tailwind's JIT mode for minimal CSS
- Vite's build optimization

## SEO

- Meta tags in `index.html`
- Open Graph tags for social sharing
- Semantic HTML structure
- Sitemap included

## License

MIT © Andra Wicaksono
