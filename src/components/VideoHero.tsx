import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import { useVideoHero } from '../hooks/useVideoSettings';

export default function VideoHero() {
  const { heroData, loading } = useVideoHero();

  const title = heroData?.title || 'Découvrez nos huiles';
  const subtitle = heroData?.subtitle || 'Nos incontournables';
  const buttonText = heroData?.buttonText || 'Explorer la collection';
  const buttonUrl = heroData?.buttonUrl || '/boutique';
  const videoUrl = heroData?.videoUrl || 'https://player.vimeo.com/external/373239380.sd.mp4?s=6e3ea5b4e32f345a3e921e0647454a4efee7e0f1&profile_id=164&oauth2_token_id=57447761';
  const overlayOpacity = heroData?.overlayOpacity || 20;

  return (
    <div className="relative w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div
        className="video-overlay absolute inset-0 bg-raspberry"
        style={{ opacity: overlayOpacity / 100 }}
      />
      <div className="relative min-h-screen flex flex-col items-center justify-start pt-32">
        <div className="max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-playfair text-black mb-6 animate-fade-in">
            {title}
          </h1>
          <h2 className="text-xl md:text-3xl font-lora text-black mb-16 animate-slide-up">
            {subtitle}
          </h2>
        </div>
        
        <div className="w-full">
          <ProductGrid />
        </div>

        <div className="text-center mt-8 mb-16">
          <Link to={buttonUrl} className="btn-primary border-2 border-gold text-lg px-8 py-4 inline-block">
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}