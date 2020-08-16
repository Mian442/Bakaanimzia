import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Tooltip,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const Secondary = (props) => {
  return (
    <div className="card2" onClick={props.onClick}>
      <Card
        elevation={9}
        style={{
          margin: 30,
        }}
      >
        <CardActionArea>
          <CardContent style={{ display: "flex", padding: 0 }}>
            <div>
              <img
                src={
                  props.state.pic.url ? props.state.pic.url : props.state.pic
                }
                alt={props.state.title}
                style={{ height: 180, width: 150, marginRight: 10 }}
                onClick={props.onClick}
              />
            </div>
            <div style={{ margin: 10 }}>
              <div onClick={props.onClick}>
                <Typography variant="h4" align="left" style={{ width: "auto" }}>
                  {props.state.title}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                }}
              >
                <Typography
                  variant="body1"
                  align="left"
                  style={{ width: "auto", margin: 5 }}
                >
                  Genre:
                </Typography>
                {props.state.genre.map((i) => {
                  return (
                    <Typography
                      key={i}
                      variant="body2"
                      align="left"
                      style={{
                        width: "auto",
                        margin: 5,
                      }}
                    >
                      <Link to={`/genre/${i}`} className="genre">
                        {i}
                      </Link>
                    </Typography>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Secondary;
