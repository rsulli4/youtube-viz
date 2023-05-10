export const VideoList = ({data}) => {
    return (
    <div>
      <h3>Channel Name: {data.items[0].snippet.channelTitle}</h3>
      <h3>10 most recent videos</h3>
      {data.items.map(function(d, idx){
         return (<li key={d.id}>{d.snippet.title}</li>)
       })}
      </div>
    );
}