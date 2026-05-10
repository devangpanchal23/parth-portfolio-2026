import React from 'react';

const ProjectVideo = ({ src = "https://www.youtube.com/embed/Jcj6kJvc_Vw" }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div 
        className="w-full relative overflow-hidden rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform duration-500 ease-out hover:scale-[1.02] bg-[#1a1a1a]"
        style={{ aspectRatio: '16/9' }}
      >
        <iframe
          src={src}
          title="YouTube video player"
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ProjectVideo;
