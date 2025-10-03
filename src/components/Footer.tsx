import React from 'react';
import { Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { settings, loading } = useSiteSettings();

  if (loading) {
    return null;
  }

  return (
    <footer className="bg-raspberry text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-playfair text-2xl mb-4">
              {settings?.siteName || 'Khelti'}
            </h3>
            <p className="font-lora text-white/80">
              Des soins artisanaux pour sublimer votre beauté naturelle.
            </p>
          </div>

          <div>
            <h4 className="font-playfair text-lg mb-4">Navigation</h4>
            <nav className="flex flex-col space-y-2">
              {settings?.navigation.map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  className="font-lora text-white/80 hover:text-white transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-playfair text-lg mb-4">Contact</h4>
            <div className="space-y-3">
              {settings?.footer.email && (
                <a
                  href={`mailto:${settings.footer.email}`}
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span className="font-lora">{settings.footer.email}</span>
                </a>
              )}
              {settings?.footer.phone && (
                <a
                  href={`tel:${settings.footer.phone}`}
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span className="font-lora">{settings.footer.phone}</span>
                </a>
              )}
            </div>

            {settings?.socialMedia && (
              <div className="flex space-x-4 mt-6">
                {settings.socialMedia.facebook && (
                  <a
                    href={settings.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                )}
                {settings.socialMedia.instagram && (
                  <a
                    href={settings.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                )}
                {settings.socialMedia.twitter && (
                  <a
                    href={settings.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="font-lora text-white/80 text-sm">
            {settings?.footer.copyright || '© 2024 Khelti. Tous droits réservés.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
