import { motion, useReducedMotion } from 'framer-motion'

export const useAnimationConfig = () => {
  const shouldReduceMotion = useReducedMotion()
  
  const durations = {
    fast: shouldReduceMotion ? 0 : 0.15,
    normal: shouldReduceMotion ? 0 : 0.25,
    slow: shouldReduceMotion ? 0 : 0.4,
  }
  
  const easings = {
    smooth: [0.25, 0.1, 0.25, 1],
    bouncy: [0.34, 1.56, 0.64, 1],
    gentle: [0.4, 0, 0.2, 1],
  }
  
  return { durations, easings, shouldReduceMotion }
}

export const pageVariants = {
  enter: (direction = 'forward') => ({
    opacity: 0,
    y: 8,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: (direction = 'forward') => ({
    opacity: 0,
    y: -8,
    scale: 0.98,
  }),
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

export const slideInLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
}

export const slideInRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

export const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
}

export const button tapVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.97 },
}

export const cardHoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.01 },
}

export const glowVariants = {
  rest: { boxShadow: '0 0 0px rgba(139, 92, 246, 0)' },
  hover: { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
}

export const shimmerKeyframes = {
  initial: { backgroundPosition: '-200% 0' },
  animate: { backgroundPosition: '200% 0' },
}

export const typingVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
}

export const typingLetter = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
}

export const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      times: [0, 0.5, 1],
    },
  },
}

export const bounceVariants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      repeat: Infinity,
      duration: 0.6,
    },
  },
}

export const shimmerGradient = 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'

export const getTransitionConfig = (duration = 0.25, ease = 'easeInOut') => ({
  duration,
  ease: ease === 'smooth' ? [0.25, 0.1, 0.25, 1] : ease === 'bouncy' ? [0.34, 1.56, 0.64, 1] : ease === 'gentle' ? [0.4, 0, 0.2, 1] : [0.4, 0, 0.2, 1],
})