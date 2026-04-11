import React from 'react'
import { Link } from 'react-router-dom'
import { FiZap, FiMessageSquare, FiImage, FiUsers, FiArrowRight, FiCheck } from 'react-icons/fi'
import { motion, useReducedMotion } from 'framer-motion'

const FeatureCard = ({ icon: Icon, title, desc, path, delay }) => {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: shouldReduceMotion ? 0 : delay, duration: shouldReduceMotion ? 0.1 : 0.3 }}
      whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link 
        to={path} 
        className="group block p-5 sm:p-6 rounded-2xl glass-card transition-all duration-300 active:scale-[0.98]"
      >
        <motion.div 
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 flex items-center justify-center mb-4"
          whileHover={{ scale: 1.08, rotate: 3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-violet-400" />
        </motion.div>
        <h3 className="text-white font-semibold text-base sm:text-lg mb-2 group-hover:text-violet-300 transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm">{desc}</p>
        <motion.div 
          className="mt-4 flex items-center gap-1 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <span className="text-xs font-medium">Learn more</span>
          <FiArrowRight className="w-3 h-3" />
        </motion.div>
      </Link>
    </motion.div>
  )
}

const HeroBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <motion.div 
      className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px]"
      animate={{ x: [-50, 50, -50], y: [-30, 30, -30] }}
      transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
    />
    <motion.div 
      className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/15 rounded-full blur-[100px]"
      animate={{ x: [30, -30, 30], y: [20, -20, 20] }}
      transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut', delay: 2 }}
    />
    <motion.div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px]"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
    />
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OS0xOCAxOC0xOCBzOC4wNTkgMTggMTggMTggMTgtOC4wNTkgMTgtMTgtOC4wNTktMTgtMTggLTE4IDhDMTcgMjYuMDE1IDEwLjk0NCAxOCAxOCAxOHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
  </div>
)

const Landing = () => {
  const shouldReduceMotion = useReducedMotion()

  const features = [
    { icon: FiMessageSquare, title: 'AI Chat', desc: 'Intelligent conversations with advanced AI', path: '/chat' },
    { icon: FiImage, title: 'Image Gen', desc: 'Create stunning images from text', path: '/image' },
    { icon: FiUsers, title: 'Community', desc: 'Explore AI art from creators', path: '/community' },
  ]

  const benefits = [
    'Instant code generation',
    'Natural language processing',
    'Image creation tools',
    '24/7 AI assistance',
    'Multi-language support',
    'Smart suggestions',
  ]

  return (
    <div className="min-h-screen bg-slate-950 overflow-auto">
      <HeroBackground />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20">
        <motion.section 
          className="text-center mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-gray-300 text-sm">Powered by Advanced AI</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Build faster with{' '}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              AI Power
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg text-gray-400 mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Experience the next generation of AI assistance. Generate text, code, 
            and images instantly with our cutting-edge technology.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link 
                to="/chat" 
                className="w-full sm:w-auto min-w-[180px] flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-xl font-semibold shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40 transition-all"
              >
                Start Chatting <FiArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link 
                to="/community" 
                className="w-full sm:w-auto min-w-[180px] flex items-center justify-center gap-2 px-8 py-4 glass-button text-white rounded-xl font-semibold"
              >
                View Gallery
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} delay={0.6 + i * 0.1} />
          ))}
        </motion.section>

        <motion.section 
          className="glass-card rounded-3xl p-8 sm:p-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Everything you need to create
              </h2>
              <p className="text-gray-400 mb-6">
                Our AI platform provides all the tools you need to bring your ideas to life.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {benefits.map((benefit, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-violet-600/30 flex items-center justify-center">
                      <FiCheck className="w-3 h-3 text-violet-400" />
                    </div>
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div 
              className="hidden md:block relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="w-full aspect-square max-w-xs mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-purple-600/20 to-fuchsia-600/30 rounded-3xl blur-2xl" />
                <div className="relative glass-card rounded-3xl p-6 h-full flex flex-col justify-center">
                  <div className="text-center">
                    <FiZap className="w-12 h-12 mx-auto mb-4 text-violet-400" />
                    <p className="text-gray-400 text-sm">AI Processing</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-gray-500 text-sm">© 2024 AI Nova. Built with precision.</p>
        </motion.section>
      </div>
    </div>
  )
}

export default Landing