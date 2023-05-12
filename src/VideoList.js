export const VideoList = ({dataIn, sliceSize}) => {
  const data = dataIn.items.slice(0,sliceSize)
    return (
    <div>
      <h3>Channel Name: {data[0].snippet.channelTitle}</h3>
      <h3>{sliceSize} most recent videos</h3>
      {data.map(function(d, idx){
         return (<li key={d.id}>{d.snippet.title}</li>)
       })}
      </div>
    );
}