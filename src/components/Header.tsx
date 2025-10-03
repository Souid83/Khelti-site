import React from 'react';
import { Menu, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function Header() {
  const { settings, loading } = useSiteSettings();

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
            <Link to="/">
              <h1 className="font-playfair text-2xl text-raspberry">
                {loading ? 'Khelti – Soins artisanaux' : settings?.siteName}
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 flex-1 justify-center">
            {loading ? (
              <>
                <Link to="/" className="font-lora hover:text-raspberry transition-colors">Accueil</Link>
                <Link to="/boutique" className="font-lora hover:text-raspberry transition-colors">Boutique</Link>
                <Link to="/blog" className="font-lora hover:text-raspberry transition-colors">Recettes</Link>
                <Link to="/a-propos" className="font-lora hover:text-raspberry transition-colors">À propos</Link>
                <Link to="/contact" className="font-lora hover:text-raspberry transition-colors">Contact</Link>
              </>
            ) : (
              settings?.navigation.map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  className="font-lora hover:text-raspberry transition-colors"
                >
                  {item.title}
                </Link>
              ))
            )}
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