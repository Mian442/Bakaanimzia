import React, { useState } from "react";
import {
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  withStyles,
  TableBody,
  Paper,
  makeStyles,
  Select,
  InputLabel,
  FormControl,
  createMuiTheme,
} from "@material-ui/core";
import { Formik, Form, useField, FieldArray } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router";
import "./NewAnime.css";
import {
  PhotoCamera,
  VideoLibrary,
  AddRounded,
  DeleteForever,
} from "@material-ui/icons";
import { Button } from "@chakra-ui/core";
import { toast } from "react-toastify";
import jwtdecode from "jwt-decode";
import { connect } from "react-redux";
import {
  NEW_ANIME,
  FIRESTORE_UPLOAD_NULL,
  UPDATE_ANIME,
} from "../../Redux/Redux-actions/Actions";
import Error from "../Error/Error";
import Info from "../Messages/Info";
import Upload from "../Upload/Upload";

const MyTextField = ({ placeholder, label, multiline, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      style={{ margin: 20, width: "92%" }}
      variant="outlined"
      label={label}
      multiline={multiline}
      rowsMax={multiline ? 400 : 0}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const MySelect = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <div>
      <FormControl style={{ margin: 20, width: "92%" }}>
        <InputLabel
          id="demo-simple-select-label"
          style={{ marginLeft: 14, marginTop: -7 }}
        >
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...field}
          label={label}
          variant="outlined"
          helperText={errorText}
          error={!!errorText}
        >
          {type.map((i) => {
            return (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

const MyCheckBox = ({ label, type, checked, ...props }) => {
  const [field] = useField(props);
  return (
    <FormControlLabel
      {...field}
      control={<Checkbox value={label} checked={checked} />}
      label={label}
    />
  );
};

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
    minWidth: 300,
  },
  eidit: {
    width: "none",
    color: theme.palette.edit,
  },
});

const NewAnime = (props) => {
  const classes = useStyles();
  const ValidationSchema = Yup.object({
    genre: Yup.array().required(),
    episode: Yup.array().of(
      Yup.object({
        index: Yup.number(),
        title: Yup.string(),
        file: null,
        size: Yup.string(),
      })
    ),
    title: Yup.string().required(),
    alt_title: Yup.object({
      eng_jp: Yup.string(),
      jp_jp: Yup.string(),
    }),
    des: Yup.string().required(),
    pic: Yup.string(),
    presequal: Yup.object({
      _id: Yup.string(),
      name: Yup.string(),
      pic: Yup.string(),
    }),
    rating: Yup.string().required(),
    season: Yup.string().required(),
    sequal: Yup.object({
      _id: Yup.string(),
      name: Yup.string(),
      pic: Yup.string(),
    }),
    status: Yup.string().required(),
    type: Yup.string().required(),
  });
  const [video, setVideo] = useState(null);
  const [success, setSuccess] = useState(false);
  const [eptitle, setEptitle] = useState("");
  // const [sequal, setSequal] = useState({ _id: "", name: "" });
  // const [presequal, setPresequal] = useState({ _id: "", name: "" });
  const [open, setOpen] = useState(false);
  const Status = ["Ongoing", "Completed"];
  const Type = ["TV", "OVA", "ONA", "Movie"];
  const Rating = [
    "PG - Children",
    "PG-13 Teens 13 or older",
    "R-17+ (violence & profanity)",
    "R+ - Mild Nudity",
  ];
  const Genre = [
    "Action",
    "Adventure",
    "Cars",
    "Comdey",
    "Dementia",
    "Demons",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Game",
    "Harem",
    "Hentai",
    "Historical",
    "Horror",
    "Josei",
    "Kids",
    "Magic",
    "Martial Arts",
    "Mecha",
    "Military",
    "Music",
    "Mystery",
    "Parody",
    "Police",
    "Psychological",
    "Romance",
    "Samurai",
    "School",
    "Sci-Fi",
    "Seinen",
    "Shoujo",
    "Shoijo Ai",
    "Shounen",
    "Shounen Ai",
    "Slice of Life",
    "Space",
    "Sports",
    "Super Power",
    "Supernatural",
    "Thriller",
    "Vampire",
    "Yaoi",
    "Yuri",
  ];

  if (!localStorage.getItem("token")) {
    props.history.push("/login");
  } else {
    const jwt = localStorage.getItem("token");
    let user = jwtdecode(jwt);
    if (user.role !== "admin") {
      props.history.push("/not-authorized");
    }
  }

  const handledata = (data, op) => {
    var d = { ...data };
    op.setSubmitting(true);
    setOpen(true);
    if (props.pic) {
      props.New(d, () => {
        op.setSubmitting(false);
      });
    } else {
      props.Update(d, () => {
        op.setSubmitting(false);
      });
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
        {props.pic ? "New" : "Update"} Anime
      </Typography>
      <Formik
        initialValues={props.InitalValue}
        validationSchema={ValidationSchema}
        onSubmit={handledata}
      >
        {({ values, errors, isSubmitting, setValues, resetForm }) => (
          <Form>
            <MyTextField
              placeholder="Title"
              name="title"
              label="Series Title"
            />
            <MyTextField
              placeholder="Eng_Jp"
              name="alt_title.eng_jp"
              label="Eng_Jp"
            />
            <MyTextField
              placeholder="Jp_Jp"
              name="alt_title.jp_jp"
              label="Jp_Jp"
            />
            {errors.pic ? <div>{errors.pic}</div> : null}
            {props.pic && props.video ? (
              <>
                <div style={{ margin: 20, width: "93%", flexDirection: "row" }}>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files[0].size / (1024 * 1024) <= 10) {
                        setValues({ ...values, pic: e.target.files[0] });
                      } else {
                        toast.error("Image Size is Larger than 10MB");
                      }
                    }}
                  />
                  <label htmlFor="icon-button-file" style={{ display: "flex" }}>
                    <Typography
                      variant="subtitle1"
                      align="left"
                      style={{ width: 60, paddingTop: 10, marginLeft: 20 }}
                    >
                      Picture
                    </Typography>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                    {values.pic === "" ? null : (
                      <Typography
                        variant="subtitle1"
                        style={{ paddingTop: 10 }}
                        color="primary"
                      >
                        {values.pic.name}{" "}
                        {(values.pic.size / (1024 * 1024)).toFixed(4)} MB
                      </Typography>
                    )}
                  </label>
                </div>
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
                              {video.name}{" "}
                              {(video.size / (1024 * 1024)).toFixed(4)}
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
                              <StyledTableCell align="right">
                                Title
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                File Name
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                Size
                              </StyledTableCell>
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
              </>
            ) : null}
            <MyTextField
              placeholder="Description"
              name="des"
              label="Description"
              multiline={true}
            />
            <MyTextField placeholder="Season" name="season" label="Season" />
            <MySelect name="rating" label="Select the Rating" type={Rating} />
            <MySelect name="type" label="Select the Type" type={Type} />
            <MySelect name="status" label="Select the Status" type={Status} />
            <div className="genre">
              <Typography
                variant="subtitle1"
                align="left"
                style={{ margin: 20 }}
              >
                Genre
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                }}
              >
                {Genre.map((i) => {
                  var check = false;
                  for (var j = 0; j < values.genre.length; j++) {
                    if (i === values.genre[j]) {
                      check = true;
                      break;
                    }
                  }
                  return (
                    <MyCheckBox
                      key={i}
                      name="genre"
                      label={i}
                      checked={check}
                    />
                  );
                })}
              </div>
            </div>
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
                resetForm();
                props.Upload_Null();
                if (
                  props.ser_res.status !== null &&
                  props.ser_res.status === 200
                ) {
                  setSuccess(true);
                }
              }}
              pic={props.pic}
              data={true}
              video={props.video}
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
        <Error server={props.ser_err_res} firbase={props.fir_res} />
      ) : null}
      {success ? (
        <Info
          server={props.ser_res}
          firebase={props.fir_res}
          callback={() => {
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
  ser_err: state.Server.Server_Error,
  ser_err_res: state.Server.Server_Error_Response,
  fir_err: state.Firestore.error,
  fir_upload: state.Firestore.upload,
});

const mapDispatchToProps = (dispatch) => {
  return {
    New: (data, callback) => {
      dispatch(NEW_ANIME(data, callback));
    },
    Update: (data, callback) => {
      dispatch(UPDATE_ANIME(data, callback));
    },
    Upload_Null: () => {
      dispatch(FIRESTORE_UPLOAD_NULL());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewAnime));
