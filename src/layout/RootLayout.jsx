import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  const [isDark, setIsDark] = useState(false);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);
  }, []);

  // Apply theme to html
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const layoutClass = isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${layoutClass}`}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <main className="p-4">
        <Outlet context={{ isDark }} />
      </main>
      <Footer isDark={isDark} />
    </div>
  );
};

export default RootLayout;
