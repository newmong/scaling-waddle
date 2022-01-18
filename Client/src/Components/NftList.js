import React, { useEffect, useState } from "react";

import "./NftList.css";
import ERC721abi from "./ERC721abi";
import axios from "axios";

const CA = "0xdf68d3471f500237adddaf48c4dc9d336f92629c";

function NftList({ web3, account }) {
  const [list, SetList] = useState("");

  useEffect(async () => {
    const nftContract = await new web3.eth.Contract(ERC721abi, CA);
    const total = await nftContract.methods.totalSupply().call();
    let arr = [];
    let answer = [];
    for (let i = 1; i <= total; i++) {
      arr.push(i);
    }

    for (let Id of arr) {
      let host = await nftContract.methods.ownerOf(Id).call();

      if (String(host).toLowerCase() === account) {
        let tokenURI = await nftContract.methods.tokenURI(Id).call();
        let temp = tokenURI.split(", ");
        await axios.get(temp[0]).then((data) => {
          temp[0] = data.data;
        });
        console.log(temp);
        answer.push(temp);
      }
    }
    SetList(answer);
  }, []);

  return (
    <header className="nftListPage">
      <div className="nftExplorer">
        <div className="nftListText">
          {!account || !web3 ? "홈페이지를 통해주세요" : "Explore Collections"}
        </div>
        <div>
          <ul className="nftList">
            <li>All NFTs</li>
            <li>Art</li>
            <li>Music</li>
            <li>Domain Names</li>
            <li>Virtual Worlds</li>
            <li>Trading Cards</li>
            <li>Collectibles</li>
            <li>Sports</li>
            <li>Utility</li>
          </ul>
        </div>
      </div>
      <div className="cardWrapper">
        {list.length === 0 ? (
          <div>loading</div>
        ) : (
          list.map((URI, idx) => {
            return (
              <span className="card" key={idx}>
                <div className="cardImgDiv">
                  <img
                    className="cardImg"
                    src={URI[0]}
                    alt="test"
                    key={"img"}
                  />
                </div>
                <div className="cardBody">
                  <h4 className="cardTitle">{URI[1]}</h4>
                  <p className="cardText">{URI[2]}</p>
                </div>
              </span>
            );
          })
        )}
      </div>
    </header>
  );
}

export default NftList;
