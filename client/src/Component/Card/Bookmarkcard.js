import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";

const Bookmarkcard = (props) => {
  return (
    <div>
      <Card className="card" style={{ width: 180, margin: 20 }}>
        <CardActionArea onClick={props.onselect}>
          <CardMedia
            style={{ height: 240, width: 180 }}
            image={props.state.pic}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
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
        <CardActions style={{ justifyContent: "center" }}>
          <Button size="small" color="secondary" onClick={props.onClick}>
            <DeleteForever />
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Bookmarkcard;
