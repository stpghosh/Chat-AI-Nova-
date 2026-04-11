import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  FiMessageSquare, FiPlus, FiImage, FiUsers, FiAward, 
  FiSettings, FiLogOut, FiUser, FiZap, FiMenu, FiDatabase
} from 'react-icons/fi'

const menuItems = [
  { icon: FiMessageSquare, label: 'New Chat', path: '/chat' },
  { icon: FiDatabase, label: 'Excel Manager', path: '/excel' },
  { icon: FiImage, label: 'Image Generator', path: '/image' },
  { icon: FiUsers, label: 'Community', path: '/community' },
  { icon: FiAward, label: 'Credits', path: '/credits' },
  { icon: FiSettings, label: 'Settings', path: '/settings' },
]

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation()

  return (
    <>
      {isOpen && (
        <aside className="w-64 h-screen glass-dark flex flex-col border-r border-white/5 fixed left-0 top-0 z-40">
          <div className="p-4 border-b border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center neon-glow">
                <FiZap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">AI Nova</h1>
                <p className="text-gray-500 text-xs">Build with AI</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-3">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-white border border-white/10' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 mb-3 p-3 rounded-xl bg-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <FiUser className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">John Doe</p>
                <p className="text-gray-500 text-xs">Free Plan</p>
              </div>
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200">
              <FiLogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>
      )}
    </>
  )
}

export default Sidebar
