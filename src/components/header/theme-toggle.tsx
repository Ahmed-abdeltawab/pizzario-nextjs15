'use client'

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/theme-provider'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      className="relative inline-flex items-center justify-center w-14 h-8 rounded-full
        bg-gradient-to-r from-amber-200 to-amber-300 dark:from-indigo-500 dark:to-purple-600
        hover:shadow-lg hover:scale-105 active:scale-95
        transition-all duration-300 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        group overflow-hidden"
    >
      {/* Background Animation Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-200 to-blue-300 dark:from-slate-700 dark:to-slate-800 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Toggle Circle */}
      <div
        className={`absolute w-6 h-6 rounded-full bg-white dark:bg-slate-900
          shadow-lg transition-all duration-300 ease-in-out z-10
          flex items-center justify-center
          ${theme === 'light' ? 'translate-x-[-10px]' : 'translate-x-[10px]'}`}
      >
        {/* Sun Icon */}
        <Sun
          className={`absolute w-4 h-4 text-amber-500 transition-all duration-300
            ${theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-0'
            }`}
          strokeWidth={2.5}
        />
        
        {/* Moon Icon */}
        <Moon
          className={`absolute w-4 h-4 text-indigo-400 transition-all duration-300
            ${theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-0'
            }`}
          strokeWidth={2.5}
        />
      </div>

      {/* Decorative Stars (visible in dark mode) */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-3 right-3 w-1 h-1 bg-white rounded-full animate-pulse delay-150" />
        <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-300" />
      </div>
    </button>
  )
}

export default ThemeToggle
