import { timeFormat } from "d3";
import { Scatterplot } from "./Scatterplot";

const runRegEx = (regEx, data) =>{
    const out = regEx.exec(data);
    if(out){
        return +out[0].slice(0,-1);
    }
    return 0//
}

//used to parse out the PT\d*H\d*M\d*S
const ParseDuration = (data) => {
    const minReg = /\d+M/
    const hourReg = /\d+H/
    const secReg = /\d+S/
    const min = runRegEx(minReg,data);
    const hour = runRegEx(hourReg,data);
    const sec = runRegEx(secReg,data);
    var duration = new Date(0,0,0,hour,min,sec,0);
    return duration;
}

export const VideoLengthVisual = ({dataIn}) =>{
    const data = dataIn.items;
    var videoDurationData = [];
    for(let i = 0; i < data.length; i++) {
        videoDurationData.push({id:data[i].id, duration: ParseDuration(data[i].contentDetails.duration), 
            views: data[i].statistics.viewCount,
            likes: data[i].statistics.likeCount,
            comments: data[i].statistics.commentCount,
            videoTitle: data[i].snippet.title})
    }
    
    return <Scatterplot data={videoDurationData}/>
}