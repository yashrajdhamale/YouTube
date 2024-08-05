import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Css/Search.module.css';

const apiKeys = [
  'AIzaSyB8xe-pC_uYbBOdQ9_JldZxJHyZyxGZ2gU',
  'AIzaSyDDd6PlacJnbdjmAThQ-P1h2q1mopxphcc',
  'AIzaSyAMMZLJ7ATjIYAdz-atxV-vPv1e1xumFRc',
  'AIzaSyCm7wv1C0aPDlGK3OPUfYVGIEcCXG3Sk54',
  'AIzaSyDlgGSs2w32aedBgJ5PLbvIurfTBH7T0P8',
  'AIzaSyDb1i8QG2CVrsmyP-6aUaLo1_M4W4f8yzU', 
  'AIzaSyCI6-RU1-yZF_oIDbWmV9zrMhKdznPgtxY',
  'AIzaSyDRfXr8A16LH1Upyod1p3uwm-JSiBRk84Y'
];

export default function Search({ query, setHomedata }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pageToken, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyIndex, setApiKeyIndex] = useState(0);

  const fetchChannelDetails = async (channelIds, apiKey) => {
    try {
      const result = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds.join(',')}&key=${apiKey}`);
      if (result.ok) {
        const channelDetails = await result.json();
        return channelDetails;
      }
    } catch (error) {
      console.error('Error fetching channel details:', error);
    }
    return null;
  };

  const fetchVideoDetails = async (videoIds, apiKey) => {
    try {
      const result = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(',')}&key=${apiKey}`);
      if (result.ok) {
        const videoDetails = await result.json();
        return videoDetails;
      }
    } catch (error) {
      console.error('Error fetching video details:', error);
    }
    return null;
  };

  const fetchData = useCallback(async (token = '', currentApiKeyIndex = 0) => {
    setIsLoading(true);
    let success = false;

    for (let i = currentApiKeyIndex; i < apiKeys.length; i++) {
      try {
        const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&pageToken=${token}&key=${apiKeys[i]}&maxResults=30`;

        const result = await fetch(endpoint);
        if (result.ok) {
          const searchData = await result.json();
          const videoIds = searchData.items.map(item => item.id.videoId);
          const channelIds = searchData.items.map(item => item.snippet.channelId);

          const videoDetails = await fetchVideoDetails(videoIds, apiKeys[i]);
          const channelDetails = await fetchChannelDetails(channelIds, apiKeys[i]);

          if (videoDetails && channelDetails) {
            const videosWithDetails = searchData.items.map((item, index) => ({
              ...item,
              snippet: videoDetails.items[index].snippet,
              statistics: videoDetails.items[index].statistics,
              channelProfile: channelDetails.items.find(channel => channel.id === item.snippet.channelId).snippet.thumbnails.default.url
            }));

            setData(prevData => (token ? [...prevData, ...videosWithDetails] : videosWithDetails));
            setToken(searchData.nextPageToken || '');
            setApiKeyIndex(i);
            setHomedata(videosWithDetails);
            success = true;
            break;
          }
        } else {
          console.error(`Error fetching data with key ${apiKeys[i]}: ${result.statusText}`);
        }
      } catch (error) {
        console.error(`Error fetching data with key ${apiKeys[i]}:`, error);
      }
    }

    if (!success && currentApiKeyIndex < apiKeys.length - 1) {
      // Retry with the next API key
      fetchData(token, currentApiKeyIndex + 1);
    } else if (!success) {
      console.error('All API keys have been exhausted or are invalid.');
    }

    setIsLoading(false);
  }, [query]);

  useEffect(() => {
    setData([]);
    fetchData('', 0);
    window.scrollTo(0, 0); // Scroll to the top whenever the component is loaded or the query changes
  }, [fetchData, query]);

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

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };

  const formatViewCount = (num) => {
    if (typeof num !== 'number') {
      return 'N/A';
    }
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const handleVideoClick = (video) => {
    setHomedata(data);
    navigate(`/play/${video.id.videoId}`, { state: { video } });
  };

  useEffect(() => {
    const loadMoreData = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && !isLoading) {
        fetchData(pageToken, apiKeyIndex);
      }
    };

    window.addEventListener('scroll', loadMoreData);
    return () => {
      window.removeEventListener('scroll', loadMoreData);
    };
  }, [fetchData, pageToken, isLoading, apiKeyIndex]);

  return (
    <div className={styles.searchContainer}>
      {data.length > 0 ? (
        data.map((e, index) => (
          <div
            key={`${e.id.videoId}_${index}`}
            className={styles.videoItem}
            onClick={() => handleVideoClick(e)}
          >
            <img
              src={e.snippet.thumbnails.maxres ? e.snippet.thumbnails.maxres.url : e.snippet.thumbnails.high.url}
              alt={e.snippet.title}
              className={styles.videoThumbnail}
            />
            <div className={styles.videoContent}>
              <div className={styles.videoHeader}>
                <img
                  src={e.channelProfile}
                  alt={e.snippet.channelTitle}
                  className={styles.channelProfile}
                />
                <h4 className={styles.videoTitle}>{e.snippet.title}</h4>
              </div>
              <div className={styles.viewTimeInfo}>
                <p className={styles.viewCount}>
                  {e.statistics && e.statistics.viewCount ? formatViewCount(parseInt(e.statistics.viewCount)) : 'N/A'} views
                </p>
                <p className={styles.publishDate}>{timeSinceUpload(e.snippet.publishedAt)}</p>
              </div>
              <p className={styles.channelTitle}>{e.snippet.channelTitle}</p>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.loadingMessage}>Loading data...</p>
      )}
    </div>
  );
}
