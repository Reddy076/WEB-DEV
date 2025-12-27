# Web Dev Docs 📚

A comprehensive, interactive **CSS & JavaScript** documentation site built with React and Docusaurus.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](http://localhost:3000)
[![Built with Docusaurus](https://img.shields.io/badge/built%20with-Docusaurus-blue)](https://docusaurus.io/)

## ✨ Features

### 📝 Documentation
- **CSS Documentation** - Complete guide from syntax basics to advanced layouts (Flexbox, Grid)
- **JavaScript Documentation** - 27+ pages covering fundamentals to async programming

### 🎮 Interactive Playgrounds
- **CSS Playground** - Live HTML/CSS editor with instant preview
- **JavaScript Playground** - Runnable JS code with console output
  - Supports `setTimeout`, `setInterval`, Promises, and `async/await`
  - Real-time console output updates

### 🎨 User Experience
- **Dark/Light Mode** - Toggle-able theme with full support
- **Mobile Responsive** - Works on all device sizes
- **Interview Questions** - Included in every section for preparation

## 📂 Documentation Topics

### CSS
- Syntax & Selectors
- Box Model & Units
- Typography & Colors
- Flexbox & Grid
- Responsive Design
- Animations & Transitions
- And more...

### JavaScript
| Category | Topics |
|----------|--------|
| **Getting Started** | What is JS, Fundamentals, Frameworks |
| **Variables & Data Types** | var/let/const, Data Types, Operators |
| **Control Flow** | if-else, switch, Loops |
| **Objects & Functions** | Objects, this, Functions, Arrow Functions, Callbacks, Closures, IIFE |
| **Array Methods** | forEach, map, filter, reduce |
| **DOM Manipulation** | Selecting, Modifying, Traversing, Creating/Removing |
| **Events** | Event Listeners, Bubbling, Delegation |
| **Async JavaScript** | Callbacks, Promises, async/await, Fetch API, JSON |
| **ES6+ Features** | Destructuring, Spread, Rest, Modules |
| **Debugging** | Console methods, Error handling |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Reddy076/CSS.git

# Navigate to the docs directory
cd CSS/css-docs

# Install dependencies
npm install

# Start development server
npm start
```

Opens [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
css-docs/
├── docs/                    # CSS documentation (MDX files)
├── js-docs/                 # JavaScript documentation (MDX files)
│   ├── Fundamentals/
│   ├── VariablesDataTypes/
│   ├── ControlFlow/
│   ├── ObjectsFunctions/
│   ├── ArrayMethods/
│   ├── DOMManipulation/
│   ├── Events/
│   ├── AsyncJS/
│   ├── ES6Features/
│   └── Debugging/
├── src/
│   ├── components/
│   │   ├── Playground/      # CSS interactive playground
│   │   └── JSPlayground/    # JavaScript interactive playground
│   └── css/                 # Custom styles
├── docusaurus.config.js     # Site configuration
├── sidebars.js              # CSS sidebar config
└── jsSidebars.js            # JavaScript sidebar config
```

## 🛠️ Technologies Used

- **Docusaurus 3** - Documentation framework
- **React 18** - UI components
- **CodeMirror** - Code editor for playgrounds
- **MDX** - Markdown with JSX support

## 📄 License

This project is open source and available for educational purposes.

---

Made with ❤️ for learning web development
