import React, { useEffect, useState } from "react";
import InfoPage from "./InfoPage";
import "./NftList.css";
import ERC721abi from "./ERC721abi";
import axios from "axios";
const CA = "0xdf68d3471f500237adddaf48c4dc9d336f92629c";

function NftList({ connectWallet, web3, account }) {
  const [list, SetList] = useState("");
  const [modal, setModal] = useState(false);
  const modalControl = () => {
    setModal(!modal);
  }

  useEffect(
    async () => {
      if (!account) {
        connectWallet();
      }
      const nftContract = await new web3.eth.Contract(ERC721abi, CA);
      const total = await nftContract.methods.totalSupply().call();
  
      let arr = [];
      let answer = [];
      for (let i = 1; i <= total; i++) {
        arr.push(i);
      }
  
      for (let Id of arr) {
          let tokenURI = await nftContract.methods.tokenURI(Id).call();
          let temp = tokenURI.split(", ");
          
          await axios.get(temp[0]).then((data) => {
            answer.push(data.data);
          });
      }
      SetList(answer);
    }, []);


  return (
    
    <header className="nftListPage">
      
      <div className="nftExplorer">
        <div className="nftListText">Explore Collections</div>
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
      {modal ? <InfoPage modalControl={modalControl}/> : (
        <>
        <div className="cardWrapper">
          {list.length === 0 ? (
            <div style={{display: "flex", justifyContent: "center"}}>
              <img src="https://www.mofa.go.kr/images/www/common/loading_icon.gif" style={{width: "10vw", height: "auto"}} />
            </div>
          ) : (
            list.map((URI) => {
              return ( 
                <span className="card">
                  <div className="cardImgDiv">
                    <img className="cardImg" src={URI} onClick={modalControl} alt="OpenSea" />
                  </div>
                </span>
              );
            })
          )}
        </div>
        </>
      )}
    </header>
  );
}

export default NftList;