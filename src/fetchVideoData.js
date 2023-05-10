import { json } from 'd3';
export const fetchVideoData = (url, dataSetter) => {
    // console.log("url fetch: "+url);
    json(url).then((data) => {dataSetter(data);});
  };