import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiZap, FiDownload, FiHeart, FiShare2, FiCheck, FiImage, FiMaximize, FiX, FiPlus, FiClock, FiStar } from 'react-icons/fi'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const sizes = [
  { value: '256', label: '256', desc: 'Fast' },
  { value: '512', label: '512', desc: 'Balanced' },
  { value: '1024', label: '1024', desc: 'HD' },
]

const heroImages = [
  'https://picsum.photos/seed/demo1/800/1000',
  'https://picsum.photos/seed/demo2/800/1000',
  'https://picsum.photos/seed/demo3/800/1000',
  'https://picsum.photos/seed/demo4/800/1000',
]

const HeroBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <motion.div 
      className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px]"
      animate={{ x: [-40, 40, -40], y: [-25, 25, -25] }}
      transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
    />
    <motion.div 
      className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/12 rounded-full blur-[100px]"
      animate={{ x: [25, -25, 25], y: [15, -15, 15] }}
      transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
    />
    <motion.div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px]"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
    />
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OS0xOCAxOC0xOCBzOC4wNTkgMTggMTggMTggMTgtOC4wNTkgMTgtMTgtOC4wNTktMTgtMTggLTE4IDhDMTcgMjYuMDE1IDEwLjk0NCAxOCAxOCAxOHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-15" />
  </div>
)

const SkeletonCard = ({ delay }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="aspect-square rounded-2xl bg-white/5"
  >
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 shimmer" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)', backgroundSize: '200% 100%' }} />
    </div>
  </motion.div>
)

