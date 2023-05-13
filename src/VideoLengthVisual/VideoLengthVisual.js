//used to parse out the PT\d*H\d*M\d*S
const ParseDuration = (data) => {
    const minReg = /\d+M/
    const hourReg = /\d+H/
    const secReg = /\d+S/
    // console.log(data[0]);
    // const min =minReg.exec(data)[0].slice(0,-1);
    // const hour= hourReg.exec(data)[0];
    // const sec =secReg.exec(data)[0];

    // console.log(min);
    // console.log(hour);
    // console.log(sec);
    // var duration = new Date(data);
    return 0;
}

export const VideoLengthVisual = ({dataIn}) =>{
    const data = dataIn.items;
    console.log(data)
    let videoDurationData = [];
    console.log(ParseDuration(data[0].contentDetails.duration))
    // for(let i = 0; i < data.length; i++) {
    //     videoDurationData.push({id:data[i].id, duration: })
    // }
    return <></>
}