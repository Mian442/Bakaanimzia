import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import "./Card.css";

const NormalCard = (props) => {
  return (
    <div className="card1">
      <Card
        key={props.state._id}
        style={{ width: 190, margin: 20 }}
        elevation={9}
      >
        <CardActionArea onClick={props.onClick}>
          <CardContent>
            <img
              src={props.state.pic.url ? props.state.pic.url : props.state.pic}
              style={{ height: 220, width: "fit-content" }}
              alt={props.state.title}
            />
          </CardContent>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              align="center"
              style={{
                width: "auto",
                fontSize: 16,
                wordBreak: "break-word",
              }}
            >
              {props.state.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default NormalCard;
