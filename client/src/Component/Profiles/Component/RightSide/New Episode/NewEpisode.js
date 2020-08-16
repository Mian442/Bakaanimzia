import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import {
  withStyles,
  makeStyles,
  Typography,
  TextField,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import {
  VideoLibrary,
  AddRounded,
  DeleteForever,
  Search,
} from "@material-ui/icons";
import { Button } from "@chakra-ui/core";
import jwtdecode from "jwt-decode";
import { toast } from "react-toastify";
import NormalCard from "../../../../Card/NormalCard";
import { connect } from "react-redux";
import * as Yup from "yup";
import {
  Search_Data,
  SEARCH_NULL,
  NEW_EPISODE,
  FIRESTORE_UPLOAD_NULL,
} from "../../../../../Redux/Redux-actions/Actions";
import Error from "../../../../Error/Error";
import Info from "../../../../Messages/Info";
import Upload from "../../../../Upload/Upload";
import { Formik, Form, FieldArray } from "formik";

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
});

const NewEpisode = (props) => {
  const classes = useStyles();
  const [video, setVideo] = useState(null);
  const [eptitle, setEptitle] = useState("");
  const [animate, setAnimate] = useState(false);
  const [entity, setEntity] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [success, setSuccess] = useState(false);
  const ValidationSchema = Yup.object({
    episode: Yup.array()
      .of(
        Yup.object({
          index: Yup.number(),
          title: Yup.string(),
          file: null,
          size: Yup.string(),
        })
      )
      .required(),
  });

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

  const handledata = (data, op) => {
    console.log(data);
    var d = { ...data };
    op.setSubmitting(true);
    setOpen(true);
    props.New_ep(value, d, () => {
      op.setSubmitting(false);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h3"
        align="center"
        style={{ margin: 20, width: "95%" }}
      >
        New Episode
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
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
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
      <Formik
        initialValues={{ episode: [] }}
        validationSchema={ValidationSchema}
        onSubmit={handledata}
      >
        {({ values, isSubmitting, resetForm }) => (
          <Form>
            <FieldArray name="episode">
              {(arrayHelpers) => (
                <div>
                  <div
                    style={{
                      margin: 20,
                      width: "93%",
                      flexDirection: "row",
                    }}
                    className="video"
                  >
                    <Typography
                      style={{ paddingTop: 10, marginLeft: 20 }}
                      align="left"
                    >
                      Insert Episode
                    </Typography>
                    <TextField
                      label="Episode Title"
                      placeholder="Name"
                      variant="outlined"
                      value={eptitle}
                      style={{ margin: 20 }}
                      onChange={(e) => {
                        setEptitle(e.target.value);
                      }}
                    />
                    <input
                      accept="video/*"
                      style={{ display: "none" }}
                      id="icon-button-video-file"
                      type="file"
                      onChange={(e) => {
                        console.log(e.target.files);
                        if (e.target.files[0].size / (1024 * 1024) <= 100) {
                          setVideo(e.target.files[0]);
                        } else {
                          toast.error("Video Size is Larger than 100MB");
                        }
                      }}
                    />
                    <label
                      htmlFor="icon-button-video-file"
                      style={{ display: "flex" }}
                    >
                      <Typography
                        variant="subtitle1"
                        align="left"
                        style={{
                          width: 60,
                          paddingTop: 10,
                          marginLeft: 20,
                        }}
                      >
                        Video
                      </Typography>
                      <IconButton
                        color="secondary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <VideoLibrary />
                      </IconButton>
                      {video === null ? null : (
                        <Typography
                          variant="subtitle1"
                          style={{ paddingTop: 10, width: "100%" }}
                          color="secondary"
                        >
                          {video.name} {(video.size / (1024 * 1024)).toFixed(4)}
                          Mb
                        </Typography>
                      )}
                    </label>
                    <Button
                      variantColor="blue"
                      variant="solid"
                      borderColor="blue.500"
                      leftIcon={AddRounded}
                      style={{ margin: 20 }}
                      onClick={() => {
                        if (video && eptitle !== "") {
                          arrayHelpers.push({
                            index: values.episode.length,
                            title: eptitle,
                            file: video,
                            size: (video.size / (1024 * 1024)).toFixed(4),
                          });
                          setEptitle("");
                          setVideo(null);
                        } else {
                          toast.error("Episode Info is Missing!");
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Sir.</StyledTableCell>
                          <StyledTableCell align="right">Title</StyledTableCell>
                          <StyledTableCell align="right">
                            File Name
                          </StyledTableCell>
                          <StyledTableCell align="right">Size</StyledTableCell>
                          <StyledTableCell align="right">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {values.episode.map((i, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                              {i.index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {i.title}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {i.file.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {i.size}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <IconButton
                                color="secondary"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                              >
                                <DeleteForever />
                              </IconButton>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
            </FieldArray>
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Submitting"
              variantColor="teal"
              variant="outline"
              style={{
                margin: 25,
                borderRadius: 20,
                width: "92%",
                alignSelf: "center",
                fontSize: 16,
              }}
            >
              Submit
            </Button>
            <Upload
              callback={() => {
                setOpen(false);
                props.Upload_Null();
                resetForm();
                if (props.ser_res.status === 200) {
                  setSuccess(true);
                }
              }}
              pic={false}
              data={false}
              video={true}
              values={values}
              open={open}
              isSubmitting={isSubmitting}
              fir_upload={props.fir_upload}
            />
          </Form>
        )}
      </Formik>

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
  fir_res: state.Firestore.FireStore_Response,
  ser_res: state.Server.Server_Response,
  ser_err_res: state.Server.Server_Error_Response,
  ser_err: state.Server.Server_Error,
  fir_err: state.Firestore.error,
  Search_State: state.Search.search,
});

const mapDispatchToProps = (dispatch) => {
  return {
    New_ep: (id, data, callback) => {
      dispatch(NEW_EPISODE(id, data, callback));
    },
    Search_reset: () => {
      dispatch(SEARCH_NULL());
    },
    Search_Data: (name, callback) => {
      dispatch(Search_Data(name, callback));
    },
    Upload_Null: () => {
      dispatch(FIRESTORE_UPLOAD_NULL());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewEpisode));
