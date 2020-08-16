import React from "react";
import { Typography } from "@material-ui/core";
import { Image } from "@chakra-ui/core";

const Mian = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 20,
        justifyContent: "center",
        height: 500,
      }}
    >
      <Image
        size="256px"
        objectFit="cover"
        src={require("./info.png")}
        alt="Option"
      />
      <Typography variant="h4" align="center" style={{ margin: 40 }}>
        Select An Action
      </Typography>
    </div>
  );
};

export default Mian;
