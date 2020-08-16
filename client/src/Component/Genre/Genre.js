import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  CircularProgress,
  Divider,
  Breadcrumbs,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import NormalCard from "../Card/NormalCard";
import {
  SERVER_RESPONSE_NULL,
  GET_GENRE,
} from "../../Redux/Redux-actions/Actions";
import { useSelector, useDispatch } from "react-redux";
import Error from "../Error/Error";

const Genre = (props) => {
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
  console.log(props.match.params.genre);

  const ser_res = useSelector((state) => state.Server.Server_Response);
  const ser_err = useSelector((state) => state.Server.Server_Error);
  const ser_err_res = useSelector(
    (state) => state.Server.Server_Error_Response
  );
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    dispatch(SERVER_RESPONSE_NULL());
    if (animate && props.match.params.genre) {
      dispatch(GET_GENRE(props.match.params.genre));
      setInterval(() => {
        setAnimate(false);
      }, 5000);
    } else {
      setAnimate(false);
    }
  }, []);

  const handelgenre = (genre) => {
    setAnimate(true);
    dispatch(GET_GENRE(genre));
    setInterval(() => {
      setAnimate(false);
    }, 5000);
  };

  function handleClick(event) {
    event.preventDefault();
    props.history.push("/");
  }

  return (
    <div style={{ margin: 20 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{
          margin: 30,
          backgroundColor: "#bdbdbd",
          padding: 10,
          borderRadius: 5,
          width: "auto",
        }}
      >
        <Link color="inherit" href="/" onClick={handleClick}>
          Baka Animiza
        </Link>
        <Typography color="textPrimary" style={{ fontWeight: "bold" }}>
          Genre
        </Typography>
      </Breadcrumbs>
      {Genre.map((i, index) => {
        return (
          <Link
            key={index}
            to={`/genre/${i}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant={
                props.match.params?.genre === i ? "contained" : "outlined"
              }
              onClick={() => {
                handelgenre(i);
              }}
              color="primary"
              size="medium"
              style={{ margin: 10, borderRadius: 20 }}
            >
              {i}
            </Button>
          </Link>
        );
      })}
      <Divider />
      {props.match.params.genre ? (
        <>
          <Typography
            color="textPrimary"
            variant="h4"
            align="left"
            style={{ fontWeight: "bold", margin: 16, marginLeft: 30 }}
          >
            {props.match.params.genre}
          </Typography>
          <Divider />
        </>
      ) : null}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          alignContent: "center",
        }}
      >
        {!animate && !ser_err ? (
          ser_res !== null && ser_res.length > 0 ? (
            ser_res.map((i) => {
              return (
                <NormalCard
                  key={i._id}
                  state={i}
                  onClick={() => {
                    props.history.push(`/anime/${i._id}`);
                  }}
                />
              );
            })
          ) : (
            <Typography
              variant="h2"
              display="block"
              align="center"
              style={{ margin: 60, width: "auto" }}
            >
              No Result!
            </Typography>
          )
        ) : (
          <CircularProgress
            style={{ alignSelf: "center", margin: 100 }}
            size={80}
          />
        )}
        {ser_err && ser_err_res ? <Error server={ser_err_res} /> : null}
      </div>
    </div>
  );
};

export default Genre;
