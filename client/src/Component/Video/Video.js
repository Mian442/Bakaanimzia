import React, { useState } from "react";
import ReactPlayer from "react-player";
import { IconButton } from "@material-ui/core";
import { PlayCircleFilled } from "@material-ui/icons";
import "./Video.css";
import Cookies from "universal-cookie";

const Video = (props) => {
  const [watchvideo, setWatchvideo] = useState(props.watch);
  const [play, setPlay] = useState(false);
  const cookies = new Cookies();

  const handelprogress = ({ played }) => {
    if (played >= 0.65 && !watchvideo) {
      setWatchvideo(true);
      let a = cookies.get(`${props.id}`);
      console.log(a);
      if (a === undefined) {
        let b = [];
        b.push({ index: props.index });
        cookies.set(`${props.id}`, JSON.stringify(b), { path: "/" });
        console.log("true", cookies.get(`${props.id}`));
      } else {
        a.push({ index: props.index });
        cookies.set(`${props.id}`, JSON.stringify(a), { path: "/" });
        console.log("false", cookies.get(`${props.id}`));
      }
    }
  };

  return (
    <div className="player-div">
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url={props.src}
          light="https://www.rtings.com/images/test-materials/2016/5-percent.png"
          playing={play}
          pip={true}
          width="100%"
          height="100%"
          onProgress={handelprogress}
          playIcon={
            <IconButton
              onClick={() => {
                setPlay(!play);
              }}
            >
              <PlayCircleFilled style={{ fontSize: 72, color: "white" }} />
            </IconButton>
          }
          controls={true}
        />
      </div>
    </div>
  );
};

export default Video;
