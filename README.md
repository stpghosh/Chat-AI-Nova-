# AI Nova Chat

A modern AI chatbot web application with a clean, futuristic, and minimal UI inspired by Nova AI and ChatGPT.

## Features

- 💬 Clean chat-based interface
- 🌙 Dark mode with gradient backgrounds
- ✨ Smooth animations and typing indicators
- 📱 Mobile-first responsive design
- 💾 Chat history (temporary state)
- 🔥 Glassmorphism effects

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express.js

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Install all dependencies:
```bash
npm install
cd client && npm install
cd ../server && npm install
```

2. Start the development servers:
```bash
npm run dev
```

This will start:
- Frontend at http://localhost:3000
- Backend at http://localhost:5000

### Running separately

**Start Backend:**
```bash
cd server && npm run dev
```

**Start Frontend:**
```bash
cd client && npm run dev
```

## Project Structure

```
ai-nova-chat/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   └── TypingIndicator.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
├── server/          # Node backend
│   ├── routes/
│   │   └── chat.js
│   ├── controllers/
│   │   └── chatController.js
│   ├── server.js
│   └── package.json
├── package.json
└── README.md
```

## License

MIT
