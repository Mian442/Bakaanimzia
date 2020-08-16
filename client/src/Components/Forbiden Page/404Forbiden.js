import React from "react";
import "./Forbiden.css";
import { Typography } from "@material-ui/core";

const Forbiden = () => {
  return (
    <div
      className="NAp"
      style={{ display: "flex", margin: 30, justifyContent: "center" }}
    >
      <img src={require("./404.png")} alt="Error" />
      <div style={{ alignSelf: "center", margin: 20 }}>
        <Typography variant="h4" align="center">
          Requested Page Not Found
        </Typography>
        <Typography variant="h5" align="center">
          Try Again Later!
        </Typography>
      </div>
    </div>
  );
};

export default Forbiden;
