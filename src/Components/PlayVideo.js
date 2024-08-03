import React from 'react';
import { useParams } from 'react-router-dom';
import './Css/PlayVideo.css';

function PlayVideo(props) {
  const { videoId } = useParams();
  const formatViewCount = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };
  return (
    <>
      <div className="video-player">
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        ></iframe>
        <div className="video-info">
        {props.homedata.map((e, index) => {
          if (videoId === (e.id.videoId || e.id)) {
            return (
              <div key={`${e.id.videoId || e.id}_${index}`} className="video-details">
                <h2 className="video-title">{e.snippet.title}</h2>
                <p className="channel-title">{e.snippet.channelTitle}</p>
                <p className="publish-date">{new Date(e.snippet.publishedAt).toDateString()}</p>
                <div className="view-count">
                  <p>{e.statistics ? formatViewCount(e.statistics.viewCount) : 'N/A'} views</p>
                </div>
                <div className="description">
                  <p>{e.snippet.description}</p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
      </div>
      
    </>
  );
}

export default PlayVideo;
