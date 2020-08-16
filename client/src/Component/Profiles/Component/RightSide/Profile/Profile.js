import React, { useState, useEffect } from "react";
import {
  Badge,
  IconButton,
  Avatar,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Typography,
  LinearProgress,
  Backdrop,
  Fade,
  Paper,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPowerOff,
  faBookmark,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";
import { Create } from "@material-ui/icons";
import { connect } from "react-redux";
import { GET_PROFILE_DATA } from "../../../../../Redux/Redux-actions/Actions";
import Error from "../../../../Error/Error";

const Profile = (props) => {
  const [animate, setAnimate] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  // const handleToggle = () => {
  //   setOpen(!open);
  // };

  useEffect(() => {
    props.USER();
    setInterval(() => {
      setAnimate(false);
    }, 5000);
  }, []);
  console.log(props.USER_DATA);
  const [img, setImg] = useState(null);

  if (animate === true) {
    return <LinearProgress style={{ marginTop: 280, width: "100%" }} />;
  }
  return (
    <div className="profilem">
      {!props.ser_err && props.ser_res ? (
        <>
          <input
            type="file"
            id="profilepic"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files[0].size / (1024 * 1024) <= 15) {
                setImg(e.target.files[0]);
              }
            }}
          />
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <label htmlFor="profilepic">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <Create
                    className="Profilepen"
                    style={{ fontSize: 42, padding: 2 }}
                  />
                </IconButton>
              </label>
            }
          >
            <Avatar
              src={
                props.USER_DATA?.pic
                  ? props.USER_DATA.pic
                  : require("./user.png")
              }
              style={{
                width: 180,
                height: 180,
                backgroundColor: "#878686",
                marginTop: 20,
                marginBottom: 5,
              }}
            />
          </Badge>
          <Backdrop open={open} onClick={handleClose}>
            <Fade>
              <Paper>
                <Typography variant="h3" align="left">
                  Upload Profile Image!
                </Typography>
                <hr />
              </Paper>
            </Fade>
          </Backdrop>
          <Typography
            variant="h5"
            align="center"
            style={{ width: "100%", margin: 10 }}
          >
            username
          </Typography>
          <Card
            variant="outlined"
            elevation={6}
            style={{ margin: 20, width: "90%" }}
          >
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <FontAwesomeIcon icon={faUser} /> Name
                    </TableCell>
                    <TableCell align="right">{props.USER_DATA.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <FontAwesomeIcon icon={faEnvelope} /> Email
                    </TableCell>
                    <TableCell align="right">{props.USER_DATA.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <FontAwesomeIcon icon={faCogs} /> Sevice Role
                    </TableCell>
                    <TableCell align="right">{props.USER_DATA.role}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <FontAwesomeIcon icon={faBookmark} /> BookMarked
                    </TableCell>
                    <TableCell align="right">
                      {props.USER_DATA.bookmark}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Button
            variant="outlined"
            color="secondary"
            style={{ margin: 20 }}
            onClick={() => {
              window.localStorage.removeItem("token");
              window.location.href("/");
            }}
          >
            <FontAwesomeIcon
              icon={faPowerOff}
              size="2x"
              style={{ paddingRight: 10 }}
            />
            logout
          </Button>
        </>
      ) : null}
      {(props.ser_err || props.fir_err) &&
      (props.ser_err_res || props.fir_res) ? (
        <Error server={props.ser_err_res} firebase={props.fir_res} />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  USER_DATA: state.User.userinfo,
  ser_err_res: state.Server.Server_Error_Response,
  ser_res: state.Server.Server_Response,
  ser_err: state.Server.Server_Error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    USER: () => {
      dispatch(GET_PROFILE_DATA());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
