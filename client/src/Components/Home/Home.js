import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
} from "@material-ui/core";
import "./Home.css";
import Slider from "./Components/Slider/Slider";
import { useDispatch, useSelector } from "react-redux";
import { HOME } from "../../Redux/Redux-actions/Actions";
import Error from "../Error/Error";
import NormalCard from "../Card/NormalCard";
import { withRouter } from "react-router";
import Secondary from "../Card/Secondary";
import { Link } from "react-router-dom";
import ListCard from "../Card/ListCard";

const Home = (props) => {
  const ser_err = useSelector((state) => state.Server.Server_Error);
  const ser_err_res = useSelector(
    (state) => state.Server.Server_Error_Response
  );
  const popular = useSelector((state) => state.Home.Popular);
  const latest = useSelector((state) => state.Home.Latest);
  const ongoing = useSelector((state) => state.Home.Ongoing);
  const recents = useSelector((state) => state.Home.Recents);
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(true);
  const Genre = [
    "Action",
    "Adventure",
    "Cars",
    "Comdey",
    "Dementia",
    "Demons",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Game",
    "Harem",
    "Hentai",
    "Historical",
    "Horror",
    "Josei",
    "Kids",
    "Magic",
    "Martial Arts",
    "Mecha",
    "Military",
    "Music",
    "Mystery",
    "Parody",
    "Police",
    "Psychological",
    "Romance",
    "Samurai",
    "School",
    "Sci-Fi",
    "Seinen",
    "Shoujo",
    "Shoijo Ai",
    "Shounen",
    "Shounen Ai",
    "Slice of Life",
    "Space",
    "Sports",
    "Super Power",
    "Supernatural",
    "Thriller",
    "Vampire",
    "Yaoi",
    "Yuri",
  ];
  let p;
  useEffect(() => {
    setAnimate(true);
    dispatch(HOME());
    setInterval(() => {
      setAnimate(false);
    }, 10000);
  }, []);

  if (popular !== undefined) {
    p = popular.slice(0, 5);
  }
  return (
    <div>
      {!animate && !ser_err ? (
        <>
          <Slider state={p} />
          <div
            className="Home"
            style={{
              display: "flex",
              alignContent: "center",
              margin: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                alignContent: "center",
                flexDirection: "column",
              }}
            >
              <Paper elevation={9} style={{ margin: 30 }}>
                <Typography align="left" variant="h4" style={{ margin: 20 }}>
                  Recents
                </Typography>
                <Divider />
                <div
                  className="recents"
                  style={{ margin: 30, display: "flex" }}
                >
                  {recents &&
                    recents.map((i) => {
                      return (
                        <NormalCard
                          key={i._id}
                          state={i}
                          onClick={() => {
                            props.history.push(`/anime/${i.anime_id}`);
                          }}
                        />
                      );
                    })}
                </div>
              </Paper>
              <Paper elevation={9} style={{ margin: 30 }}>
                <Typography align="left" variant="h4" style={{ margin: 20 }}>
                  Latest
                </Typography>
                <Divider />
                <div style={{ margin: 30 }}>
                  {latest &&
                    latest.map((i) => {
                      return (
                        <Secondary
                          key={i._id}
                          state={i}
                          onClick={() => {
                            props.history.push(`/anime/${i._id}`);
                          }}
                        />
                      );
                    })}
                </div>
              </Paper>
              <Paper elevation={9} style={{ margin: 30 }}>
                <Typography align="left" variant="h4" style={{ margin: 20 }}>
                  Onging
                </Typography>
                <Divider />
                <div style={{ margin: 30 }}>
                  <List>
                    {ongoing &&
                      ongoing.map((i, index) => {
                        return (
                          <div
                            onClick={() => {
                              props.history.push("/anime/" + i._id);
                            }}
                          >
                            <ListItem alignItems="flex-start">
                              <ListItemAvatar>
                                <Avatar alt={i.title} src={i.pic.url} />
                              </ListItemAvatar>
                              <ListItemText primary={i.title} />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                          </div>
                        );
                      })}
                  </List>
                </div>
              </Paper>
            </div>
            <div
              className="genre"
              style={{
                display: "flex",
                alignContent: "center",
                flexDirection: "column",
              }}
            >
              <Paper elevation={9} style={{ margin: 30 }}>
                <Typography align="left" variant="h4" style={{ margin: 20 }}>
                  Genre
                </Typography>
                <Divider />
                <div style={{ margin: 30 }}>
                  {Genre &&
                    Genre.map((i, index) => {
                      return (
                        <Button
                          key={index}
                          onClick={() => {
                            props.history.push("`/genre/${i}`");
                          }}
                          color="primary"
                          size="medium"
                          style={{ margin: 10 }}
                        >
                          {i}
                        </Button>
                      );
                    })}
                </div>
              </Paper>
              <Paper elevation={9} style={{ margin: 30 }}>
                <Typography align="left" variant="h4" style={{ margin: 20 }}>
                  Popular
                </Typography>
                <Divider />
                <div style={{ margin: 30 }}>
                  {p &&
                    p.map((i, index) => {
                      return (
                        <ListCard
                          key={i._id}
                          state={i}
                          index={index + 1}
                          onClick={() => {
                            props.history.push(`/anime/${i.anime_id}`);
                          }}
                        />
                      );
                    })}
                </div>
              </Paper>
            </div>
          </div>
        </>
      ) : (
        <div style={{ margin: 30, display: "flex", justifyContent: "center" }}>
          <CircularProgress
            style={{ alignSelf: "center", margin: 100 }}
            size={80}
          />
        </div>
      )}

      {ser_err && ser_err_res ? <Error server={ser_err_res} /> : null}
    </div>
  );
};

export default withRouter(Home);
