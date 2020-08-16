import React, { useEffect, useState } from "react";
import {} from "react-router-dom";
import {
  Button,
  Link,
  Divider,
  Typography,
  CircularProgress,
  Breadcrumbs,
} from "@material-ui/core";
import NormalCard from "../Card/NormalCard";
import {
  GET_LIST,
  SERVER_RESPONSE_NULL,
} from "../../Redux/Redux-actions/Actions";
import { useSelector, useDispatch } from "react-redux";
import Error from "../Error/Error";

const List = (props) => {
  const List = [];
  const ser_res = useSelector((state) => state.Server.Server_Response);
  const ser_err = useSelector((state) => state.Server.Server_Error);
  const ser_err_res = useSelector(
    (state) => state.Server.Server_Error_Response
  );
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(true);
  console.log(ser_res);
  useEffect(() => {
    dispatch(SERVER_RESPONSE_NULL());
    if (animate && props.match.params.alpha) {
      dispatch(GET_LIST(props.match.params.alpha));
      setInterval(() => {
        setAnimate(false);
      }, 8000);
    } else {
      setAnimate(false);
    }
  }, []);

  const handelalpha = (alpha) => {
    setAnimate(true);
    dispatch(GET_LIST(alpha));
    setInterval(() => {
      setAnimate(false);
    }, 5000);
  };
  for (var i = 0; i < 26; i++) {
    List.push(String.fromCharCode(65 + i));
  }

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
          List
        </Typography>
      </Breadcrumbs>
      {List.map((i, index) => {
        return (
          <Button
            style={{ margin: 5, width: 5 }}
            variant={props.match.params?.alpha === i ? "outlined" : "contained"}
            size="small"
            color={props.match.params?.alpha === i ? "secondary" : "primary"}
            onClick={() => {
              handelalpha(i);
              props.history.push(`/animelist/${i}`);
            }}
          >
            {i}
          </Button>
        );
      })}
      <Divider />
      {props.match.params.alpha ? (
        <>
          <Typography
            color="textPrimary"
            variant="h4"
            align="left"
            style={{ fontWeight: "bold", margin: 16, marginLeft: 30 }}
          >
            {props.match.params.alpha}
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

export default List;
