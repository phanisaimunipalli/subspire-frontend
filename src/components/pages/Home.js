import React from "react";
import cover from "./subspire-cover.png";

function Home() {
  const link = "https://subspire.us";
  const target = "_blank";

  return (
    <div className="homebg">
      <img src={cover} width={"100%"} />
    </div>
  );
}

export default Home;
