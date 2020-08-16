import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { GET_SINGLE_Anime } from "../../Redux/Redux-actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import Video from "../Video/Video";
import {
  Typography,
  Breadcrumbs,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { withRouter } from "react-router";
import "./View.css";
import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@chakra-ui/core";
import Cookies from "universal-cookie";
import Error from "../Error/Error";

const View = (props) => {
  const dispatch = useDispatch();
  const anime = (id, callback) => {
    dispatch(GET_SINGLE_Anime(id, callback));
  };
  const ser_res = useSelector((state) => state.Server.Server_Response);
  const ser_err_res = useSelector(
    (state) => state.Server.Server_Error_Response
  );
  const ser_err = useSelector((state) => state.Server.Server_Error);
  const [animate, setAnimate] = useState(true);
  const [watched, setWatched] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    anime(props.match.params.id, (id) => {
      handelwatch(id);
      setInterval(() => {
        setAnimate(false);
      }, 3000);
    });
  }, []);

  const handelwatch = (id) => {
    let a = cookies.get(`${id}`);
    console.log(a);
    if (a !== undefined) {
      console.log("true", a.length);
      for (var i = 0; i < a.length; i++) {
        console.log(
          a[i].index === props.location.state.index,
          a[i].index,
          props.location.state.index
        );
        if (a[i].index === props.location.state.index) {
          console.log("LOOP true");
          setWatched(true);
          console.log("set done");
          break;
        }
      }
      console.log(watched);
    }
  };

  console.log("g", watched);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: 30,
      }}
    >
      {!animate ? (
        <div style={{ width: "-webkit-fill-available" }}>
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{
              backgroundColor: "#bdbdbd",
              padding: 10,
              borderRadius: 5,
              width: "auto",
            }}
          >
            <span
              className="text"
              style={{ color: "inherit", cursor: "pointer" }}
              onClick={() => {
                props.history.push("/");
              }}
            >
              Baka Animiza
            </span>
            <Typography
              color="textPrimary"
              display="block"
              style={{ color: "inherit", width: "auto", cursor: "pointer" }}
            >
              <span
                onClick={() => {
                  props.history.push("/anime/" + ser_res._id);
                }}
                className="text"
              >
                {ser_res.title}
              </span>
            </Typography>
            <Typography
              color="textPrimary"
              display="block"
              style={{ fontWeight: "bold", width: "auto" }}
            >
              {ser_res.title} Episode {props.location.state.index + 1}
            </Typography>
          </Breadcrumbs>
          <Divider />
          <div style={{ display: "flex", margin: 30 }}>
            <img
              src={ser_res.pic.url}
              alt={ser_res.title}
              style={{
                width: 126,
                height: 170,
              }}
            />
            <div style={{ marginLeft: 5, margin: 10 }}>
              <Typography
                variant="h6"
                style={{ width: "auto", fontWeight: "bolder" }}
              >
                {ser_res.title} Episode {props.location.state.index + 1}
              </Typography>
              <Typography color="inherit" variant="body1" align="left">
                {ser_res.episode[props.location.state.index].title}
              </Typography>
            </div>
          </div>
          <Divider />
          <Tabs variant="enclosed" style={{ margin: 30 }}>
            <TabList>
              <Tab
                _selected={{ color: "white", bg: "green.500", border: "none" }}
              >
                Fire Store
              </Tab>
              <Tab
                _selected={{ color: "white", bg: "blue.400", border: "none" }}
              >
                Server 2
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Video
                  src={ser_res.episode[props.location.state.index].url}
                  id={ser_res._id}
                  index={props.location.state.index}
                  watch={watched}
                />
              </TabPanel>
              <TabPanel>
                <p>Working....</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      ) : (
        <CircularProgress
          style={{ alignSelf: "center", margin: 100 }}
          size={80}
        />
      )}
      {ser_err && ser_err_res ? <Error server={ser_err_res} /> : null}
    </div>
  );
};

export default withRouter(View);
