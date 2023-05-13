import { useState, useEffect, useCallback } from "react"
import { json } from 'd3';

export const ChannelSearch = (apiKey) => {
    const [searchName, setSearchName] = useState('Markiplier');
    const [needFetch, setNeedFetch] = useState(false);
    const [searchResult, setSearchResult] = useState(false);

    const handleChange = (event) => {
        setSearchName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setNeedFetch(true);
    };
    //fetches the data
  const fetchData = () => {
    const url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q="+searchName+"&type=channel&key="+apiKey.apiKey;
    json(url).then((data) => {setSearchResult(data);});
  };

    useEffect(() => {
        if(needFetch){
          setNeedFetch(false);
          fetchData();
        }
      }, [needFetch]);

    const InputForm = useCallback(() => {
        return <div className='channelInputForm'>
            <form onSubmit={handleSubmit}>
                <label>
                    Search Channel By Name:
                    <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    defaultValue={searchName}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    }, [] );
    
      
    if(!searchResult) {
        return <>
        <InputForm/>
        </>
    }
    
    const ChannelResultsTable = () =>{
        return <>
        {searchResult.items.map(function(d, idx){
         return (<li key={d.id.channelId}>{d.snippet.title}: {d.snippet.channelId}</li>)
       })}
        </>
    }

    return <>
    <InputForm/>
    <div className="channelResultsTable">
        <ChannelResultsTable/>
    </div>
    </>
    
}