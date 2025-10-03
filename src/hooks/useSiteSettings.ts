import { useJsonData } from './useJsonData';

export interface NavigationItem {
  title: string;
  url: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export interface Footer {
  copyright: string;
  email?: string;
  phone?: string;
}

export interface SiteSettings {
  siteName: string;
  logo?: string;
  navigation: NavigationItem[];
  socialMedia?: SocialMedia;
  footer: Footer;
}

export function useSiteSettings() {
  const { data, loading, error } = useJsonData<SiteSettings>('/data/site-settings.json');

  return {
    settings: data,
    loading,
    error
  };
}
