import React, { useState, useContext } from "react";
import {
  TextField,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  IconButton,
  MenuItem,
  Button,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  withStyles,
  TableBody,
  Paper,
  makeStyles,
  Fade,
  Backdrop,
} from "@material-ui/core";
import { withRouter } from "react-router";
import "./NewAnime.css";
import {
  PhotoCamera,
  VideoLibrary,
  SaveRounded,
  AddRounded,
  DeleteForever,
} from "@material-ui/icons";
import { toast } from "react-toastify";
import { Context } from "../../../../../Context/MainContext";
import jwtdecode from "jwt-decode";

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
});

const NewAnime = (props) => {
  const { NewAnime } = useContext(Context);
  const classes = useStyles();
  const InitalValue = {
    genre: [],
    episode: [],
    title: "",
    alt_title: {
      eng_jp: "",
      jp_jp: "",
    },
    des: "",
    pic: "",
    presequal: { _id: "", name: "Null" },
    rating: "",
    season: "",
    sequal: { _id: "", name: "Null" },
    status: "",
    type: "",
  };
  const [data, setData] = useState(InitalValue);
  const [error, setError] = useState({
    error0: false,
    error1: false,
    error2: false,
    error3: false,
    error4: false,
    error5: false,
    error6: false,
    error7: false,
  });
  // const [processingdata, setProcessingdata] = useState([]);
  const [video, setVideo] = useState(null);
  const [sequal, setSequal] = useState({ _id: "", name: "" });
  const [presequal, setPresequal] = useState({ _id: "", name: "" });
  const [eptitle, setEptitle] = useState("");
  const [open, setOpen] = useState(false);
  const Status = ["Ongoing", "Completed"];
  const Type = ["TV", "OVA", "ONA", "Movie"];
  const Rating = [
    "PG - Children",
    "PG-13 Teens 13 or older",
    "R-17+ (violence & profanity)",
    "R+ - Mild Nudity",
  ];
  const Genre = ["Action", "Adventure", "Cars", "Comedy"];
  if (!localStorage.getItem("token")) {
    props.history.push("/login");
  } else {
    const jwt = localStorage.getItem("token");
    let user = jwtdecode(jwt);
    if (user.role !== "admin") {
      props.history.push("/not-authorized");
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handelepisode = () => {
    console.log(video.name);
    let vdata = {
      index: data.episode.length,
      title: eptitle,
      file: video,
      size: (video.size / (1024 * 1024)).toFixed(4),
    };
    setData({ ...data, episode: [...data.episode, vdata] });
    setEptitle("");
    setVideo(null);
  };

  const findg = (g) => {
    for (var i = 0; i < data.genre.length; i++) {
      if (data.genre[i] === g) {
        return true;
      }
    }
    return false;
  };

  const handelgenre = (g) => {
    if (findg(g.target.value) === true) {
      setData({
        ...data,
        genre: data.genre.filter((i) => i !== g.target.value),
      });
    } else {
      setData({ ...data, genre: [...data.genre, g.target.value] });
    }
  };

  const errorcheck = () => {
    if (data.eng === "") {
      setError({ ...error, error1: true });
      return false;
    } else if (data.enjp === "") {
      setError({ ...error, error2: true });
      return false;
    } else if (data.pic === null) {
      toast.error("Image Required*");
      return false;
    } else if (data.des === "") {
      setError({ ...error, error3: true });
      return false;
    } else if (data.season === "") {
      setError({ ...error, error4: true });
      return false;
    } else if (data.rating === "") {
      setError({ ...error, error5: true });
      return false;
    } else if (data.status === "") {
      setError({ ...error, error6: true });
      return false;
    } else if (data.type === "") {
      setError({ ...error, error7: true });
      return false;
    } else if (data.genre.length === 0) {
      toast.error("Genre is Empty");
      return false;
    }
    return true;
  };

  const handeldata = () => {
    if (errorcheck() === true) {
      NewAnime(data, () => {
        setData(InitalValue);
        setVideo(null);
        setEptitle("");
        toast.success("New Record Add!");
        handleClose();
      });
    } else {
      toast.error("Incomplete Information");
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
        New Anime
      </Typography>
      <TextField
        error={error.error0}
        helperText={error.error0 ? "Type English Title*" : null}
        label="Series Title "
        placeholder="Title"
        variant="outlined"
        value={data.title}
        onClick={(e) => {
          setError({ ...error, error0: false });
        }}
        onChange={(e) => {
          e.persist();
          setData({ ...data, title: e.target.value });
        }}
        style={{ margin: 20 }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <TextField
          error={error.error2}
          helperText={error.error2 ? "Type Eng-Jp Title*" : null}
          label="Eng-Jp Name "
          placeholder="Name"
          variant="outlined"
          value={data.alt_title.eng_jp}
          onClick={() => {
            setError({ ...error, error2: false });
          }}
          onChange={(e) => {
            setData({
              ...data,
              alt_title: { ...data.alt_title, engjp: e.target.value },
            });
          }}
          style={{ margin: 20 }}
        />
        <TextField
          label="Jp-Jp Name "
          placeholder="Name"
          variant="outlined"
          value={data.alt_title.jp_jp}
          onChange={(e) => {
            e.persist();
            setData({
              ...data,
              alt_title: { ...data.alt_title, jpjp: e.target.value },
            });
          }}
          style={{ margin: 20 }}
        />
      </div>
      <div style={{ margin: 20, width: "93%", flexDirection: "row" }}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="icon-button-file"
          type="file"
          onChange={(e) => {
            if (e.target.files[0].size / (1024 * 1024) <= 100) {
              setData({ ...data, pic: e.target.files[0] });
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
          {data.pic === null ? null : (
            <Typography
              variant="subtitle1"
              style={{ paddingTop: 10 }}
              color="Primary"
            >
              {data.pic.name} {(data.pic.size / (1024 * 1024)).toFixed(4)} MB
            </Typography>
          )}
        </label>
      </div>
      <div
        style={{ margin: 20, width: "93%", flexDirection: "row" }}
        className="video"
      >
        <Typography style={{ paddingTop: 10, marginLeft: 20 }} align="left">
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
        <label htmlFor="icon-button-video-file" style={{ display: "flex" }}>
          <Typography
            variant="subtitle1"
            align="left"
            style={{ width: 60, paddingTop: 10, marginLeft: 20 }}
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
              {video.name} {(video.size / (1024 * 1024)).toFixed(4)} Mb
            </Typography>
          )}
        </label>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 20 }}
          onClick={handelepisode}
        >
          <AddRounded /> add
        </Button>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sir.</StyledTableCell>
                <StyledTableCell align="right">Title</StyledTableCell>
                <StyledTableCell align="right">File Name</StyledTableCell>
                <StyledTableCell align="right">Size</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.episode.map((i) => (
                <StyledTableRow key={i.title}>
                  <StyledTableCell component="th" scope="row">
                    {i.index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="right">{i.title}</StyledTableCell>
                  <StyledTableCell align="right">{i.file.name}</StyledTableCell>
                  <StyledTableCell align="right">{i.size}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      color="secondary"
                      onClick={(e) => {
                        setData({
                          ...data,
                          episode: data.episode.filter(
                            (item) => item.index !== i.index
                          ),
                        });
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
      <TextField
        error={error.error3}
        helperText={error.error3 ? "Enter Description*" : null}
        multiline
        variant="outlined"
        style={{ margin: 23, height: "auto" }}
        value={data.des}
        onChange={(e) => {
          setData({ ...data, des: e.target.value });
        }}
        onClick={() => {
          setError({ ...error, error3: false });
        }}
        label="Description"
        rowsMax={200}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "93%",
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Sequal"
          placeholder="Sequal"
          variant="outlined"
          style={{ margin: 20 }}
          value={data.sequal.name}
          onChange={(e) => {
            setData({
              ...data,
              sequal: { ...data.sequal, name: e.target.value },
            });
          }}
        />
        <TextField
          label="Pre-Sequal"
          placeholder="Pre Sequal"
          variant="outlined"
          value={data.presequal.name}
          onChange={(e) => {
            setData({
              ...data,
              presequal: { ...data.presequal, name: e.target.value },
            });
          }}
          style={{ margin: 20 }}
        />
      </div>
      <TextField
        error={error.error4}
        helperText={error.error4 ? "Enter Season Name*" : null}
        variant="outlined"
        style={{ margin: 23, height: "auto" }}
        label="Season"
        value={data.season}
        onClick={() => {
          setError({ ...error, error4: false });
        }}
        onChange={(e) => {
          setData({ ...data, season: e.target.value });
        }}
      />
      <TextField
        select
        error={error.error5}
        helperText={error.error5 ? "Select Rating*" : null}
        label="Rating"
        value={data.rating}
        onChange={(e) => {
          setData({ ...data, rating: e.target.value });
        }}
        onClick={() => {
          setError({ ...error, error5: false });
        }}
        style={{ margin: 23, height: "auto" }}
        variant="outlined"
      >
        {Rating.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        error={error.error6}
        helperText={error.error6 ? "Select Type*" : ""}
        label="Type"
        value={data.type}
        onClick={() => {
          setError({ ...error, error6: false });
        }}
        onChange={(e) => {
          setData({ ...data, type: e.target.value });
        }}
        style={{ margin: 23, height: "auto" }}
        variant="outlined"
      >
        {Type.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        error={error.error7}
        helperText={error.error7 ? "Select Status*" : null}
        select
        label="Status"
        value={data.status}
        onClick={() => {
          setError({ ...error, error7: false });
        }}
        onChange={(e) => {
          setData({ ...data, status: e.target.value });
        }}
        style={{ margin: 23, height: "auto" }}
        variant="outlined"
      >
        {Status.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <div style={{ margin: 20, width: "93%" }} className="genre">
        <Typography variant="subtitle1" align="left" style={{ margin: 20 }}>
          Genre
        </Typography>
        <FormGroup
          row
          style={{ justifyContent: "space-evenly", width: "100%" }}
        >
          <FormControlLabel
            control={<Checkbox color="secondary" value="Action" />}
            label="Action"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Adventure" />}
            label="Adventure"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Cars" />}
            label="Cars"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Comdey" />}
            label="Comdey"
            onChange={handelgenre}
          />
        </FormGroup>
        <FormGroup
          row
          style={{ justifyContent: "space-evenly", width: "100%" }}
        >
          <FormControlLabel
            control={<Checkbox color="secondary" value="Dementia" />}
            label="Dementia"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Demons" />}
            label="Demons"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Drama" />}
            label="Drama"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Ecchi" />}
            label="Ecchi"
            onChange={handelgenre}
          />
        </FormGroup>
        <FormGroup
          row
          style={{ justifyContent: "space-evenly", width: "100%" }}
        >
          <FormControlLabel
            control={<Checkbox color="secondary" value="Fantasy" />}
            label="Fantasy"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Game" />}
            label="Game"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Harem" />}
            label="Harem"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Hentai" />}
            label="Hentai"
            onChange={handelgenre}
          />
        </FormGroup>
        <FormGroup
          row
          style={{ justifyContent: "space-evenly", width: "100%" }}
        >
          <FormControlLabel
            control={<Checkbox color="secondary" value="Historical" />}
            label="Historical"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Horror" />}
            label="Horror"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Josei" />}
            label="Josei"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Kids" />}
            label="Kids"
            onChange={handelgenre}
          />
        </FormGroup>
        <FormGroup
          row
          style={{ justifyContent: "space-evenly", width: "100%" }}
        >
          <FormControlLabel
            control={<Checkbox color="secondary" value="Magic" />}
            label="Magic"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Martial Arts" />}
            label="Martial Arts"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Mecha" />}
            label="Mecha"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Military" />}
            label="Military"
            onChange={handelgenre}
          />
        </FormGroup>
        <FormGroup
          row
          style={{ justifyContent: "space-evenly", width: "100%" }}
        >
          <FormControlLabel
            control={<Checkbox color="secondary" value="Music" />}
            label="Music"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Mystery" />}
            label="Mystery"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Parody" />}
            label="Parody"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Police" />}
            label="Police"
            onChange={handelgenre}
          />
        </FormGroup>
        <FormGroup
          row
          style={{ justifyContent: "space-evenly", width: "100%" }}
        >
          <FormControlLabel
            control={<Checkbox color="secondary" value="Psychological" />}
            label="Psychological"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Romance" />}
            label="Romance"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Samurai" />}
            label="Samurai"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="School" />}
            label="School"
            onChange={handelgenre}
          />
        </FormGroup>
        <FormGroup
          row
          style={{ justifyContent: "space-evenly", width: "100%" }}
        >
          <FormControlLabel
            control={<Checkbox color="secondary" value="Sci-Fi" />}
            label="Sci-Fi"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Seinen" />}
            label="Seinen"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Shoujo" />}
            label="Shoujo"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Shoijo Ai" />}
            label="Shoijo Ai"
            onChange={handelgenre}
          />
        </FormGroup>
        <FormGroup
          row
          style={{ justifyContent: "space-evenly", width: "100%" }}
        >
          <FormControlLabel
            control={<Checkbox color="secondary" value="Shounen" />}
            label="Shounen"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Shounen Ai" />}
            label="Shounen Ai"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Slice of Life" />}
            label="Slice of Life"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Space" />}
            label="Space"
            onChange={handelgenre}
          />
        </FormGroup>
        <FormGroup
          row
          style={{ justifyContent: "space-evenly", width: "100%" }}
        >
          <FormControlLabel
            control={<Checkbox color="secondary" value="Sports" />}
            label="Sports"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Super Power" />}
            label="Super Power"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Supernatural" />}
            label="Supernatural"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Thriller" />}
            label="Thriller"
            onChange={handelgenre}
          />
        </FormGroup>
        <FormGroup
          row
          style={{ justifyContent: "space-evenly", width: "100%" }}
        >
          <FormControlLabel
            control={<Checkbox color="secondary" value="Vampire" />}
            label="Vampire"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Yaoi" />}
            label="Yaoi"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" value="Yuri" />}
            label="Yuri"
            onChange={handelgenre}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Clear"
          />
        </FormGroup>
      </div>
      <Button
        variant="outlined"
        color="secondary"
        style={{
          margin: 25,
          borderRadius: 20,
          width: "50%",
          alignSelf: "center",
          fontSize: 16,
        }}
        onClick={() => {
          handeldata();
          handleOpen();
        }}
      >
        <SaveRounded />
        Save
      </Button>
      <Backdrop
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <Fade in={open}>
          <Paper elevation={7} style={{ width: "70%" }}>
            <Typography
              aligin="left"
              style={{ width: "100%", fontSize: 28, margin: 20 }}
            >
              Saving Data....
            </Typography>
            <hr />
          </Paper>
        </Fade>
      </Backdrop>
    </div>
  );
};

export default withRouter(NewAnime);
