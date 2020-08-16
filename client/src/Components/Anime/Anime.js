import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_SINGLE_Anime,
  GET_PROFILE_DATA,
  ADD_BOOKMARK,
  DELETE_BOOKMARK,
} from "../../Redux/Redux-actions/Actions";
import {
  Button,
  Avatar,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableContainer,
  Typography,
  Breadcrumbs,
  Link,
  CircularProgress,
  Tooltip,
  Zoom,
  Fab,
  Snackbar,
} from "@material-ui/core";
import { Image } from "@chakra-ui/core";
import "./Anime.css";
import { withRouter } from "react-router";
import {
  CheckCircle,
  PlayArrowRounded,
  RadioButtonUnchecked,
  Add,
  Favorite,
  FavoriteBorderRounded,
  DeleteForeverRounded,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import Cookies from "universal-cookie";
import Error from "../Error/Error";
import Info from "../Messages/Info";
import jwtdecode from "jwt-decode";
import { toast } from "react-toastify";

const Anime = (props) => {
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const bookmark = (id, callback) => {
    dispatch(ADD_BOOKMARK(id, callback));
  };

  const delete_bookmark = (id, callback) => {
    dispatch(DELETE_BOOKMARK(id, callback));
  };

  const anime = (id, callback) => {
    dispatch(GET_SINGLE_Anime(id, callback));
  };
  const data = () => {
    dispatch(GET_PROFILE_DATA());
  };

  const ser_res = useSelector((state) => state.Server.Server_Response);
  const ser_err_res = useSelector(
    (state) => state.Server.Server_Error_Response
  );
  const ser_err = useSelector((state) => state.Server.Server_Error);
  const anime_not_fond = useSelector((state) => state.Server.Server_Anime);
  const ser_op_res = useSelector(
    (state) => state.Server.Server_Operation_Response
  );
  const user = useSelector((state) => state.User.userinfo);

  const [animate, setAnimate] = useState(true);
  const [alreadywatched, setAlreadywatched] = useState();
  const [bookmarked, setBookmarked] = useState(false);
  const [success, setSuccess] = useState(false);
  const jwt = window.localStorage.getItem("token");
  let user_data;
  if (jwt) {
    user_data = jwtdecode(jwt);
  }

  useEffect(() => {
    if (jwt) {
      data();
    }

    anime(props.match.params.id, (id) => {
      handelwatch(id);
      setInterval(() => {
        setAnimate(false);
      }, 3000);
    });
  }, []);

  function compare(a, b) {
    const bandA = a.index;
    const bandB = b.index;
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  useEffect(() => {
    if (!animate) {
      if (jwt) {
        if (user.bookmark.length > 0) {
          console.log("true", user);
          for (var i = 0; i < user.bookmark.length; i++) {
            if (user.bookmark[i].anime_id === props.match.params.id) {
              setBookmarked(true);
              break;
            }
          }
        }
      }
    }
  }, [animate]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  const handelBookmark = () => {
    let index;
    if (bookmarked) {
      for (var i = 0; i < user.bookmark.length; i++) {
        if (user.bookmark[i].anime_id === props.match.params.id) {
          index = i;
          break;
        }
      }
      delete_bookmark(
        {
          user_id: user_data._id,
          index,
        },
        () => {
          setSuccess(true);
          setBookmarked(false);
        }
      );
    } else {
      if (jwt) {
        bookmark(
          {
            user_id: user_data._id,
            id: ser_res._id,
            pic: ser_res.pic.url,
            title: ser_res.title,
          },
          () => {
            setSuccess(true);
            console.log(user);
            setBookmarked(true);
          }
        );
      } else {
        toast.error("Your are not Login!\nSign Up!");
      }
    }
  };

  const handelwatch = (id) => {
    let a = cookies.get(`${id}`);
    console.log(a);
    if (a !== undefined) {
      setAlreadywatched(a.sort(compare));
      console.log("true", a.length);
    }
  };

  function handleClick(event) {
    event.preventDefault();
    props.history.push("/");
  }

  if (anime_not_fond) {
    props.history.push("/not-found");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {!animate ? (
        <div className="Anime" style={{ width: "-webkit-fill-available" }}>
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{
              margin: 30,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
              width: "auto",
            }}
          >
            <Link color="inherit" href="/" onClick={handleClick}>
              Baka Animiza
            </Link>
            <Typography
              color="textPrimary"
              display="block"
              style={{ fontWeight: "bold", width: "auto" }}
            >
              {ser_res.title}
            </Typography>
          </Breadcrumbs>
          <Tooltip
            TransitionComponent={Zoom}
            title={bookmarked ? "Delete BookMark" : "Add BookMark"}
            placement="top"
            arrow
          >
            <Fab
              color="secondary"
              disabled={success}
              aria-label="add"
              size="large"
              style={{
                right: 32,
                bottom: 100,
                position: "fixed",
                zIndex: 1,
              }}
              onClick={handelBookmark}
            >
              {bookmarked ? (
                <DeleteForeverRounded />
              ) : (
                <FavoriteBorderRounded />
              )}
            </Fab>
          </Tooltip>
          <img
            src={ser_res.pic.url}
            alt={ser_res.title}
            style={{
              alignSelf: "center",
              margin: 20,
              border: "3px solid white",
              borderRadius: 10,
              width: 256,
              height: 312,
            }}
          />
          <Typography
            variant="h3"
            display="block"
            align="center"
            style={{ margin: 20, color: "white", width: "auto" }}
          >
            {ser_res.title}
          </Typography>
          <Paper
            elevation={9}
            square
            style={{
              display: "flex",
              margin: 20,
            }}
            className="details"
          >
            <div style={{ flexGrow: 4 }}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell align="left" style={{ width: "15%" }}>
                        Alternatives:
                      </TableCell>
                      <TableCell align="left">
                        {ser_res.alt_title.eng_jp},{ser_res.alt_title.jp_jp}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" style={{ width: "15%" }}>
                        Rating:
                      </TableCell>
                      <TableCell align="left">{ser_res.rating}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" style={{ width: "15%" }}>
                        Season:
                      </TableCell>
                      <TableCell align="left">{ser_res.season}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        align="left"
                        style={{ width: "15%", borderBottom: "none" }}
                      >
                        Status:
                      </TableCell>
                      <TableCell align="left" style={{ borderBottom: "none" }}>
                        {ser_res.status}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div
              style={{
                flexGrow: 1,
                flexWrap: "wrap",
                alignSelf: "center",
                margin: 20,
              }}
            >
              <Typography align="left" display="inline">
                Genre:
              </Typography>
              {ser_res.genre.map((i) => {
                return (
                  <Button
                    key={i}
                    size="small"
                    variant="outlined"
                    color="primary"
                    style={{ margin: 5, borderRadius: 20 }}
                    onClick={() => {
                      props.history.push("/genre/" + i);
                    }}
                  >
                    {i}
                  </Button>
                );
              })}
            </div>
          </Paper>
          <Paper square variant="outlined" style={{ padding: 20 }}>
            <Typography style={{ fontWeight: "bold" }}>Description:</Typography>
            <Typography display="inline">{ser_res.des}</Typography>
          </Paper>
          <Paper square>
            <Typography
              variant="h5"
              align="left"
              style={{ margin: 20, width: "auto" }}
            >
              Episodes
            </Typography>
            <TableContainer>
              <Table aria-label="simple table">
                <TableBody>
                  {ser_res.episode.map((i, index) => {
                    return (
                      <TableRow hover key={index}>
                        <TableCell align="left">
                          {alreadywatched &&
                          alreadywatched[index]?.index === index ? (
                            <CheckCircle color="secondary" />
                          ) : (
                            <RadioButtonUnchecked color="secondary" />
                          )}
                        </TableCell>
                        <TableCell
                          align="left"
                          onClick={() => {
                            props.history.push(
                              "/view/" + ser_res._id + "/" + i._id,
                              { index }
                            );
                          }}
                        >
                          <div>
                            <Typography variant="body2" align="left">
                              {ser_res.title} Episode {index + 1}
                            </Typography>
                            <Typography variant="caption">{i.title}</Typography>
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <PlayArrowRounded color="secondary" />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      ) : (
        <CircularProgress
          style={{ alignSelf: "center", margin: 100 }}
          size={80}
        />
      )}
      {ser_err && ser_err_res ? <Error server={ser_err_res} /> : null}
      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {ser_op_res ? ser_op_res.msg : null}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default withRouter(Anime);
