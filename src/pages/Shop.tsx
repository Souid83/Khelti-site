import React from 'react';
import ProductGrid from '../components/ProductGrid';

export default function Shop() {
  return (
    <div className="min-h-screen bg-offWhite pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair text-raspberry mb-4">
            Notre Boutique
          </h1>
          <p className="text-lg font-lora text-gray-600">
            Découvrez notre collection de soins artisanaux naturels
          </p>
        </div>
        <ProductGrid />
      </div>
    </div>
  );
}
