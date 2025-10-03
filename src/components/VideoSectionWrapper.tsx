import React from 'react';
import VideoSection from './VideoSection';
import { useVideoSection } from '../hooks/useVideoSettings';

export default function VideoSectionWrapper() {
  const { videoData, loading } = useVideoSection();

  if (loading) {
    return (
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <VideoSection
      videoUrl={videoData?.videoUrl}
      fallbackUrl={videoData?.fallbackUrl}
      poster={videoData?.poster}
    />
  );
}
