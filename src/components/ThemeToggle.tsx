import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check current theme on page mount
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="brutal-border brutal-shadow-sm brutal-btn-hover flex items-center gap-2 bg-[#2563EB] px-4 py-2 font-mono text-xs font-black uppercase text-white hover:bg-opacity-95 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="h-4.5 w-4.5 stroke-[2.5]" />
          <span>LIGHT</span>
        </>
      ) : (
        <>
          <Moon className="h-4.5 w-4.5 stroke-[2.5]" />
          <span>DARK</span>
        </>
      )}
    </button>
  );
}
