import React from 'react';
import Header from './components/Header';
import VideoSection from './components/VideoSection';
import VideoHero from './components/VideoHero';

function App() {
  return (
    <div className="min-h-screen bg-offWhite">
      <Header />
      <main>
        <VideoSection />
        <VideoHero />
      </main>
    </div>
  );
}

export default App;