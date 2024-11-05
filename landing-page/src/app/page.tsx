// app/page.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      {/* Other components will go here */}
    </main>
  );
}
