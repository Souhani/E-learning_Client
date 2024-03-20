import React, { FC, useEffect, useState } from 'react'
import axios from 'axios';

type Props = {
    videoUrl: string;
    title: string;
}

const VideoPlayer:FC<Props> = ({ videoUrl, title }) => {
    const [videoData, setVideoData] = useState({
        otp:"",
        playbackInfo:""
    })
    useEffect(() => {
      axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/generate-video-url`,
      {
        videoId: videoUrl
      }).then(res => {
        setVideoData(res.data);
      })
    }, [videoUrl])
    
  return (
      <div style={{position:"relative", paddingTop:"56.25%", overflow:"hidden"}}>
         {videoData.otp && videoData.playbackInfo !=="" &&(
           <iframe
           src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=qfMoCrP4UO8RtzAb`}
           style={{
               position: "absolute",
               top:0,
               left:0,
               border: "0",
               width: "100%",
               height: "100%"}}
           allowFullScreen={true}
           allow="encrypted-media"></iframe>
         )}
      </div>
  )
}

export default VideoPlayer