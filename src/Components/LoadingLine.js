import React from 'react';
import './Css/LoadingLine.css';

const LoadingLine = ({ isLoading }) => {
  return isLoading ? <div className="loading-line"></div> : null;
};

export default LoadingLine;