import { Histogram } from "./Histogram/Historgram";
import {range} from "d3";
import { Scatterplot } from "./scatterplot/Scatterplot";

const CheckDayTime = (data, day, hour) => {
    for(let i = 0; i < data.length; i++) {
        if((hour+"|"+day) === data[i].id) {
            return i;
        }
    }
    return -1
}

export const VideoUploads = ({dataIn}) => {
    //visualization made to show what times youtuber uploads

    //process the data for our histogram
    const data = dataIn.items;
    var dayOfWeek = [];
    var hours =[];
    //stores {day, hour, times uploar at this day and time}
    var dayHourData=[];
    for(let i = 0; i < data.length; i++) {
        const date = new Date(data[i].snippet.publishedAt);
        const day = date.getDay();
        const hour =date.getHours()
        dayOfWeek.push(day);//note: domain 0-6
        hours.push(hour);//note: domain 0-23
        //has this date/time been used before
        const check = CheckDayTime(dayHourData,day,hour);
        if(check>=0){
            dayHourData[check] = {id: hour+"|"+day ,day: day, hour: hour, count: dayHourData[check].count+1}
        }
        else{//if not add new entry
            dayHourData.push({id: hour+"|"+day ,day: day, hour: hour, count: 1});
        }
        
    }

    const width = 960;
    const height = 500;
    const hoursDomain = [0,23];
    const hoursThreshold = range(0,24);


    return <>
        <Histogram data={hours} height={height} width={width} domain={hoursDomain} threshold={hoursThreshold}/>
        <Scatterplot data={dayHourData}/>
    </>
}