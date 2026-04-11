import React from 'react'
import { FiMenu, FiCpu } from 'react-icons/fi'

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="h-16 glass-dark flex items-center justify-between px-4 md:px-6 border-b border-white/5">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
        >
          <FiMenu className="text-xl" />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center md:hidden">
            <FiCpu className="text-white text-sm" />
          </div>
          <span className="text-white font-semibold hidden md:block">AI Nova Chat</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass text-sm text-gray-400">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>Online</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
