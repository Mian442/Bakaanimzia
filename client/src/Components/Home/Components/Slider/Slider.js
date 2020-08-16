import React from "react";
import "./Slider.css";
import { Carousel } from "react-bootstrap";
import { withRouter } from "react-router";

const CustomSlider = (props) => {
  return (
    <div style={{ margin: 30 }}>
      <Carousel>
        {props.state &&
          props.state.map((i) => {
            return (
              <Carousel.Item
                interval={1000}
                onClick={() => {
                  props.history.push("/anime" + i.anime_id);
                }}
              >
                <img
                  className="d-block w-100"
                  src="https://source.unsplash.com/900x700/?abstract"
                  alt="First slide"
                  style={{ height: 500, width: "100%" }}
                />
                <Carousel.Caption>
                  <h3>{i.title}</h3>
                  <p>{i.des}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
};

export default withRouter(CustomSlider);
