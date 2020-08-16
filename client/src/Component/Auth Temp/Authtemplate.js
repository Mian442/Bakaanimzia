import React, { useContext, useState, useEffect } from "react";
import { AccountBox, MailOutlineRounded, Lock } from "@material-ui/icons";
import {
  TextField,
  Paper,
  Typography,
  InputAdornment,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import { toast } from "react-toastify";
import "./Auth.css";
import { Context } from "../../Context/MainContext";
import { withRouter } from "react-router";

export default withRouter((props) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setemail] = useState("");
  const [confrim, setConfrim] = useState("");
  const { Signup, login } = useContext(Context);

  if (localStorage.getItem("token")) {
    useEffect(() => {
      toast.info("Your Are Currently login");
    }, []);
    props.history.push("/");
  }

  const handellogin = () => {
    let data = { name, email, pass };
    if (props.up) {
      if (pass === confrim) {
        Signup(data, () => {
          window.location.replace("/");
          toast.success("Success");
        });
      } else {
        toast.error("Password Not Match");
      }
    } else {
      console.log(data);
      login(data, () => {
        window.location.replace("/");
        toast.success("Success");
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        height: window.screen.height - (props.up === true ? 220 : 227),
      }}
      className="backgrad"
    >
      <Paper
        elevation={10}
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 30,
          width: "65%",
        }}
      >
        {useMediaQuery("(max-width:767px)") ? null : (
          <div className="tempside">
            <img alt="Pic" src={require("./card.png")} className="side" />
            <Typography
              variant="h4"
              align="center"
              style={{ margin: 20, color: "#ffffff", width: "90%" }}
            >
              Baka Animiza
            </Typography>
          </div>
        )}
        <div className="signup">
          <Typography variant="h4" align="center" style={{ margin: 20 }}>
            {props.title}
          </Typography>
          {props.up ? (
            <TextField
              style={{ width: "90%", margin: 20 }}
              variant="outlined"
              id="input-with-icon-textfield"
              value={name}
              size="small"
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
          ) : null}
          <TextField
            style={{ width: "90%", margin: 20 }}
            variant="outlined"
            id="input-with-icon-textfield"
            value={email}
            size="small"
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
            size="small"
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
          {props.up ? (
            <TextField
              style={{ width: "90%", margin: 20 }}
              variant="outlined"
              id="input-with-icon-textfield"
              value={confrim}
              size="small"
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
          ) : null}
          <Button
            variant="outlined"
            color="secondary"
            style={{ borderRadius: 20, margin: 20, width: "90%" }}
            onClick={handellogin}
          >
            {props.title}
          </Button>
        </div>
      </Paper>
    </div>
  );
});
