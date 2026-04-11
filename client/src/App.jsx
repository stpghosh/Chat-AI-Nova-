import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiZap, FiMessageSquare, FiImage, FiUsers, FiHome, FiCreditCard } from 'react-icons/fi'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

import Landing from './pages/Landing'
import Subscribe from './pages/Subscribe'
import Chat from './pages/Chat'
import Community from './pages/Community'
import ImageGenerator from './pages/ImageGenerator'

const MobileNav = ({ isOpen, onClose }) => {
  const navItems = [
    { path: '/', icon: FiHome, label: 'Home' },
    { path: '/subscribe', icon: FiCreditCard, label: 'Pricing' },
    { path: '/chat', icon: FiMessageSquare, label: 'Chat' },
    { path: '/image', icon: FiImage, label: 'Generate' },
    { path: '/community', icon: FiUsers, label: 'Gallery' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-64 sm:w-80 lg:w-72 bg-slate-900 border-r border-white/10 z-50 lg:hidden flex flex-col"
          >
            <div className="p-4 flex items-center justify-between border-b border-white/10 bg-slate-900">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiZap className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-white font-bold text-sm">AI Nova</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-400 hover:text-white active:scale-90"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors active:bg-white/20"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const DesktopNav = () => (
  <nav className="hidden lg:flex items-center gap-2">
    {[
      { path: '/', label: 'Home' },
      { path: '/subscribe', label: 'Pricing' },
      { path: '/chat', label: 'Chat' },
      { path: '/image', label: 'Generate' },
      { path: '/community', label: 'Gallery' },
    ].map((item) => (
      <motion.div
        key={item.path}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          to={item.path}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 text-sm lg:text-base"
        >
          {item.label}
        </Link>
      </motion.div>
    ))}
  </nav>
)

function AnimatedRoutes() {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <Routes location={location}>
        <Route path="/" element={<Landing />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/community" element={<Community />} />
        <Route path="/image" element={<ImageGenerator />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/community" element={<Community />} />
          <Route path="/image" element={<ImageGenerator />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950">
        <MobileNav 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />
        
        <motion.header 
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-30 glass border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <motion.button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-lg text-gray-400 hover:text-white"
                whileTap={{ scale: 0.9 }}
              >
                <FiMenu className="w-6 h-6" />
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/" className="flex items-center gap-2">
                  <motion.div 
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center"
                  >
                    <FiZap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.div>
                  <span className="text-white font-bold text-sm sm:text-base lg:text-lg">AI Nova</span>
                </Link>
              </motion.div>
              
              <div className="flex items-center gap-3">
                <DesktopNav />
              </div>

              <motion.div whileTap={{ scale: 0.9 }}>
                <Link
                  to="/chat"
                  className="lg:hidden p-2 -mr-2 rounded-lg text-gray-400 hover:text-white"
                >
                  <FiMessageSquare className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App