import logo from './logo.svg';
import './App.css';
import {useAudienceDemographicsChart} from './useAudienceDemographicsChart ';
import {useAudienceRetention} from './useAudienceRetention';
import { fetchVideoData } from './fetchVideoData';
import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import { VidIds } from './VidIds';
import { json } from 'd3';
import {VideoList} from './VideoList';
import { Introduction } from './Introduction';
 
function App() {
  const AudienceDemographicsChart = useAudienceDemographicsChart;
  const AudienceRetention = useAudienceRetention;

  const [apiKey, setApiKey] = useState('AIzaSyCdf2N1hM-BK04N816RGLZPpMn-Ej4wMQc');
  const [channelId, setChannelId] = useState('UCkmMACUKpQeIxN9D9ARli1Q');
  const [vidUrl, setVidUrl] = useState('');
  const [videos, setVideos] = useState('');
  const [needFetch, setNeedFetch] = useState(false);
  const [videoData, setVideoData] = useState('');

  const handleChange = (event) => {
    setChannelId(event.target.value);
  };
  const handleChangeAPI = (event) => {
    setApiKey(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setVidUrl(
      'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
        channelId +
        '&maxResults=10&order=date&type=video&key=' +
        apiKey
    );
    setNeedFetch(true);
  };

  //fetches the data
  const fetchData = () => {
    json(vidUrl).then((data1) => {
      setVideos(data1);
      const vids = data1.items;
      return json('https://www.googleapis.com/youtube/v3/videos?id='+VidIds({vids})+'&key='+apiKey+'&part=snippet,statistics').then((data2 =>{
        setVideoData(data2);
        return data2;
      }));
    });
  };

  useEffect(() => {
    if(needFetch){
      setNeedFetch(false);
      fetchData();
    }
  }, [needFetch]);

  console.log("videos");
  console.log(videos);
  // const vids = videos.items;
  //the IDs of the videos returned
  // console.log("video IDs: "+VidIds({vids}));
  console.log('videoData');
  console.log(videoData);


  const InputForm = () =>{
    return <div className='InputForm'>
      <form onSubmit={handleSubmit}>
        <label>
          Channel ID:
          <input
            type="text"
            name="name"
            onChange={handleChange}
            defaultValue={channelId}
          />
        </label>
        <label>
          API Key:
          <input
            type="text"
            name="name"
            onChange={handleChangeAPI}
            defaultValue={apiKey}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  }

  //if the data has not loaded
  if (!videoData) {
    return <>
    <Introduction/>
    <InputForm/>
  </>
  }

  //if the data has loaded
  return (
    <>
    <Introduction/>
    <InputForm/>
    <VideoList data = {videoData}/>
    </>
  );
}

export default App;
