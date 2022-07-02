import React from "react";
import "./CatCard.css";

function CatCard({ cat }) {
  return (
    <div className="catCard">
      <img alt="" src={cat.img} className="catImg" width="200"></img>
      <p className="catName">{cat.name}</p>
      <img alt="" className="catCountry" src={cat.country.img}></img>
      <p className="catName">{cat.country.name}</p>
    </div>
  );
}

export { CatCard };
