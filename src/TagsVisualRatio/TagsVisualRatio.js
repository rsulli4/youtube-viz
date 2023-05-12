import { Scatterplot } from "./Scatterplot";


export const TagsVisualRatio = ({dataIn}) => {

    //checks if a tag is alreagy in the data and returns the index
    const TagExists = (tagData, tag) =>{
        for(let i = 0; i < tagData.length; i++) {
            if(tagData[i].tag===tag) {
                return i;
            }
        }
        return -1;
    }

    //make sure data is there
    if (!dataIn) {
        return <pre>Loading...</pre>;
    }
    //process the data
    const dataItems = dataIn.items;
    //get times tag was used and total views on video with tag
    var data = []
    for (let i = 0; i < dataItems.length; i++) {
        //get each video
        const item = dataItems[i];
        if(!item.snippet.tags){
            continue;
        }
        //get each tag
        for(let j = 0; j<item.snippet.tags.length; j++) {
            const tag = item.snippet.tags[j];
            const tagIndex = TagExists(data, tag);
            //if the tag is already there update it
            if(tagIndex>=0) {
                data[tagIndex] = {tag: tag, views: data[tagIndex].views + +item.statistics.viewCount, uses: data[tagIndex].uses+1, likes: data[tagIndex].likes + +item.statistics.likeCount};
            }
            else { //new tag add it
                data.push({tag: tag, views: +item.statistics.viewCount, uses: 1, likes: +item.statistics.likeCount});
            }    
        }
        
    }

    if(data.length <=0 ) {
        return <pre>This Channel Does Not Use Tags</pre>;
    }

    // console.log(data);

    return <Scatterplot data={data}/>

}