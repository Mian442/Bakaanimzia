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
import { Search_Data, SEARCH_NULL } from "../../Redux/Redux-actions/Actions";
import { useSelector, useDispatch } from "react-redux";
import Error from "../Error/Error";
import { Alert } from "@material-ui/lab";

const Search = (props) => {
  const ser_res = useSelector((state) => state.Search.search);
  const ser_err = useSelector((state) => state.Server.Server_Error);
  const ser_err_res = useSelector(
    (state) => state.Server.Server_Error_Response
  );
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    dispatch(SEARCH_NULL());
    setAnimate(true);
    dispatch(
      Search_Data(props.match.params.search, () => {
        setInterval(() => {
          setAnimate(false);
        }, 5000);
      })
    );
  }, [props.match.params.search]);

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
          Search
        </Typography>
      </Breadcrumbs>
      {!animate ? (
        <>
          <Typography
            color="textPrimary"
            variant="h4"
            align="left"
            style={{ fontWeight: "bold", margin: 16, marginLeft: 30 }}
          >
            Result Found{" "}
            {ser_res !== null && ser_res.length !== 0 ? ser_res.length : 0}
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
      <Alert severity="info">
        <div>
          Seraching based on:
          <ul>
            <li>The Title Must Match with the Engilsh Title on the MAL</li>
          </ul>
        </div>
      </Alert>
    </div>
  );
};

export default Search;
