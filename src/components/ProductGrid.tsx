import React from 'react';
import { useProducts } from '../hooks/useProducts';

export default function ProductGrid() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-gray-600">Chargement des produits...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-red-600">Erreur lors du chargement des produits.</p>
        </div>
      </section>
    );
  }

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