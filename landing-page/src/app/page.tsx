// app/page.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* Other components will go here */}
    </main>
  );
}
