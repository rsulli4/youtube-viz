/* global gapi */
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { GoogleLogin } from 'react-google-login';

export const useAudienceRetention = () => {
  // Define the YouTube API client ID
  const YOUTUBE_API_CLIENT_ID = 'AIzaSyBBRBZAtYjQWFVJfThCsnYh0ZAaCtiTsQE';
  const YOUTUBE_API_KEY = 'AIzaSyBBRBZAtYjQWFVJfThCsnYh0ZAaCtiTsQE';

  // Define the YouTube video ID for which you want to visualize the audience retention
  const VIDEO_ID = 'Re39Xz74I84';

  // Define the API endpoint for retrieving the video data
  const API_ENDPOINT = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics%2CcontentDetails&id=${VIDEO_ID}&key=${YOUTUBE_API_KEY}`;

  // Define the state variables for storing the video data and the chart data
  const [videoData, setVideoData] = useState(null);
  const [chartData, setChartData] = useState(null);

  // Define the callback function for handling the response from the YouTube API
  const handleResponse = (response) => {
    setVideoData(response.items[0]);
  };

  // Define the callback function for handling errors from the YouTube API
  const handleError = (error) => {
    console.error(error);
  };

  // Define the effect hook for retrieving the video data from the YouTube API
  useEffect(() => {
    if (videoData === null) {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        gapi.load('client', () => {
          gapi.client.init({
            apiKey: YOUTUBE_API_KEY,
            clientId: YOUTUBE_API_CLIENT_ID,
            discoveryDocs: [
              'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
            ],
            scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
          });

          gapi.client.load('youtube', 'v3', () => {
            gapi.client.youtube.videos
              .list({
                part: 'snippet,statistics,contentDetails',
                id: VIDEO_ID,
              })
              .then((response) => handleResponse(response.result))
              .catch((error) => handleError(error.result.error));
          });
        });
      };
      document.body.appendChild(script);
    } else {
      const duration = d3
        .isoParse(videoData.contentDetails.duration)
        .getTime();
      const viewCount = videoData.statistics.viewCount;
      const chartData = [];
      let last = 0;
      for (let i = 0; i < videoData.statistics.relativeRetentionPerformance.length; i++) {
        const retention = videoData.statistics.relativeRetentionPerformance[i];
        const time = duration * (retention.time / 100);
        const viewers = viewCount * (retention.value / 100);
        chartData.push({
          x0: last,
          x1: time,
          y: viewers,
        });
        last = time;
      }
      setChartData(chartData);
    }
  }, [videoData]);

  // Define the ref for the chart
  const chartRef = React.createRef();

  

// Define the effect hook for rendering the chart
  useEffect(() => {
    if (chartData !== null) {
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const width = 500 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const x = d3
        .scaleLinear()
        .domain([0, d3.max(chartData, (d) => d.x1)])
        .range([0, width]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(chartData, (d) => d.y)])
        .range([height, 0]);

      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);

      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis);

      svg.append("g").call(yAxis);

      svg
        .selectAll("rect")
        .data(chartData)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.x0))
        .attr("y", (d) => y(d.y))
        .attr("width", (d) => x(d.x1) - x(d.x0))
        .attr("height", (d) => height - y(d.y))
        .attr("fill", "steelblue");
    }
  }, [chartData]);

  return (
    <div>
      <h2>Audience Retention</h2>
      {videoData === null && (
        <GoogleLogin
          clientId={YOUTUBE_API_CLIENT_ID}
          buttonText="Login with Google"
        />
      )}
      {videoData !== null && (
        <div ref={chartRef}></div>
      )}
    </div>
  );
};

