import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
  withStyles,
  TableCell,
  TableRow,
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  createMuiTheme,
} from "@material-ui/core";
import { Search, Create } from "@material-ui/icons";
import jwtdecode from "jwt-decode";
import { withRouter } from "react-router";
import NormalCard from "../../../../Card/NormalCard";
import {
  Search_Data,
  SEARCH_NULL,
  UPDATE_EPISODE,
} from "../../../../../Redux/Redux-actions/Actions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Info from "../../../../Messages/Info";
import Error from "../../../../Error/Error";

const theme = createMuiTheme({
  palette: {
    edit: "#4caf50",
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
  eidit: {
    width: "none",
    color: theme.palette.edit,
  },
});

const UpdateEpisode = (props) => {
  const classes = useStyles();
  const [entity, setEntity] = useState("");
  const [animate, setAnimate] = useState(false);
  const [value, setValue] = useState();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    props.Search_NUll();
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
        Update Episode
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
      <div style={{ margin: 20 }}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sir.</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {value
                ? value.episode.map((i, index) => {
                    return (
                      <StyledTableRow key={i._id}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            value={i.title}
                            variant="outlined"
                            size="small"
                            style={{ backgroundColor: "#ffffff" }}
                            onChange={(e) => {
                              e.persist();
                              let v = [...value.episode];
                              v[index].title = e.target.value;
                              setValue({ ...value, episode: v });
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton
                            className={classes.eidit}
                            onClick={() => {
                              let data = { ...i };
                              props.Update_ep(
                                value._id,
                                index,
                                data,
                                entity,
                                () => {
                                  setSuccess(true);
                                }
                              );
                            }}
                          >
                            <Create />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
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
};

const mapStateToProps = (state) => ({
  Search_State: state.Search.search,
  fir_res: state.Firestore.FireStore_Response,
  ser_res: state.Server.Server_Response,
  ser_err_res: state.Server.Server_Error_Response,
  ser_err: state.Server.Server_Error,
  fir_err: state.Firestore.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    Search_Data: (data, callback) => {
      dispatch(Search_Data(data, callback));
    },
    Search_NUll: () => {
      dispatch(SEARCH_NULL());
    },
    Update_ep: (id, index, data, entity, callback) => {
      dispatch(UPDATE_EPISODE(id, index, data, entity, callback));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateEpisode));
