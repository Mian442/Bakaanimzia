import React, { useContext, useState } from "react";
import {
  Typography,
  Avatar,
  InputAdornment,
  Button,
  TextField,
  Paper,
} from "@material-ui/core";
import { AccountBox, MailOutlineRounded, Lock } from "@material-ui/icons";
import { Context } from "../../../../../Context/MainContext";
import { toast } from "react-toastify";
import jwtdecode from "jwt-decode";
import { withRouter } from "react-router";
import "./NewAdmin.css";

const NewAdmin = (props) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setemail] = useState("");
  const [confrim, setConfrim] = useState("");
  const { Signup } = useContext(Context);

  if (!localStorage.getItem("token")) {
    props.history.push("/login");
  } else {
    const jwt = localStorage.getItem("token");
    let user = jwtdecode(jwt);
    if (user.role !== "admin") {
      props.history.push("/not-authorized");
    }
  }

  const handellogin = () => {
    let data = { name, email, pass };
    if (pass === confrim) {
      Signup(data, () => {
        window.location.replace("/");
        toast.success("Success");
      });
    } else {
      toast.error("Password Not Match");
    }
  };

  return (
    <div className="Nadmin">
      <Paper>
        <Avatar
          variant="square"
          src="https://res.cloudinary.com/dzmydscig/image/upload/v1592648493/user_u0jgo3.png"
          style={{ width: 200, height: 200, margin: 20 }}
        />
        <Typography
          variant="h4"
          align="center"
          style={{ width: "90%", margin: 20 }}
        >
          Admin Sign UP
        </Typography>
        <TextField
          style={{ width: "90%", margin: 20 }}
          variant="outlined"
          id="input-with-icon-textfield"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          label="Name"
          placeholder="Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBox />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          style={{ width: "90%", margin: 20 }}
          variant="outlined"
          id="input-with-icon-textfield"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
          label="Email"
          placeholder="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineRounded />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          style={{ width: "90%", margin: 20 }}
          variant="outlined"
          id="input-with-icon-textfield"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
          placeholder="Password"
          label="Password"
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          style={{ width: "90%", margin: 20 }}
          variant="outlined"
          id="input-with-icon-textfield"
          value={confrim}
          onChange={(e) => {
            setConfrim(e.target.value);
          }}
          label="Confrim Password"
          type="password"
          placeholder="Confrim Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBox />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          color="secondary"
          style={{ borderRadius: 20, margin: 20, width: "90%" }}
          onClick={handellogin}
        >
          Add
        </Button>
      </Paper>
    </div>
  );
};

export default withRouter(NewAdmin);
