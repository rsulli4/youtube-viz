import logo from './logo.svg';
import './App.css';
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
import { ChannelSearch } from './ChannelSearch/ChannelSearch';
import { ViewsChart } from './ViewsChart/ViewsChart';
import { TagsVisual } from './TagsVisual/TagsVisual';
import { TagsVisualRatio } from './TagsVisualRatio/TagsVisualRatio';
import { VideoUploads } from './VideoUploads/VideoUploads';
 
function App() {
  const sliceSize = 10;

  const [apiKey, setApiKey] = useState('AIzaSyBBRBZAtYjQWFVJfThCsnYh0ZAaCtiTsQE');
  const [channelId, setChannelId] = useState('UCkmMACUKpQeIxN9D9ARli1Q');
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
    setNeedFetch(true);
  };

  //fetches the data
  const fetchData = () => {
    const vidUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
    channelId +
    '&maxResults=50&order=date&type=video&key=' +
    apiKey;

    json(vidUrl).then((data1) => {
      setVideos(data1);
      const vids = data1.items;
      return json('https://www.googleapis.com/youtube/v3/videos?id='+VidIds({vids})+'&key='+apiKey+'&part=snippet,statistics,contentDetails').then((data2 =>{
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

  // console.log("videos");
  // console.log(videos);
  // // const vids = videos.items;
  // //the IDs of the videos returned
  // // console.log("video IDs: "+VidIds({vids}));
  // console.log('videoData');
  // console.log(videoData);


  const InputForm = useCallback(() =>{
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
  }, [] );

  //if the data has not loaded just show the intro and the input form
  if (!videoData) {
    return <>
    <Introduction/>
    <ChannelSearch apiKey={apiKey}/>
    <InputForm/>
  </>
  }

  //if the data has loaded
  return (
    <>
    <Introduction/>
    <ChannelSearch apiKey={apiKey}/>
    <InputForm/>
    <VideoList dataIn = {videoData} sliceSize={sliceSize}/>
    <ViewsChart dataIn={videoData} sliceSize={sliceSize}/>
    <TagsVisual dataIn={videoData}/>
    <TagsVisualRatio dataIn={videoData}/>
    <VideoUploads dataIn={videoData}/>
    </>
  );
}

export default App;
