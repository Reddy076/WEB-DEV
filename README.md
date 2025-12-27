# Web Dev Docs 📚

A comprehensive, interactive **CSS & JavaScript** documentation site built with React and Docusaurus.  
Designed with an **MDN-inspired theme**, this project serves as a modern resource for developers to master web technologies.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](http://localhost:3000)
[![Built with Docusaurus](https://img.shields.io/badge/built%20with-Docusaurus-25c2a0)](https://docusaurus.io/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)

---

## ✨ Key Features

### 🔍 Powerful Search
- **Instant Local Search** - Integrated offline-capable search to quickly find any topic, property, or concept.
- **Keyboard Navigation** - seamless search experience.

### 📝 Comprehensive Documentation
- **CSS Mastery** - From `flexbox` and `grid` layouts to advanced animations and responsive design.
- **JavaScript Deep Dive** - Extensive coverage of fundamentals, DOM manipulation, async programming (`Promises`, `async/await`), and ES6+ features.
- **Interview Prep Hub** - Dedicated centralized pages for **CSS and JavaScript Interview Questions** to help you ace your next interview.

### 🎮 Enhanced Playgrounds
- **Live Code Execution** - Write HTML/CSS and JavaScript directly in the browser.
- **Resizable Layouts** - Switch between **Split**, **Code-Only**, and **Preview-Only** views.
- **Console Integration** - Real-time JavaScript console output for debugging and testing.

### 🎨 Modern UI/UX
- **MDN-Inspired Theme** - Clean, high-contrast dark mode for reduced eye strain.
- **Responsive Design** - Optimized for mobile, tablet, and desktop.
- **Consistent Navigation** - Intuitive sidebar and grid-based quick links.

---

## 📂 Documentation Topics

### 🎨 CSS
- **Core**: Syntax, Selectors, Box Model, Typography.
- **Layout**: Flexbox (Deep Dive), CSS Grid, Positioning.
- **Visuals**: Transitions, Animations, Shadows, Gradients.
- **Resources**: Centralized Interview Questions.

### ⚡ JavaScript
| Category | Topics |
|----------|--------|
| **Fundamentals** | Variables, Data Types, Operators, Logic |
| **Functions** | Arrow Functions, Closures, Callbacks, `this` |
| **Data Structures** | Array Methods (`map`, `filter`, `reduce`), Objects |
| **The DOM** | Select, Traverse, Create, and Modify Elements |
| **Async JS** | Event Loop, Promises, Async/Await, Fetch API |
| **Advanced** | ES6+ Syntax, Modules, Debugging, storage |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 18 or higher.
- **npm** or **yarn**.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Reddy076/WEB-DEV.git
   cd WEB-DEV/css-docs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The site will open automatically at [http://localhost:3000](http://localhost:3000).

### Build for Production

To create a static build for deployment:
```bash
npm run build
# Serve the build locally
npm run serve
```

---

## 📁 Project Structure

```
css-docs/
├── docs/                    # CSS Documentation & Interview Qs
├── js-docs/                 # JavaScript Documentation (Categorized)
│   ├── Fundamentals/
│   ├── AsyncJS/
│   ├── DOMManipulation/
│   └── ...
├── src/
│   ├── components/
│   │   ├── Playground/      # Resizable CSS Playground
│   │   └── JSPlayground/    # JS Playground with Console
│   ├── css/                 # Custom Global Styles & Theme Variables
│   └── pages/               # Homepage (index.js)
├── docusaurus.config.js     # Main Site Configuration (Search, Nav, Footer)
├── sidebars.js              # CSS Sidebar Definition
└── jsSidebars.js            # JavaScript Sidebar Definition
```

## 🛠️ Tech Stack

- **Framework**: [Docusaurus 3](https://docusaurus.io/)
- **UI Library**: [React 18](https://react.dev/)
- **Editor**: [CodeMirror](https://uiwjs.github.io/react-codemirror/)
- **Search**: `@easyops-cn/docusaurus-search-local`
- **Styling**: CSS Modules & Infima

## 📄 License

This project is open source and available for educational purposes.

---

Made with ❤️ by Developers, for Developers.
