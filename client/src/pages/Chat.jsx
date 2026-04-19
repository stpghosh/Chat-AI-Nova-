import React, { useState, useEffect } from 'react'
import { FiMenu, FiCpu, FiMoreVertical, FiSettings, FiHome, FiImage, FiSend, FiCopy, FiCheck, FiZap, FiMessageCircle, FiCode, FiBookOpen, FiActivity, FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

// ============================================================
// Responsive Hook
// ============================================================
const useWindowWidth = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return width
}

// ============================================================
// Animated Background Component (Stable Lighting)
// ============================================================
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-violet-600/15 rounded-full blur-[100px] sm:blur-[120px]" />
    <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-purple-600/15 rounded-full blur-[80px] sm:blur-[100px]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-fuchsia-600/8 rounded-full blur-[100px] sm:blur-[150px]" />
  </div>
)

// ============================================================
// Message Content Component
// ============================================================
const MessageContent = ({ text }) => {
  const [copiedIndex, setCopiedIndex] = useState(null)
  const windowWidth = useWindowWidth()
  const isMobile = windowWidth < 640
  const isTablet = windowWidth >= 640 && windowWidth < 1024

  const copyToClipboard = (content, index) => {
    navigator.clipboard.writeText(content)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)```/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) })
    }
    parts.push({ type: 'code', language: match[1] || 'javascript', content: match[2].trim() })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) })
  }

  return (
    <div className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
      {parts.map((part, i) => {
        if (part.type === 'code') {
          return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`my-2 sm:my-3 lg:my-4 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-xl sm:shadow-2xl shadow-black/30 ${isMobile ? 'mx-1' : ''}`}
            >
              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} ${isMobile ? 'items-start' : 'items-center'} justify-between gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/5`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-bold text-violet-400 uppercase tracking-wider bg-violet-500/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md`}>{part.language}</span>
                  <div className="flex gap-1.5 sm:hidden">
                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <div className="w-2 h-2 rounded-full bg-green-500/60" />
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(part.content, i)}
                  className={`${isMobile ? 'text-[10px]' : 'text-xs'} px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center gap-1.5 sm:gap-2 transition-all duration-200 ${isMobile ? 'self-end' : ''}`}
                >
                  {copiedIndex === i ? (
                    <><FiCheck className={`${isMobile ? 'w-2.5' : 'w-3'} h-2.5`} /> <span className="text-emerald-400 hidden sm:inline">{isMobile ? '✓' : 'Copied!'}</span></>
                  ) : (
                    <><FiCopy className={`${isMobile ? 'w-2.5' : 'w-3'} h-2.5`} /> <span className="hidden sm:inline">{isMobile ? '' : 'Copy'}</span></>
                  )}
                </button>
              </div>
              <div className={`overflow-x-auto rounded-b-xl sm:rounded-b-2xl ${isMobile ? 'max-w-[calc(100vw-80px)]' : ''}`}>
                <SyntaxHighlighter
                  language={part.language}
                  style={oneDark}
                  showLineNumbers={!isMobile}
                  customStyle={{
                    margin: 0,
                    padding: isMobile ? '10px' : isTablet ? '14px' : '20px',
                    background: 'linear-gradient(180deg, #1a1a2e 0%, #16162a 100%)',
                    fontSize: isMobile ? '11px' : isTablet ? '12px' : '13.5px',
                    lineHeight: '1.6',
                    maxWidth: isMobile ? '280px' : isTablet ? '400px' : '100%',
                  }}
                  lineNumberStyle={{ color: '#3f3f5a', paddingRight: '10px', minWidth: '1.8em', fontSize: isMobile ? '10px' : '11px' }}
                >
                  {part.content}
                </SyntaxHighlighter>
              </div>
            </motion.div>
          )
        }
        return <span key={i} className="text-gray-200 leading-6 sm:leading-7">{part.content}</span>
      })}
    </div>
  )
}

// ============================================================
// Chat Component
// ============================================================
const Chat = () => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const messagesEndRef = React.useRef(null)
  const textareaRef = React.useRef(null)
  const menuRef = React.useRef(null)

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [inputText])

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const sendMessage = async () => {
    if (!inputText?.trim()) return
    const userMessage = { id: Date.now(), text: inputText, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputText })
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: data?.reply || 'Sorry, I could not generate a response.', sender: 'ai' }])
        setIsTyping(false)
      }, 800)
    } catch (err) {
      setIsTyping(false)
      setMessages(prev => [...prev, { id: Date.now() + 1, text: 'Error. Try again.', sender: 'ai' }])
    }
  }

  const handleSend = () => sendMessage()
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  const handleNewChat = () => {
    setMessages([])
    setSidebarOpen(false)
  }

  const menuItems = [
    { icon: FiHome, label: 'Home', path: '/' },
    { icon: FiImage, label: 'Gallery', path: '/community' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
  ]

  const quickActions = [
    { icon: FiCode, label: 'Write code', description: 'Generate code' },
    { icon: FiBookOpen, label: 'Explain concept', description: 'Break down topics' },
    { icon: FiMessageCircle, label: 'Help writing', description: 'Draft content' },
    { icon: FiActivity, label: 'Get ideas', description: 'Brainstorm' },
  ]

  return (
    <div className="flex h-screen-dvh bg-slate-950 relative overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed lg:relative left-0 top-0 bottom-0 w-72 sm:w-80 bg-slate-900/95 backdrop-blur-xl border-r border-white/5 z-50 flex flex-col"
          >
            <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNewChat} 
                className="flex-1 py-3 sm:py-3.5 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-xl font-medium shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-all text-sm sm:text-base"
              >
                + New Chat
              </motion.button>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden ml-3 p-2 rounded-lg text-gray-400 hover:text-white"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-4">
              <div className="text-gray-500 text-sm flex flex-col items-center justify-center h-32 sm:h-40">
                <FiMessageCircle className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 text-gray-600" />
                <p>No recent chats</p>
              </div>
            </div>
            <div className="p-4 border-t border-white/5">
              <div className="glass rounded-xl p-3 sm:p-4">
                <p className="text-xs text-gray-400 mb-1">AI Nova</p>
                <p className="text-xs text-gray-500">Version 1.0.0</p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col w-full relative" onClick={() => sidebarOpen && setSidebarOpen(false)}>
        {/* Header */}
        <motion.header 
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="h-14 sm:h-16 glass border-b border-white/5 flex items-center justify-between px-3 sm:px-4 lg:px-6"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-2 sm:p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <FiMenu className="w-5 h-5" />
            </motion.button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-600/30">
                <FiCpu className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-white font-semibold text-base sm:text-lg hidden xs:block sm:block">AI Nova</span>
            </div>
          </div>
          <div className="relative" ref={menuRef}>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)} 
              className="p-2 sm:p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <FiMoreVertical className="w-5 h-5" />
            </motion.button>
            {menuOpen && user && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute right-0 top-full mt-2 sm:mt-3 w-44 sm:w-48 glass rounded-2xl border border-white/10 py-2 z-50 shadow-2xl shadow-black/30"
              >
                {menuItems.map((item, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => { navigate(item.path); setMenuOpen(false) }} 
                    className="w-full flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 text-gray-300 hover:bg-white/10 hover:text-white text-sm transition-colors"
                  >
                    <item.icon className="w-4 h-4" /> {item.label}
                  </motion.button>
                ))}
                <div className="border-t border-white/10 my-1" />
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.05 }}
                  onClick={() => { logout(); setMenuOpen(false); navigate('/') }} 
                  className="w-full flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 text-red-400 hover:bg-white/10 text-sm transition-colors"
                >
                  <FiLogIn className="w-4 h-4 rotate-180" /> Sign Out
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto relative">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-3 sm:px-4 relative">
              <AnimatedBackground />
              <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex flex-col items-center max-w-md"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mb-4 sm:mb-5 lg:mb-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center shadow-2xl shadow-violet-600/40"
                >
                  <FiCpu className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" />
                  <div className="absolute -inset-1.5 sm:-inset-2 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-40 blur-xl" />
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/20 to-transparent" />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3"
                >
                  How can I help today?
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-400 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 px-2"
                >
                  Write code, answer questions, explain concepts.
                </motion.p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full max-w-lg sm:max-w-xl lg:max-w-2xl px-2 sm:px-4 relative z-10"
              >
                {quickActions.map((action, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setInputText(action.label)}
                    className="p-3 sm:p-4 lg:p-5 text-left glass rounded-xl sm:rounded-2xl border border-white/5 hover:border-white/10 transition-all group"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-violet-600/20 to-purple-600/20 flex items-center justify-center group-hover:from-violet-600/30 group-hover:to-purple-600/30 transition-all flex-shrink-0">
                        <action.icon className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-medium text-sm sm:text-base mb-0.5 truncate">{action.label}</p>
                        <p className="text-gray-500 text-xs sm:text-sm truncate">{action.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="max-w-2xl sm:max-w-3xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {message.sender === 'user' ? (
                      <div className="flex justify-end">
                        <div className="max-w-[80%] sm:max-w-[85%] lg:max-w-lg">
                          <motion.div 
                            whileHover={{ scale: 1.01 }}
                            className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl rounded-tr-sm shadow-lg shadow-violet-600/20"
                          >
                            <p className="text-sm sm:text-base leading-relaxed break-words">{message.text}</p>
                          </motion.div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-start">
                        <div className="flex items-start gap-2 sm:gap-3 lg:gap-4 max-w-[85%] sm:max-w-[90%] lg:max-w-lg">
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-600/30 mt-0.5 sm:mt-1"
                          >
                            <FiCpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                          </motion.div>
                          <motion.div 
                            whileHover={{ scale: 1.01 }}
                            className="glass px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl rounded-tl-sm border border-white/5 shadow-xl"
                          >
                            <MessageContent text={message.text} />
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg">
                    <FiCpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="flex gap-1.5 px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg sm:rounded-xl border border-white/5">
                    {[0, 1, 2].map(i => (
                      <motion.div 
                        key={i} 
                        className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-violet-400 rounded-full"
                        animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </main>

        {/* Input Area */}
        <motion.div 
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-3 sm:p-4 lg:p-5 border-t border-white/5"
        >
          <div className="max-w-2xl sm:max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 sm:gap-3 glass rounded-xl sm:rounded-2xl p-2 sm:p-2.5 lg:p-3 border border-white/5 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 via-purple-600/5 to-fuchsia-600/5 rounded-xl sm:rounded-2xl pointer-events-none" />
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none resize-none text-sm sm:text-base min-h-[24px] sm:min-h-[28px] max-h-[100px] sm:max-h-[120px] relative z-10 py-1.5 sm:py-2"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!inputText.trim() || isTyping}
                className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 transition-all relative z-10"
              >
                <FiSend className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 sm:mt-3">
              <FiZap className="w-3 h-3 text-gray-600" />
              <p className="text-xs text-gray-600">AI can make mistakes.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Chat   