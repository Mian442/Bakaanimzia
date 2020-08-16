import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import {
  HomeRounded,
  ListRounded,
  LocalLibraryRounded,
  Search,
} from "@material-ui/icons";
import { Link, withRouter } from "react-router-dom";
import "./NavBar.css";

function Navbar(props) {
  const [change, setChange] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: "#343A40",
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          display="block"
          align="center"
          style={{ color: "white" }}
        >
          <Link to="/" className="Text">
            <span style={{ color: "#17a2b8" }}>Baka </span>Animiza
          </Link>
        </Typography>
        <div
          className="wrap"
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            marginRight: 40,
            marginLeft: 20,
            height: 50,
          }}
        >
          <Button
            className="button"
            variant={change === 1 ? "contained" : null}
            color={change === 1 ? "primary" : ""}
            onClick={() => {
              setChange(1);
              props.history.push("/");
            }}
            style={{ color: "white", marginLeft: 10 }}
          >
            <HomeRounded
              style={{ marginTop: 10, marginLeft: 10, fontSize: 24 }}
            />
            <Typography
              variant="subtitle1"
              display="inline"
              style={{ marginTop: 10, marginRight: 20 }}
            >
              Home
            </Typography>
          </Button>
          <Button
            variant={change === 2 ? "contained" : null}
            color={change === 2 ? "primary" : ""}
            className="button"
            style={{
              color: "white",
              marginLeft: 10,
            }}
            onClick={() => {
              setChange(2);
              props.history.push("/animelist");
            }}
          >
            <ListRounded
              style={{ marginTop: 10, marginLeft: 10, fontSize: 24 }}
            />
            <Typography
              variant="subtitle1"
              display="inline"
              style={{ marginTop: 10, marginRight: 20 }}
            >
              List
            </Typography>
          </Button>
          <Button
            variant={change === 3 ? "contained" : null}
            color={change === 3 ? "primary" : ""}
            className="button"
            style={{
              color: "white",
              marginLeft: 10,
            }}
            onClick={() => {
              setChange(3);
              props.history.push("/manga");
            }}
          >
            <LocalLibraryRounded
              style={{ marginTop: 10, marginLeft: 10, fontSize: 24 }}
            />
            <Typography
              variant="subtitle1"
              display="inline"
              style={{ marginTop: 10, marginRight: 20 }}
            >
              Manga
            </Typography>
          </Button>
        </div>
        <div className="in">
          <input
            type="text"
            value={search}
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            style={{
              height: 30,
              borderRadius: 20,
              marginTop: 10,
              marginLeft: 10,
              marginBottom: 10,
              paddingLeft: 10,
              outline: "none",
              color: "black",
            }}
          />
          <i className="Iconstyle">
            <IconButton
              onClick={() => {
                props.history.push("/search/" + search);
              }}
            >
              <Search
                style={{
                  color: "black",
                  marginTop: 2,
                }}
                aria-label="search"
              />
            </IconButton>
          </i>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Navbar);
