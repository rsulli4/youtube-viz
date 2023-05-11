import { json } from 'd3';
export const fetchVideoData = (url, dataSetter) => {
    json(url).then((data) => {dataSetter(data);});
};