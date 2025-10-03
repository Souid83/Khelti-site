import React from 'react';

export default function VideoPlaceholder() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden bg-gray-100">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src="https://player.vimeo.com/external/373239380.sd.mp4?s=6e3ea5b4e32f345a3e921e0647454a4efee7e0f1&profile_id=164&oauth2_token_id=57447761"
          type="video/mp4"
        />
      </video>
    </div>
  );
}