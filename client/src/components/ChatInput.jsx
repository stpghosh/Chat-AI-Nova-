import React, { useState, useRef, useEffect } from 'react'
import { FiSend } from 'react-icons/fi'

const ChatInput = ({ onSendMessage, disabled }) => {
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = () => {
    if (!text.trim() || disabled) return
    onSendMessage(text)
    setText('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-4 md:p-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-3 glass-dark rounded-2xl p-3">
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            disabled={disabled}
            rows={1}
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none resize-none max-h-32 scrollbar-thin"
            style={{ minHeight: '24px', maxHeight: '128px' }}
          />
          <button
            onClick={handleSend}
            disabled={!text.trim() || disabled}
            className={`p-3 rounded-xl transition-all duration-300 ${
              text.trim() && !disabled
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]'
                : 'bg-white/10 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FiSend className="text-lg" />
          </button>
        </div>
        <p className="text-center text-xs text-gray-600 mt-2">
          AI can make mistakes. Please verify important information.
        </p>
      </div>
    </div>
  )
}

export default ChatInput
