import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Typography,
  CircularProgress,
  Breadcrumbs,
  Divider,
} from "@material-ui/core";
import Secondary from "../Card/Secondary";
import { withRouter } from "react-router";
import {
  GET_POPULAR,
  SERVER_RESPONSE_NULL,
} from "../../Redux/Redux-actions/Actions";
import Error from "../Error/Error";
import { Link } from "react-router-dom";

const Popular = (props) => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    props.popular();
    setInterval(() => {
      setAnimate(false);
    }, 3000);
  }, []);

  function handleClick(event) {
    event.preventDefault();
    props.history.push("/");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
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
          Popular
        </Typography>
      </Breadcrumbs>
      <Typography
        color="textPrimary"
        variant="h2"
        align="left"
        style={{ fontWeight: "bold", margin: 16, marginLeft: 30 }}
      >
        Popular
      </Typography>
      <Divider />
      {!animate && !props.ser_err ? (
        props.ser_res !== null && props.ser_res.length !== 0 ? (
          props.ser_res.map((i) => {
            return (
              <Secondary
                key={i._id}
                state={i}
                onClick={() => {
                  console.log("ff");
                  props.history.push(`/anime/${i.anime_id}`);
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
      {props.ser_err && props.ser_err_res ? (
        <Error server={props.ser_err_res} />
      ) : null}
    </div>
  );
};
const mapStateToProps = (state) => ({
  ser_res: state.Server.Server_Response,
  ser_err: state.Server.Server_Error,
  ser_err_res: state.Server.Server_Error_Response,
});

const mapDispatchToProps = (dispatch) => {
  return {
    popular: () => {
      dispatch(GET_POPULAR());
    },
    ser_res_null: () => {
      dispatch(SERVER_RESPONSE_NULL());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Popular));
