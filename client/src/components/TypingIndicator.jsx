import React from 'react'

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="glass-dark px-5 py-4 rounded-2xl rounded-tl-md">
        <div className="flex gap-2">
          <div className="typing-dot w-2.5 h-2.5 rounded-full bg-gray-400"></div>
          <div className="typing-dot w-2.5 h-2.5 rounded-full bg-gray-400"></div>
          <div className="typing-dot w-2.5 h-2.5 rounded-full bg-gray-400"></div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
