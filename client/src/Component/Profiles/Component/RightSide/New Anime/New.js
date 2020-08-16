import React from "react";
import DataTemplate from "../../../../Data/DataTemplate";

const New = () => {
  const InitalValue = {
    genre: [],
    episode: [],
    title: "",
    alt_title: {
      eng_jp: "",
      jp_jp: "",
    },
    des: "",
    pic: "",
    presequal: { _id: "", name: "", pic: "" },
    rating: "",
    season: "",
    sequal: { _id: "", name: "", pic: "" },
    status: "",
    type: "",
  };
  return (
    <div>
      <DataTemplate InitalValue={InitalValue} pic={true} video={true} />
    </div>
  );
};

export default New;
