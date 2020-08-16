import React, { useState } from "react";
import "./Menubar.css";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  withStyles,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Typography,
  Slide,
} from "@material-ui/core";
import jwtdecode from "jwt-decode";
import {
  PowerSettingsNew,
  AccountCircle,
  MenuRounded,
  Sync,
  LibraryBooks,
  NewReleasesOutlined,
} from "@material-ui/icons";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignInAlt,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={4}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default () => {
  const jwt = localStorage.getItem("token");
  let data;
  if (jwt) {
    data = jwtdecode(jwt);
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const matches = useMediaQuery("(max-width:767px)");
  const [mlist, setMlist] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="menubar">
        {!matches ? (
          <div id="item1" className="menu" style={{ marginLeft: 65 }}>
            <Link to="/latest" className="link">
              <div className="button">
                <NewReleasesOutlined
                  style={{ color: "#00bfa5", marginLeft: "inherit" }}
                />
                <Typography variant="body1">Latest</Typography>
              </div>
            </Link>
            <Link to="/popular" className="link">
              <div className="button">
                <Typography variant="body1">
                  <FontAwesomeIcon
                    icon={faFire}
                    style={{
                      fontSize: 20,
                      marginRight: "inherit",
                      color: "#ff6e40",
                    }}
                  />
                  Popular
                </Typography>
              </div>
            </Link>
            <Link to="/genre" className="link">
              <div className="button">
                <LibraryBooks style={{ marginLeft: "inherit" }} />
                <Typography variant="body1">Genre</Typography>
              </div>
            </Link>
            <Link to="/ongoing" className="link">
              <div className="button">
                <Sync style={{ color: "#21ed73", marginLeft: "inherit" }} />
                <Typography variant="body1">Ongoing</Typography>
              </div>
            </Link>
          </div>
        ) : (
          <Button
            className="button"
            style={{ top: 10, height: 50, marginLeft: 35 }}
            onClick={() => {
              setMlist(!mlist);
            }}
          >
            <MenuRounded style={{ color: "white" }} />
            Menu
          </Button>
        )}
        {jwt ? (
          <div id="item2" className="menu" style={{ marginRight: 65 }}>
            <Button className="button" onClick={handleClick}>
              <Avatar
                alt="user"
                src="https://res.cloudinary.com/dzmydscig/image/upload/person_2_fzcp9e.png"
              />
              {data.name}
            </Button>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem>
                <Link
                  to="/profile"
                  onClick={handleClose}
                  style={{ textDecoration: "none" }}
                >
                  <ListItemIcon>
                    <AccountCircle fontSize="large" />
                    <ListItemText
                      primary="Profile"
                      style={{ paddingLeft: 10, color: "black" }}
                    />
                  </ListItemIcon>
                </Link>
              </StyledMenuItem>
              <StyledMenuItem>
                <Link
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.replace("/");
                    toast.info("Sign Out");
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <ListItemIcon>
                    <PowerSettingsNew fontSize="large" />
                    <ListItemText
                      primary="Logout"
                      style={{ paddingLeft: 10, color: "black" }}
                    />
                  </ListItemIcon>
                </Link>
              </StyledMenuItem>
            </StyledMenu>
          </div>
        ) : (
          <div id="item3" className="menu" style={{ marginRight: 55 }}>
            <Link to="/login" className="link">
              <div className="button">
                <Typography variant="h6">
                  <FontAwesomeIcon
                    icon={faSignInAlt}
                    style={{ fontSize: 20, marginRight: "inherit" }}
                  />
                  Login
                </Typography>
              </div>
            </Link>
            <Link to="/signup" className="link">
              <div className="button">
                <Typography variant="h6">
                  Sign Up
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    style={{ fontSize: 20, marginLeft: "inherit" }}
                  />
                </Typography>
              </div>
            </Link>
          </div>
        )}
      </div>
      <Slide
        id="item4"
        direction="right"
        in={mlist && matches}
        mountOnEnter
        unmountOnExit
      >
        <div style={{ marginTop: -15, display: "grid" }}>
          <ul style={{ backgroundColor: "#dc004e", listStyle: "none" }}>
            <li>
              <Link to="/latest" className="link">
                <div className="button">
                  <NewReleasesOutlined
                    style={{ color: "#00bfa5", marginLeft: "inherit" }}
                  />
                  <Typography variant="body1">Latest</Typography>
                </div>
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/popular" className="link">
                <div className="button">
                  <Typography variant="body1">
                    <FontAwesomeIcon
                      icon={faFire}
                      style={{
                        fontSize: 20,
                        marginRight: "inherit",
                        color: "#ff6e40",
                      }}
                    />
                    Popular
                  </Typography>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/genre" className="link">
                <div className="button">
                  <LibraryBooks style={{ marginLeft: "inherit" }} />
                  <Typography variant="body1">Genre</Typography>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/ongoing" className="link">
                <div className="button">
                  <Sync style={{ color: "#21ed73", marginLeft: "inherit" }} />
                  <Typography variant="body1">Ongoing</Typography>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </Slide>
    </div>
  );
};
