/* global gapi */
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { GoogleLogin } from 'react-google-login';

export const useAudienceDemographicsChart = ({YOUTUBE_API_CLIENT_ID, CHANNEL_ID}) => {
  // Define the YouTube API client ID
  // const YOUTUBE_API_CLIENT_ID = 'YOUR_CLIENT_ID';

  // Define the YouTube channel ID for which you want to visualize the audience demographics
  // const CHANNEL_ID = 'YOUR_CHANNEL_ID';

  // Define the API endpoint for retrieving the audience demographics data
  const API_ENDPOINT = `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_CLIENT_ID}&id=${CHANNEL_ID}&part=statistics`;

  // Define the D3.js chart dimensions
  const CHART_WIDTH = 600;
  const CHART_HEIGHT = 400;

  // Define the state variables for the audience demographics data and any error messages
  const [demographicsData, setDemographicsData] = useState(null);
  const [error, setError] = useState(null);

  // Define the Google login success handler function
  const googleLoginSuccessHandler = (response) => {
    // Initialize the YouTube API client with the user's access token
    gapi.load('client', () => {
      gapi.client.setToken({ access_token: response.accessToken });
      gapi.client.load('youtube', 'v3', () => {
        // Make a request to the YouTube API to get data about the channel's audience demographics
        gapi.client.youtube.channels.list({
          id: CHANNEL_ID,
          part: 'statistics',
        }).execute((response) => {
          if (response.error) {
            setError(response.error.message);
          } else {
            // Extract the audience demographics data from the API response
            const demographicsData = {
              male: parseInt(response.items[0].statistics.malePercentage),
              female: parseInt(response.items[0].statistics.femalePercentage),
              unknown: 100 - parseInt(response.items[0].statistics.malePercentage) - parseInt(response.items[0].statistics.femalePercentage),
            };
            setDemographicsData(demographicsData);
          }
        });
      });
    });
  };

  // Define the D3.js chart creation function
  const createChart = () => {
    if (demographicsData) {
      // Create the D3.js pie layout and generator functions
      const pieLayout = d3.pie()
        .value((d) => d.value)
        .sort(null);

      const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(Math.min(CHART_WIDTH, CHART_HEIGHT) / 2 - 10);

      // Create the D3.js SVG element and group
      const svg = d3.select('#audience-demographics-chart')
        .append('svg')
        .attr('width', CHART_WIDTH)
        .attr('height', CHART_HEIGHT);

      const chartGroup = svg.append('g')
        .attr('transform', `translate(${CHART_WIDTH / 2}, ${CHART_HEIGHT / 2})`);

      // Create the D3.js pie chart slices and labels
      const pieData = pieLayout(demographicsData.entries);
      const sliceGroups = chartGroup.selectAll('.slice')
        .data(pieData)
        .enter()
        .append('g')
        .attr('class', 'slice');

    sliceGroups.append('path')
      .attr('d', arcGenerator)
      .attr('fill', (d) => {
        if (d.data.key === 'male') {
          return 'blue';
        } else if (d.data.key === 'female') {
          return 'pink';
        } else {
          return 'gray';
        }
      })
      .attr('stroke', 'white')
      .attr('stroke-width', 2);

    sliceGroups.append('text')
      .attr('transform', (d) => `translate(${arcGenerator.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text((d) => {
        if (d.data.key === 'male') {
          return 'Male';
        } else if (d.data.key === 'female') {
          return 'Female';
        } else {
          return 'Unknown';
        }
      })
      .attr('fill', 'white');

    };
  };
// Call the createChart function when the demographicsData state variable changes
useEffect(() => {
  createChart();
}, [demographicsData]);

return (
  <div>
    <h2>Audience Demographics Chart</h2>
    {!demographicsData && !error && (
      <GoogleLogin
        clientId={YOUTUBE_API_CLIENT_ID}
        onSuccess={googleLoginSuccessHandler}
      />
    )}
    {error && <p>Error: {error}</p>}
    <div id="audience-demographics-chart"></div>
  </div>
);

}

// export default AudienceDemographicsChart;

