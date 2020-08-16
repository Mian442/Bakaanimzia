import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import NormalCard from "../../../../Card/NormalCard";
import { Search } from "@material-ui/icons";
import CustomTable from "../../Table/Table";
import { toast } from "react-toastify";
import jwtdecode from "jwt-decode";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  Search_Data,
  SEARCH_NULL,
  DELETE_EPISODE,
} from "../../../../../Redux/Redux-actions/Actions";
import Error from "../../../../Error/Error";
import Info from "../../../../Messages/Info";

const mapStateToProps = (state) => ({
  fir_res: state.Firestore.FireStore_Response,
  ser_res: state.Server.Server_Response,
  ser_err_res: state.Server.Server_Error_Response,
  ser_err: state.Server.Server_Error,
  fir_err: state.Firestore.error,
  Search_State: state.Search.search,
});

const mapDispatchToProps = (dispatch) => {
  return {
    Del_ep: (id, index, entity, callback) => {
      dispatch(DELETE_EPISODE(id, index, entity, callback));
    },
    Search_reset: () => {
      dispatch(SEARCH_NULL());
    },
    Search_Data: (name, callback) => {
      dispatch(Search_Data(name, callback));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withRouter((props) => {
    const [entity, setEntity] = useState("");
    const [animate, setAnimate] = useState(false);
    const [success, setSuccess] = useState(false);
    const [value, setValue] = useState(null);

    useEffect(() => {
      props.Search_reset();
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
        props.Search_Data(entity, () => {
          setAnimate(false);
        });
      } else {
        toast.error("Search String length must of 3 or greater!");
      }
    };

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h3"
          align="center"
          style={{ margin: 20, width: "95%" }}
        >
          Delete Episode
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
            props.Search_State?.map((i) => {
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
        <Typography variant="h5" style={{ margin: 30, width: "90%" }}>
          Selceted Series:{value?.title}
        </Typography>
        <CustomTable
          episode={value?.episode ? value.episode : []}
          handlerdel={(data) => {
            props.Del_ep(value._id, data.index, entity, () => {
              setSuccess(true);
            });
          }}
        />
        {(props.ser_err || props.fir_err) &&
        (props.ser_err_res || props.fir_res) ? (
          <Error server={props.ser_err_res} firebase={props.fir_res} />
        ) : null}
        {success && props.ser_res ? (
          <Info
            server={props.ser_res}
            firebase={props.fir_res}
            callback={() => {
              let a = [...props.Search_State];
              for (var i = 0; i < a.length; i++) {
                if (a[i]._id === value._id) {
                  setValue(a[i]);
                  break;
                }
              }
              setSuccess(false);
            }}
          />
        ) : null}
      </div>
    );
  })
);
