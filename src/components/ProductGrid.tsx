import React from 'react';

const products = [
  {
    id: 1,
    name: 'Huile Nourrissante',
    price: '29.90',
    image: 'https://images.unsplash.com/photo-1617500603321-bcd6286973b7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Sérum Réparateur',
    price: '34.90',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Huile Protectrice',
    price: '27.90',
    image: 'https://images.unsplash.com/photo-1617500603321-bcd6286973b7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Sérum Brillance',
    price: '32.90',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
  }
];

export default function ProductGrid() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="card group bg-white/80 backdrop-blur-sm">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-playfair text-lg text-raspberry">{product.name}</h3>
              <p className="font-lora text-gray-600 mt-1">{product.price} €</p>
              <button className="mt-4 w-full btn-primary text-sm py-2">
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}