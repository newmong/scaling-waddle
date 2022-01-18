import React from "react";
import "./Homepage.css";
function Homepage({ light }) {
  return (
    <div className="homepage">
      <div className="image">
        <img src="./img/lamp.png" className="lamp" alt="lamp" />
        <img
          src="./img/light.png"
          className={light ? "light_on" : "light"}
          alt="light"
        />
      </div>
      <div className="text">
        <h2>Super NFT Market</h2>
        <div className="text_test">
          <p>
            Transactions through our market increase users' assets than before.
          </p>
          <span>Increase your assets through various NFT transactions</span>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
