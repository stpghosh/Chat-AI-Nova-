import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiShare2, FiDownload, FiUsers, FiArrowLeft, FiCheck, FiImage, FiSearch, FiTrendingUp, FiPlus, FiEye, FiAward, FiGrid, FiClock } from 'react-icons/fi'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const sampleImages = [
  { id: 1, title: 'Cyberpunk City', author: 'Alex Chen', likes: 234, views: 1200, url: 'https://picsum.photos/seed/ai1/800/1000', tags: ['digital', 'future'] },
  { id: 2, title: 'Neon Dreams', author: 'Sarah Kim', likes: 189, views: 890, url: 'https://picsum.photos/seed/ai2/800/600', tags: ['neon', 'abstract'] },
  { id: 3, title: 'Abstract Flow', author: 'Mike Johnson', likes: 312, views: 1500, url: 'https://picsum.photos/seed/ai3/800/800', tags: ['abstract', 'art'] },
  { id: 4, title: 'Digital Portrait', author: 'Emma Davis', likes: 156, views: 720, url: 'https://picsum.photos/seed/ai4/800/1200', tags: ['portrait', 'digital'] },
  { id: 5, title: 'Mountain Vista', author: 'James Wilson', likes: 278, views: 1100, url: 'https://picsum.photos/seed/ai5/800/700', tags: ['nature', 'landscape'] },
  { id: 6, title: 'Ocean Sunset', author: 'Lisa Brown', likes: 445, views: 2100, url: 'https://picsum.photos/seed/ai6/800/900', tags: ['nature', 'ocean'] },
  { id: 7, title: 'Future Tech', author: 'David Lee', likes: 198, views: 850, url: 'https://picsum.photos/seed/ai7/800/1100', tags: ['tech', 'future'] },
  { id: 8, title: 'Cosmic Journey', author: 'Anna White', likes: 367, views: 1400, url: 'https://picsum.photos/seed/ai8/800/760', tags: ['space', 'cosmic'] },
  { id: 9, title: 'Nature Art', author: 'Tom Harris', likes: 289, views: 980, url: 'https://picsum.photos/seed/ai9/800/840', tags: ['nature', 'art'] },
  { id: 10, title: 'Electric Soul', author: 'Maria Garcia', likes: 421, views: 1800, url: 'https://picsum.photos/seed/ai10/800/960', tags: ['portrait', 'electric'] },
  { id: 11, title: 'Dream Scape', author: 'John Smith', likes: 356, views: 1350, url: 'https://picsum.photos/seed/ai11/800/1040', tags: ['dream', 'abstract'] },
  { id: 12, title: 'Urban Jungle', author: 'Kate Lee', likes: 198, views: 750, url: 'https://picsum.photos/seed/ai12/800/880', tags: ['urban', 'city'] },
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

const ImageCard = ({ img, onLike, onShare, onDownload, liked, likesCount, copied, downloadProgress, isFeatured }) => {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? {} : { y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className={`relative ${isFeatured ? 'aspect-[3/4]' : 'aspect-[4/5]'} rounded-2xl overflow-hidden cursor-pointer bg-white/5`}>
        <motion.img 
          src={img.url} 
          alt={img.title}
          className="w-full h-full object-cover"
          whileTap={{ scale: 0.97 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {isFeatured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-amber-500/90 rounded-full text-xs font-medium text-black">
            <FiAward className="w-3 h-3" />
            <span>Featured</span>
          </div>
        )}
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <motion.button
            onClick={() => onLike(img.id)}
            className={`p-3.5 rounded-full backdrop-blur-xl transition-all ${
              liked[img.id] 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            whileTap={{ scale: 0.9 }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
          >
            <FiHeart className={`w-5 h-5 ${liked[img.id] ? 'fill-current' : ''}`} />
          </motion.button>
          <motion.button
            onClick={() => onShare(img)}
            className="p-3.5 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-xl transition-all"
            whileTap={{ scale: 0.9 }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
          >
            {copied === img.id ? <FiCheck className="w-5 h-5 text-green-400" /> : <FiShare2 className="w-5 h-5" />}
          </motion.button>
          <motion.button
            onClick={() => onDownload(img)}
            disabled={downloadProgress === img.id}
            className="p-3.5 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-xl transition-all disabled:opacity-50"
            whileTap={{ scale: 0.9 }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
          >
            {downloadProgress === img.id ? (
              <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} />
            ) : (
              <FiDownload className="w-5 h-5" />
            )}
          </motion.button>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onLike(img.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                liked[img.id] 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white/20 backdrop-blur text-white'
              }`}
            >
              <FiHeart className={`w-4 h-4 ${liked[img.id] ? 'fill-current' : ''}`} />
              <span>{likesCount[img.id]}</span>
            </button>
            <div className="flex items-center gap-1 text-white/70 text-xs">
              <FiEye className="w-3 h-3" />
              <span>{img.views}</span>
            </div>
          </div>
        </div>
      </div>
      
      <motion.div className="mt-3" whileHover={{ x: 4 }}>
        <h3 className="text-white font-semibold text-base group-hover:text-violet-300 transition-colors">{img.title}</h3>
        <p className="text-gray-500 text-sm">by <span className="text-gray-400">{img.author}</span></p>
      </motion.div>
    </motion.div>
  )
}

const Community = () => {
  const [liked, setLiked] = useState({})
  const [likesCount, setLikesCount] = useState(sampleImages.reduce((acc, img) => ({ ...acc, [img.id]: img.likes }), {}))
  const [copied, setCopied] = useState(null)
  const [downloadProgress, setDownloadProgress] = useState(null)
  const [activeTab, setActiveTab] = useState('trending')
  const [searchQuery, setSearchQuery] = useState('')
  const shouldReduceMotion = useReducedMotion()

  const toggleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }))
    setLikesCount(prev => ({ 
      ...prev, 
      [id]: prev[id] + (liked[id] ? -1 : 1) 
    }))
  }

  const handleShare = async (img) => {
    try {
      if (navigator.share) {
        await navigator.share({ title: img.title, text: `Check out: ${img.title}`, url: img.url })
      } else {
        await navigator.clipboard.writeText(img.url)
        setCopied(img.id)
        setTimeout(() => setCopied(null), 2000)
      }
    } catch {}
  }

  const handleDownload = async (img) => {
    setDownloadProgress(img.id)
    try {
      const response = await fetch(img.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${img.title.toLowerCase().replace(/\s+/g, '-')}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch {
      window.open(img.url, '_blank')
    } finally {
      setDownloadProgress(null)
    }
  }

  const tabs = [
    { id: 'trending', label: 'Trending', icon: FiTrendingUp },
    { id: 'recent', label: 'Recent', icon: FiClock },
    { id: 'popular', label: 'Popular', icon: FiHeart },
  ]

  const filteredImages = sampleImages.filter(img => 
    img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    img.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    img.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  ).sort((a, b) => {
    if (activeTab === 'trending') return b.views - a.views
    if (activeTab === 'popular') return b.likes - a.likes
    return a.id - b.id
  })

  const featuredImages = filteredImages.slice(0, 3)
  const gridImages = filteredImages.slice(3)

  const totalStats = {
    images: sampleImages.length,
    likes: Object.values(likesCount).reduce((a, b) => a + b, 0),
    views: sampleImages.reduce((acc, img) => acc + img.views, 0),
  }

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
                <FiUsers className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h1 className="text-white font-bold text-lg">Community Gallery</h1>
                <p className="text-xs text-gray-500">AI Generated Masterpieces</p>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/image" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-xl text-sm font-medium">
                <FiPlus className="w-4 h-4" />Create
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <motion.div 
          className="grid lg:grid-cols-4 gap-8 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Explore{' '}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                creativity
              </span>
            </h2>
            <p className="text-gray-400 mb-6">
              Discover stunning AI-generated artwork from creators worldwide
            </p>
            
            <motion.div 
              className="glass-card rounded-2xl p-4"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex gap-3 mb-4">
                <FiSearch className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
                />
              </div>
              
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-3 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {[
                { label: 'Images', value: totalStats.images, icon: FiImage },
                { label: 'Likes', value: totalStats.likes, icon: FiHeart },
                { label: 'Views', value: totalStats.views.toLocaleString(), icon: FiEye },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card rounded-xl p-3 text-center"
                >
                  <stat.icon className="w-4 h-4 mx-auto mb-1 text-violet-400" />
                  <p className="text-white font-bold text-lg">{stat.value}</p>
                  <p className="text-gray-500 text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }}>
              <Link to="/image" className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-xl font-medium">
                <FiPlus className="w-4 h-4" />Create Image
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-3 space-y-8">
            {featuredImages.length > 0 && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Featured</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {featuredImages.map((img, i) => (
                    <ImageCard 
                      key={img.id} 
                      img={img}
                      onLike={toggleLike}
                      onShare={handleShare}
                      onDownload={handleDownload}
                      liked={liked}
                      likesCount={likesCount}
                      copied={copied}
                      downloadProgress={downloadProgress}
                      isFeatured={true}
                    />
                  ))}
                </div>
              </motion.section>
            )}

            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">All Images</h3>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <FiGrid className="w-4 h-4" />
                  <span>{gridImages.length}</span>
                </div>
              </div>
              
              {gridImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <AnimatePresence mode="popLayout">
                    {gridImages.map((img, index) => (
                      <motion.div
                        key={img.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <ImageCard 
                          img={img}
                          onLike={toggleLike}
                          onShare={handleShare}
                          onDownload={handleDownload}
                          liked={liked}
                          likesCount={likesCount}
                          copied={copied}
                          downloadProgress={downloadProgress}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div 
                  className="glass-card rounded-2xl p-12 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <FiImage className="w-16 h-16 mx-auto mb-4 text-gray-700" />
                  <h4 className="text-white font-semibold mb-2">No images found</h4>
                  <p className="text-gray-500 text-sm">Try adjusting your search</p>
                </motion.div>
              )}
            </motion.section>

            <motion.div 
              className="mt-8 text-center border-t border-white/5 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-gray-500 text-sm">
                Showing <span className="text-white">{filteredImages.length}</span> of <span className="text-white">{sampleImages.length}</span> images
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Community