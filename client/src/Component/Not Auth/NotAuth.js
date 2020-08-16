import React from "react";
import "./NotAuth.css";
import { Typography, Button } from "@material-ui/core";

const NotAuth = (props) => {
  return (
    <div
      className="NAp"
      style={{ display: "flex", margin: 30, justifyContent: "center" }}
    >
      <img src={require("./alert.png")} alt="Error" />
      <div style={{ alignSelf: "center" }}>
        <Typography variant="h4" align="center">
          Your Are not Authorized
        </Typography>
        <Typography variant="h5" align="center">
          For Access
        </Typography>
        <div style={{ justifyContent: "center", display: "flex", margin: 20 }}>
          <Button
            variant="outlined"
            style={{
              borderRadius: 20,
              width: "45%",
            }}
            color="secondary"
            onClick={() => {
              props.history.push("/login");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotAuth;
