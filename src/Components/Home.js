import React, { useEffect, useState } from 'react';
import jsonData from './data.json';
import './Css/Home.css'; // Import the CSS file

export default function Home() {
  const [data, setData] = useState([]);

  // let fetchData = async () => {
  //   try {
  //     let result = await fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=in&maxResults=50&key=AIzaSyAMMZLJ7ATjIYAdz-atxV-vPv1e1xumFRc');
  //     let data = await result.json();
  //     console.log('Data fetched:', data);
  //     setData(data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }
  useEffect(() => {
    setTimeout(() => {
      setData(jsonData.items); // Assuming jsonData.items is an array
    }, 10);
  }, []);

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
  }

  useEffect(() => {
    const loadMoreData = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setData(prevData => prevData.concat(jsonData.items)); // Assuming jsonData.items is an array
      }
    };

    window.addEventListener("scroll", loadMoreData);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", loadMoreData);
    };
  }, []);

  return (
    <div id="home">
      {data.length > 0 ? (
        data.map((e) => (
          <div key={e.id} className="video-item">
            <img
              src={e.snippet.thumbnails.maxres ? e.snippet.thumbnails.maxres.url : e.snippet.thumbnails.high.url}
              alt={e.snippet.title}
              className="video-thumbnail"
            />
            <h4>{e.snippet.title}</h4>
            <p>{e.snippet.channelTitle}</p>
            <div id="view_time">
              <p>viewcount</p>
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