const ImageCard = ({ img, onSelect, onDownload, onExpand, isSelected }) => {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(img)}
      className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-white/5 transition-all ${
        isSelected ? 'ring-2 ring-violet-500' : ''
      }`}
    >
      <img src={img.url} alt={img.prompt} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity" />
      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 hover:opacity-100 transition-opacity">
        <motion.button
          onClick={(e) => { e.stopPropagation(); onDownload(img) }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-white/20 backdrop-blur-xl rounded-full text-white hover:bg-white/30"
        >
          <FiDownload className="w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={(e) => { e.stopPropagation(); onExpand(img) }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-white/20 backdrop-blur-xl rounded-full text-white hover:bg-white/30"
        >
          <FiMaximize className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  )
}

const SizeSelector = ({ selected, onSelect }) => {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <div className="flex gap-2">
      {sizes.map((s) => (
        <motion.button
          key={s.value}
          onClick={() => onSelect(s.value)}
          whileTap={{ scale: 0.95 }}
          className={`flex-1 py-3 px-3 rounded-xl text-center transition-all ${
            selected === s.value
              ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className="block font-semibold text-sm">{s.label}</span>
          <span className="text-[10px] opacity-60">{s.desc}</span>
        </motion.button>
      ))}
    </div>
  )
}

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('')
  const [size, setSize] = useState('512')
  const [generatedImages, setGeneratedImages] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [likedImages, setLikedImages] = useState({})
  const [copied, setCopied] = useState(null)
  const [generationError, setGenerationError] = useState('')
  const [lightboxImage, setLightboxImage] = useState(null)
  const shouldReduceMotion = useReducedMotion()

  const API_KEY = '44b64462429c8e855e5de49f08eec409'

  const generateImage = async () => {
    if (!prompt.trim()) { setGenerationError('Please enter a prompt'); return }
    setIsGenerating(true)
    setGenerationError('')
    setSelectedImage(null)
    try {
      const response = await fetch('http://localhost:5000/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, apiKey: API_KEY })
      })
      const data = await response.json()
      
      if (data.images && data.images.length > 0) {
        setGeneratedImages(prev => [...data.images, ...prev])
        setSelectedImage(data.images[0])
      } else {
        throw new Error('No images generated')
      }
    } catch (error) {
      console.log('Using fallback images:', error.message)
      await new Promise(resolve => setTimeout(resolve, 2000))
      const timestamp = Date.now()
      const imgSize = parseInt(size)
      const newImages = Array.from({ length: 4 }, (_, i) => ({
        id: timestamp + i, 
        prompt, 
        url: `https://picsum.photos/seed/${timestamp + i}/${imgSize}/${imgSize}`, 
        likes: Math.floor(Math.random() * 100)
      }))
      setGeneratedImages(prev => [...newImages, ...prev])
      setSelectedImage(newImages[0])
    } finally { setIsGenerating(false) }
  }

  const handleLike = (id) => setLikedImages(prev => ({ ...prev, [id]: !prev[id] }))
  const handleShare = async (img) => {
    try { 
      navigator.share ? await navigator.share({ title: img.title, url: img.url }) : 
      (await navigator.clipboard.writeText(img.url), setCopied(img.id), setTimeout(() => setCopied(null), 2000)) 
    } catch {}
  }
  const handleDownload = async (img) => {
    try { 
      const res = await fetch(img.url)
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ai-img-${img.id}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch { window.open(img.url, '_blank') }
  }
  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generateImage() } }

  return (
    <div className="min-h-screen bg-slate-950 overflow-auto">
      <HeroBackground />

      <header className="sticky top-0 z-30 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/chat" className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <FiArrowLeft className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ rotate: 5 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center"
              >
                <FiImage className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h1 className="text-white font-bold text-lg">AI Image Generator</h1>
                <p className="text-xs text-gray-500">Create stunning images</p>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/community" className="text-sm text-gray-400 hover:text-white">View Gallery</Link>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Transform your{' '}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                imagination
              </span>
              {' '}into art
            </h2>
            <p className="text-gray-400 mb-6">
              Describe what you want to see and our AI will bring it to life.
            </p>
            
            <motion.div 
              className="glass-card rounded-2xl p-4"
              whileHover={{ scale: 1.01 }}
            >
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your image... e.g., 'A cosmic cat with galaxies in its eyes, digital art style'"
                rows={3}
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-sm resize-none"
              />
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-white/5">
                <SizeSelector selected={size} onSelect={setSize} />
                <motion.button
                  onClick={generateImage}
                  disabled={!prompt.trim() || isGenerating}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-xl font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  {isGenerating ? (
                    <>
                      <motion.span 
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} 
                      />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <FiZap className="w-5 h-5" />
                      <span>Generate</span>
                    </>
                  )}
                </motion.button>
              </div>
              {generationError && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-3"
                >
                  {generationError}
                </motion.p>
              )}
            </motion.div>

            <motion.div 
              className="flex items-center gap-6 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {[
                { icon: FiZap, label: 'Fast Generation', value: '< 3s' },
                { icon: FiStar, label: 'Quality', value: '4K' },
                { icon: FiImage, label: 'Style', value: 'Unlimited' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <stat.icon className="w-4 h-4 text-violet-400" />
                  <div>
                    <p className="text-white text-sm font-medium">{stat.value}</p>
                    <p className="text-gray-500 text-xs">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div>
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div 
                  key="generating"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 gap-3"
                >
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </motion.div>
              ) : generatedImages.length > 0 ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                >
                  <motion.div 
                    className="grid grid-cols-2 gap-3 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {generatedImages.slice(0, 4).map((img, i) => (
                      <ImageCard 
                        key={img.id} 
                        img={img}
                        onSelect={setSelectedImage}
                        onDownload={handleDownload}
                        onExpand={setLightboxImage}
                        isSelected={selectedImage?.id === img.id}
                      />
                    ))}
                  </motion.div>
                  
                  {selectedImage && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-card rounded-2xl p-4"
                    >
                      <div className="flex gap-4">
                        <img 
                          src={selectedImage.url} 
                          alt={selectedImage.prompt} 
                          className="w-24 h-24 rounded-xl object-cover" 
                        />
                        <div className="flex-1">
                          <p className="text-white text-sm mb-1 line-clamp-2">{selectedImage.prompt}</p>
                          <p className="text-gray-500 text-xs mb-3">{size}×{size}px</p>
                          <div className="flex flex-wrap gap-2">
                            <motion.button
                              onClick={() => handleLike(selectedImage.id)}
                              whileTap={{ scale: 0.95 }}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs ${
                                likedImages[selectedImage.id] 
                                  ? 'bg-rose-500/20 text-rose-400' 
                                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
                              }`}
                            >
                              <FiHeart className={`w-4 h-4 ${likedImages[selectedImage.id] ? 'fill-current' : ''}`} />
                            </motion.button>
                            <motion.button
                              onClick={() => handleShare(selectedImage)}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-white/5 text-gray-300 hover:bg-white/10"
                            >
                              {copied === selectedImage.id ? <FiCheck className="w-4 h-4 text-green-400" /> : <FiShare2 className="w-4 h-4" />}
                            </motion.button>
                            <motion.button
                              onClick={() => handleDownload(selectedImage)}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-violet-600 text-white"
                            >
                              <FiDownload className="w-4 h-4" />Download
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-2xl p-8 text-center"
                >
                  <div className="relative inline-block mb-4">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-violet-600/30 via-purple-600/20 to-fuchsia-600/30 flex items-center justify-center">
                      <FiImage className="w-12 h-12 text-violet-400" />
                    </div>
                    <motion.div 
                      className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <FiPlus className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Ready to create</h3>
                  <p className="text-gray-500 text-sm">Enter a prompt to generate your first image</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.section 
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Example prompts</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'A futuristic city at night',
              'Abstract colorful waves',
              'Cute kawaii cat',
              'Cyberpunk portrait',
            ].map((prompt, i) => (
              <motion.button
                key={prompt}
                onClick={() => setPrompt(prompt)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card rounded-xl p-3 text-left text-sm text-gray-300 hover:text-white transition-colors"
              >
                <FiImage className="w-4 h-4 mb-2 text-violet-400" />
                {prompt}
              </motion.button>
            ))}
          </div>
        </motion.section>
      </main>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.button 
              className="absolute top-4 right-4 p-3 rounded-xl bg-white/10 text-white hover:bg-white/20"
              onClick={() => setLightboxImage(null)}
            >
              <FiX className="w-6 h-6" />
            </motion.button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              src={lightboxImage.url} 
              alt={lightboxImage.prompt} 
              className="max-w-[90vw] max-h-[75vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()} 
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
              <motion.button 
                onClick={() => handleDownload(lightboxImage)}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-violet-600 text-white rounded-xl flex items-center gap-2 font-medium"
              >
                <FiDownload className="w-5 h-5" />Download
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ImageGenerator