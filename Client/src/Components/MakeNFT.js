import React, { useState } from "react";
import "./MakeNFT.css";
import ERC721abi from "./ERC721abi";

const IpfsApi = require("ipfs-api");
const ipfs = IpfsApi("ipfs.infura.io", "5001", { protocol: "http" });
const CA = "0xdf68d3471f500237adddaf48c4dc9d336f92629c";

function MakeNFT({ web3, account }) {
  const [img, SetImg] = useState("");
  const [name, SetName] = useState("");
  const [link, SetLink] = useState("");
  const [description, SetDescription] = useState("");

  const clickButton = async () => {
    if (name !== "" && img !== "" && description !== "") {
      /*express로 서버 따로 만들어야줘야되나?? */

      const ipfsUpload = async () => {
        console.log(img);
        await ipfs.add(Buffer.from(img)).then((result) => {
          SetLink(`https://ipfs.io/ipfs/${String(result[0].path)}`);
        });
      };
      await ipfsUpload();
      // 여기까지 하면 링크, 이름, 추가 설명 까지 완성
      console.log(link);
      if (link === "") {
        alert("다시 전송해 주세요!");
      } else {
        SendTransaction();
      }
    } else {
      alert("모든 값을 입력해 주세요!");
    }
  };

  const SendTransaction = async () => {
    const nftContract = await new web3.eth.Contract(ERC721abi, CA);
    const nonce = await web3.eth.getTransactionCount(account, "latest");

    const tx = {
      from: account,
      to: CA,
      nonce: nonce,
      gas: 500000,
      data: nftContract.methods
        .mintNFT(account, `${link}, ${name}, ${description}`)
        .encodeABI(),
    };
    await web3.eth.sendTransaction(tx).then((trs) => {
      console.log(trs.blockNumber);
    });

    alert("NFT생성 완료!!!!");
  };

  const imgChange = async (e) => {
    if (e.files === undefined) {
      let reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);
      // base64로 인코딩
      reader.onload = (event) => {
        const previewImage = document.querySelector(".img");
        previewImage.src = event.target.result;
        SetImg(event.target.result);
      };
    }
  };

  //useState
  const nameChange = (e) => {
    SetName(e.target.value);
  };

  //useState
  const descriptionChange = (e) => {
    SetDescription(e.target.value);
  };

  return (
    <div className="MakeNFT_back">
      <div className="MakeNFT_BOX">
        <div id="title">Create New Item</div>
        <div className="img_box">
          <span className="img_span">img</span>

          <text className="img_example">
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF
          </text>
          <img src="/" className="img" alt="test" />
          <input
            id="img"
            type="file"
            placeholder="img"
            required
            onChange={imgChange}
          />
        </div>
        <div className="name_box">
          <span className="name_span">name</span>
          <input
            type="text"
            placeholder="name"
            required
            onChange={nameChange}
            value={name}
          />
        </div>

        <div className="description_box">
          <span className="description_span">description</span>
          <input
            type="text"
            placeholder="description"
            required
            onChange={descriptionChange}
            value={description}
          />
        </div>
        <button className="createbutton" onClick={clickButton}>
          Create
        </button>
      </div>
    </div>
  );
}

export default MakeNFT;
