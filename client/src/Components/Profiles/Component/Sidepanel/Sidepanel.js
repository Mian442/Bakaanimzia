import React from "react";
import {
  Paper,
  ListItem,
  List,
  ListSubheader,
  Button,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core";
import {
  AddRounded,
  PlaylistAddRounded,
  Settings,
  DeleteForeverRounded,
  Create,
  BookRounded,
} from "@material-ui/icons";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sideoanel.css";
import { faEdit, faFire } from "@fortawesome/free-solid-svg-icons";
import jwtdecode from "jwt-decode";

const theme = createMuiTheme({
  palette: {
    edit: "#00bfa5",
  },
});

const styles = makeStyles({
  sidepanelbtn: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    width: "100%",
    fontSize: 12,
    justifyContent: "start",
  },
  icon_edit: {
    color: theme.palette.edit,
  },
});

const Sidepanel = (props) => {
  const classes = styles();
  let user;
  if (!localStorage.getItem("token")) {
    props.history.push("/login");
  } else {
    const jwt = localStorage.getItem("token");
    user = jwtdecode(jwt);
  }

  return (
    <div className="sticky2 sd">
      <Paper variant="outlined" square elevation={8}>
        <List subheader={<ListSubheader>Settings</ListSubheader>}>
          {user.role === "admin" ? (
            <>
              {/* <ListItem>
                <Button
                  color="secondary"
                  variant={props.var.NewAdmin}
                  className={classes.sidepanelbtn}
                  size="small"
                  onClick={() => {
                    props.history.push("/profile/anime/new_admin");
                  }}
                >
                  <PersonAddRounded
                    style={{ color: "#21ed73", fontSize: 28, paddingRight: 2 }}
                  />
                  New Admin
                </Button> 
              </ListItem>*/}
              <ListItem>
                <Button
                  color="secondary"
                  variant={props.var.NewAnime}
                  className={classes.sidepanelbtn}
                  size="small"
                  onClick={() => {
                    props.history.push("/profile/anime/new");
                  }}
                >
                  <AddRounded
                    style={{ color: "#21ed73", fontSize: 28, paddingRight: 2 }}
                  />
                  New Anime
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  color="secondary"
                  variant={props.var.UpdateAn}
                  className={classes.sidepanelbtn}
                  onClick={() => {
                    props.history.push("/profile/anime/update_anime");
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    color="#00bfa5"
                    style={{ marginRight: 5, fontSize: 20 }}
                  />
                  Update Anime
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  color="secondary"
                  variant={props.var.DeleteAn}
                  className={classes.sidepanelbtn}
                  size="small"
                  onClick={() => {
                    props.history.push("/profile/anime/delete_anime");
                  }}
                >
                  <DeleteForeverRounded
                    style={{ fontSize: 28, paddingRight: 2 }}
                  />
                  Delete Anime
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  color="secondary"
                  variant={props.var.NewEpisode}
                  className={classes.sidepanelbtn}
                  size="small"
                  onClick={() => {
                    props.history.push("/profile/anime/new_episode");
                  }}
                >
                  <PlaylistAddRounded
                    style={{
                      color: "#21ed73",
                      fontSize: 28,
                      paddingRight: 2,
                      marginLeft: 3,
                    }}
                  />
                  New Episode
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  color="secondary"
                  variant={props.var.UpdateEp}
                  className={classes.sidepanelbtn}
                  size="small"
                  onClick={() => {
                    props.history.push("/profile/anime/update_episode");
                  }}
                >
                  <Create className={classes.icon_edit} />
                  Update Episode
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  color="secondary"
                  variant={props.var.DeleteEp}
                  className={classes.sidepanelbtn}
                  size="small"
                  onClick={() => {
                    props.history.push("/profile/anime/delete_episode");
                  }}
                >
                  <DeleteForeverRounded
                    style={{ fontSize: 28, paddingRight: 2 }}
                  />
                  Delete Episode
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  color="secondary"
                  variant={props.var.Popular}
                  className={classes.sidepanelbtn}
                  onClick={() => {
                    props.history.push("/profile/anime/add/popular");
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFire}
                    style={{
                      fontSize: 20,
                      marginRight: "inherit",
                      color: "#ff6e40",
                      paddingRight: 3,
                      marginLeft: 3,
                    }}
                  />
                  Add Popular
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  color="secondary"
                  variant={props.var.Populardel}
                  className={classes.sidepanelbtn}
                  onClick={() => {
                    props.history.push("/profile/anime/delete/popular");
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFire}
                    style={{
                      fontSize: 20,
                      marginRight: "inherit",
                      color: "#ff6e40",
                      paddingRight: 3,
                      marginLeft: 3,
                    }}
                  />
                  Delete Popular
                </Button>
              </ListItem>
            </>
          ) : (
            <ListItem>
              <Button
                color="secondary"
                variant={props.var.Bookmark}
                className={classes.sidepanelbtn}
                size="small"
                onClick={() => {
                  props.history.push("/profile/user/bookmarks");
                }}
              >
                <BookRounded style={{ fontSize: 28, paddingRight: 2 }} />
                BookMarks
              </Button>
            </ListItem>
          )}
          <ListItem>
            <Button
              color="secondary"
              variant={props.var.Profile}
              className={classes.sidepanelbtn}
              size="small"
              onClick={() => {
                props.history.push("/profile/user/");
              }}
            >
              <Settings
                style={{ color: "#b8b8b8", fontSize: 28, paddingRight: 2 }}
              />
              Profile
            </Button>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
};

export default withRouter(Sidepanel);
