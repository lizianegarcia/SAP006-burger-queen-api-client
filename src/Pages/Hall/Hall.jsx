import React from "react";
import "../../Styles/hall.css";
import HeaderIcons from "../../components/header/HeaderHallIcons";
import HeaderHall from "../../components/header/HeaderHall";

function Hall() {
  return (
    <div className="hall">
      <HeaderHall />
      <main className="hall-page-main">
        <HeaderIcons />
      </main>
    </div>
  )
}

export default Hall;