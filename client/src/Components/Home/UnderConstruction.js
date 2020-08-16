import React from "react";
import { Typography } from "@material-ui/core";
import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <div className="UC">
        <img src={require("./construction.png")} alt="Under Construction!" />
      </div>

      <div style={{ alignSelf: "center" }}>
        <Typography
          variant="h4"
          align="center"
          style={{ width: "min-content" }}
        >
          Under Construction!
        </Typography>
      </div>
    </div>
  );
};

export default Home;
