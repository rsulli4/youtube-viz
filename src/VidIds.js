//extracts the video Ids from a list of videos
export const VidIds = ({vids}) => {
    let vid_ids="";
    let first_item = true;
    if(vids != null) {
      for (let vid of vids) {
        if(first_item) {
          vid_ids = vid.id.videoId;
          first_item = false;
        }
        else {
          vid_ids = vid_ids+","+vid.id.videoId;
        }
      }
      vid_ids = vid_ids;
    }
    return vid_ids;
  }