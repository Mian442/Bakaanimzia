import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import { Facebook, Twitter, Instagram, Copyright } from "@material-ui/icons";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <IconButton>
          <Facebook style={{ fontSize: 42, color: "#ffffff" }} />
        </IconButton>
        <IconButton>
          <Twitter style={{ fontSize: 42, color: "#ffffff" }} />
        </IconButton>
        <IconButton>
          <Instagram style={{ fontSize: 42, color: "#ffffff" }} />
        </IconButton>
      </div>
      <div>
        <Typography
          variant="body2"
          align="center"
          style={{ color: "#ffffff", width: "92%" }}
        >
          <Copyright style={{ fontSize: 12, color: "#ffffff" }} />
          Copyright 2020
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
