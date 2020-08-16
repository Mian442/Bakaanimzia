import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  InputAdornment,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { toast } from "react-toastify";
import jwtdecode from "jwt-decode";
import NormalCard from "../../../../Card/NormalCard";
import DataTemplate from "../../../../Data/DataTemplate";
import {
  Search_Data,
  SEARCH_NULL,
} from "../../../../../Redux/Redux-actions/Actions";
import { useDispatch, useSelector } from "react-redux";

const UpdateAnime = (props) => {
  const [entity, setEntity] = useState("");
  const [animate, setAnimate] = useState(false);
  const [value, setValue] = useState(null);

  const Search_State = useSelector((state) => state.Search.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SEARCH_NULL());
  }, []);

  if (!localStorage.getItem("token")) {
    props.history.push("/login");
  } else {
    const jwt = localStorage.getItem("token");
    let user = jwtdecode(jwt);
    if (user.role !== "admin") {
      props.history.push("/not-authorized");
    }
  }

  const handelAnimate = () => {
    if (entity.length >= 3) {
      setAnimate(!animate);
      dispatch(
        Search_Data(entity, () => {
          setAnimate(false);
        })
      );
    } else {
      toast.error("Search String length must of 3 or greater!");
    }
  };

  return (
    <div
      className="NewAnime"
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        style={{ margin: 20, width: "95%" }}
      >
        Update Anime
      </Typography>
      <TextField
        variant="outlined"
        label="Search"
        color="secondary"
        style={{ margin: 40 }}
        id="standard-start-adornment"
        onChange={(e) => {
          setEntity(e.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handelAnimate}>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div
        style={{ display: "flex", justifyContent: "space-evenly" }}
        className="newepsearch"
      >
        {animate ? (
          <CircularProgress color="secondary" />
        ) : (
          Search_State?.map((i) => {
            return (
              <NormalCard
                key={i._id}
                state={i}
                onClick={() => {
                  setValue(i);
                }}
              />
            );
          })
        )}
      </div>
      {value ? (
        <DataTemplate InitalValue={value} pic={false} video={false} />
      ) : null}
    </div>
  );
};

export default UpdateAnime;
