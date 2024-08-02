// Components/PlayVideo.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './Css/PlayVideo.css';

function PlayVideo() {
  const { videoId } = useParams();

  return (
    <div className="video-player">
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      />
    </div>
  );
}

export default PlayVideo;
