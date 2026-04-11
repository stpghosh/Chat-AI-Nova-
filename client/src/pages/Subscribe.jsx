import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiZap, FiCheck, FiX, FiCpu, FiShield, FiStar, FiArrowLeft, FiArrowRight, FiCreditCard } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const Subscribe = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '₹0',
      period: 'forever',
      features: [
        '50 messages/day',
        'Basic code assistance',
        'Standard response speed',
        'Community support',
      ],
      notFeatures: [
        'Advanced features',
        'Priority support',
        'Custom prompts',
      ],
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '₹299',
      period: '/month',
      features: [
        'Unlimited messages',
        'Advanced code assistance',
        'Fast response speed',
        'Priority support',
        'Custom prompts',
        'API access',
      ],
      notFeatures: [],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '₹999',
      period: '/month',
      features: [
        'Everything in Pro',
        'Dedicated support',
        'Custom integrations',
        'Team management',
        'Advanced analytics',
        'White-label options',
      ],
      notFeatures: [],
      popular: false,
    },
  ]

  const handleSubscribe = async (planId) => {
    setLoading(true)
    setSelectedPlan(planId)
    setTimeout(() => {
      setLoading(false)
      setSelectedPlan(null)
      navigate('/chat')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center"
              >
                <FiZap className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-white font-bold text-xl">AI Nova</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Unlock the full potential of AI Nova. Choose the plan that fits your needs.
          </motion.p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative glass rounded-2xl p-6 lg:p-8 border transition-all duration-300 ${
                plan.popular 
                  ? 'border-violet-500/50 shadow-lg shadow-violet-600/20 scale-105' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <FiStar className="w-3 h-3" /> Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <FiCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
                {plan.notFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <FiX className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-600/30'
                    : 'glass border border-white/10 text-white hover:bg-white/10'
                } ${loading && selectedPlan === plan.id ? 'opacity-70' : ''}`}
              >
                {loading && selectedPlan === plan.id ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>Get Started <FiArrowRight /></>
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center mx-auto mb-4">
              <FiCpu className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-white font-medium mb-2">Advanced AI</h3>
            <p className="text-gray-400 text-sm">Powered by cutting-edge language models</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center mx-auto mb-4">
              <FiShield className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-white font-medium mb-2">Secure & Private</h3>
            <p className="text-gray-400 text-sm">Your data is encrypted and protected</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center mx-auto mb-4">
              <FiZap className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-white font-medium mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">Instant responses for maximum productivity</p>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="glass rounded-xl p-5 border border-white/10">
              <h3 className="text-white font-medium mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-400 text-sm">Yes, you can cancel your subscription at any time. Your access will continue until the end of the billing period.</p>
            </div>
            <div className="glass rounded-xl p-5 border border-white/10">
              <h3 className="text-white font-medium mb-2">What payment methods are supported?</h3>
              <p className="text-gray-400 text-sm">We accept all major credit cards, UPI, and digital wallets for seamless payments.</p>
            </div>
            <div className="glass rounded-xl p-5 border border-white/10">
              <h3 className="text-white font-medium mb-2">Is there a free trial?</h3>
              <p className="text-gray-400 text-sm">Our Free plan gives you 50 messages per day to try before upgrading to Pro or Enterprise.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© 2024 AI Nova. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Subscribe