import React from "react";
import Sidepanel from "./Component/Sidepanel/Sidepanel";
import { withRouter } from "react-router";
import { Paper } from "@material-ui/core";
import "./User.css";

const User = (props) => {
  if (!localStorage.getItem("token")) {
    props.history.push("/login");
  }

  return (
    <div className="profile" style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          backgroundColor: "red",
          width: "35%",
          height: "100%",
          marginTop: 20,
        }}
        className="lp"
      >
        <Sidepanel var={props.var} />
      </div>
      <div style={{ width: "100%", height: "100%" }} className="rp">
        <Paper elevation={8} style={{ margin: 20 }} square>
          {props.content}
        </Paper>
      </div>
    </div>
  );
};

export default withRouter(User);
