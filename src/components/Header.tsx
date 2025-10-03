import React from 'react';
import { Menu, ShoppingBag, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:py-6">
          {/* Mobile menu button */}
          <button className="md:hidden">
            <Menu className="h-6 w-6 text-raspberry" />
          </button>

          {/* Logo */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <h1 className="font-playfair text-2xl text-raspberry">
              Cheveux Nature
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 flex-1 justify-center">
            <a href="#" className="font-lora hover:text-raspberry transition-colors">
              Accueil
            </a>
            <a href="#" className="font-lora hover:text-raspberry transition-colors">
              Boutique
            </a>
            <a href="#" className="font-lora hover:text-raspberry transition-colors">
              Recettes
            </a>
            <a href="#" className="font-lora hover:text-raspberry transition-colors">
              À propos
            </a>
            <a href="#" className="font-lora hover:text-raspberry transition-colors">
              Contact
            </a>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button>
              <User className="h-6 w-6 text-raspberry" />
            </button>
            <button className="relative">
              <ShoppingBag className="h-6 w-6 text-raspberry" />
              <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}