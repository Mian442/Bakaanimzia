import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  useTheme,
  CircularProgress,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import Bookmarkcard from "../../../../Card/Bookmarkcard";
import { useSelector, useDispatch } from "react-redux";
import jwtdecode from "jwt-decode";
import {
  GET_PROFILE_DATA,
  DELETE_BOOKMARK,
} from "../../../../../Redux/Redux-actions/Actions";
import Error from "../../../../Error/Error";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Bookmark = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [animate, setAnimate] = useState(true);
  const ser_op_res = useSelector(
    (state) => state.Server.Server_Operation_Response
  );
  const ser_res = useSelector((state) => state.Server.Server_Response);
  const ser_err_res = useSelector(
    (state) => state.Server.Server_Error_Response
  );
  const ser_err = useSelector((state) => state.Server.Server_Error);
  const user = useSelector((state) => state.User.userinfo);
  const data = () => {
    dispatch(GET_PROFILE_DATA());
  };
  const delete_bookmark = (id, callback) => {
    dispatch(DELETE_BOOKMARK(id, callback));
  };
  let jwt = window.localStorage.getItem("token");
  let user_data;
  if (jwt) {
    user_data = jwtdecode(jwt);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setAnimate(true);
    if (jwt) {
      data();
    }
    setInterval(() => {
      setAnimate(false);
    }, 3000);
  }, []);

  if (!localStorage.getItem("token")) {
    props.history.push("/login");
  } else {
    if (user_data.role !== "user") {
      props.history.push("/not-authorized");
    }
  }
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{ display: "flex" }}
        >
          <Tab label="Bookmark" {...a11yProps(0)} />
          {/* <Tab label="All" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div style={{ display: "flex" }}>
            {!animate ? (
              user.bookmark.length > 0 ? (
                user.bookmark.map((i, index) => {
                  return (
                    <Bookmarkcard
                      key={i.anime_id}
                      state={i}
                      onselect={() => {
                        props.history.push("/anime/" + i.anime_id);
                      }}
                      onClick={() => {
                        delete_bookmark(
                          {
                            user_id: user_data._id,
                            index,
                          },
                          () => {
                            setSuccess(true);
                          }
                        );
                      }}
                    />
                  );
                })
              ) : (
                <Typography
                  variant="h2"
                  display="block"
                  align="center"
                  style={{ margin: 20, width: "auto" }}
                >
                  No Result!
                </Typography>
              )
            ) : (
              <div
                style={{
                  display: "flex",
                  width: "92%",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  style={{ alignSelf: "center", margin: 40 }}
                  size={40}
                />
              </div>
            )}
          </div>
        </TabPanel>
        {/* <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel> */}
      </SwipeableViews>
      {ser_err && ser_err_res ? <Error server={ser_err_res} /> : null}
    </div>
  );
};

export default withRouter(Bookmark);
