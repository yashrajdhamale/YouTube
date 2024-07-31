import React, { useEffect, useState, useCallback } from 'react';
import './Css/Home.css'; // Import the CSS file

const apiKeys = [
  'AIzaSyB8xe-pC_uYbBOdQ9_JldZxJHyZyxGZ2gU',
  'AIzaSyDDd6PlacJnbdjmAThQ-P1h2q1mopxphcc',
  'AIzaSyDH_Q0cvzezf5JMROkPzMMOA_PkE5qpMFY',
  'AIzaSyAMMZLJ7ATjIYAdz-atxV-vPv1e1xumFRc'
];

export default function Home() {
  const [data, setData] = useState([]);
  const [pageToken, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyIndex, setApiKeyIndex] = useState(0);

  const fetchData = useCallback(async (token) => {
    setIsLoading(true);
    let success = false;
    for (let i = apiKeyIndex; i < apiKeys.length; i++) {
      try {
        const result = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=50&pageToken=${token}&key=${apiKeys[i]}`);
        if (result.ok) {
          const data = await result.json();
          setData(prevData => [...prevData, ...data.items]);
          setToken(data.nextPageToken || '');
          setApiKeyIndex(i); // Save the index of the working key
          success = true;
          console.log(data);
          break;
        }
      } catch (error) {
        console.error(`Error fetching data with key ${apiKeys[i]}:`, error);
      }
    }
    if (!success) {
      console.error('All API keys have been exhausted or are invalid.');
    }
    setIsLoading(false);
  }, [apiKeyIndex]);

  useEffect(() => {
    fetchData('');
  }, [fetchData]);

  const timeSinceUpload = (uploadDate) => {
    const now = new Date();
    const uploadTime = new Date(uploadDate);
    const diff = now - uploadTime;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return years + " year" + (years > 1 ? "s" : "") + " ago";
    }
    if (months > 0) {
      return months + " month" + (months > 1 ? "s" : "") + " ago";
    }
    if (weeks > 0) {
      return weeks + " week" + (weeks > 1 ? "s" : "") + " ago";
    }
    if (days > 0) {
      return days + " day" + (days > 1 ? "s" : "") + " ago";
    }
    if (hours > 0) {
      return hours + " hour" + (hours > 1 ? "s" : "") + " ago";
    }
    if (minutes > 0) {
      return minutes + " minute" + (minutes > 1 ? "s" : "") + " ago";
    }
    return seconds + " second" + (seconds > 1 ? "s" : "") + " ago";
  };

  const formatViewCount = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  useEffect(() => {
    const loadMoreData = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && !isLoading) {
        fetchData(pageToken);
      }
    };
    window.addEventListener("scroll", loadMoreData);
    return () => {
      window.removeEventListener("scroll", loadMoreData);
    };
  }, [fetchData, pageToken, isLoading]);

  return (
    <div id="home">
      {data.length > 0 ? (
        data.map((e, index) => (
          <div key={`${e.id}_${index}`} className="video-item">
            <img
              src={e.snippet.thumbnails.maxres ? e.snippet.thumbnails.maxres.url : e.snippet.thumbnails.high.url}
              alt={e.snippet.title}
              className="video-thumbnail"
            />
            <h4>{e.snippet.title}</h4>
            <p>{e.snippet.channelTitle}</p>
            <div id="view_time">
              <p>{formatViewCount(e.statistics.viewCount)} views</p>
              <p id='publishdate'>{timeSinceUpload(e.snippet.publishedAt)}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="loading-message">Loading data...</p>
      )}
    </div>
  );
}
