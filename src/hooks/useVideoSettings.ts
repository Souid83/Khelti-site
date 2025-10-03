import { useJsonData } from './useJsonData';

export interface VideoSectionData {
  videoUrl: string;
  fallbackUrl?: string;
  poster?: string;
  autoPlay: boolean;
  loop: boolean;
  muted: boolean;
}

export interface VideoHeroData {
  videoUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
  overlayOpacity: number;
}

export function useVideoSection() {
  const { data, loading, error } = useJsonData<VideoSectionData>('/data/video.json');

  return {
    videoData: data,
    loading,
    error
  };
}

export function useVideoHero() {
  const { data, loading, error } = useJsonData<VideoHeroData>('/data/video-hero.json');

  return {
    heroData: data,
    loading,
    error
  };
}
