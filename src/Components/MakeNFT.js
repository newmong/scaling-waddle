import React, { useState } from "react";
import "./MakeNFT.css";

import ERC721abi from "./ERC721abi";
const Web3 = require("web3");
const IpfsApi = require('ipfs-api');
const ipfs = IpfsApi("ipfs.infura.io", "5001", { protocol: "http"});


function MakeNFT({ web3, account }) {
  const [img, SetImg] = useState("");
  const [name, SetName] = useState("");
  const [link, SetLink] = useState("");
  const [description, SetDescription] = useState("");

  const [hash, SetHash] = useState([]);
  const abi = ERC721abi;
  const CA = "0x89B078E2eAA3c9c93d3DF3b7A9928a7d08471661";
  const my_pri =
    "bfe5a22cf2611a04b95fa02dc63b53055ad0aad323156ce2faeaa267aef12abb";
  const my_pub = "0x63545A377b3fE7286014572d9794C93B9FC5c5a3";

  const clickButton = async () => {
    if (name !== "" && img !== "" && description !== "") {
      /*express로 서버 따로 만들어야줘야되나?? */
      const ipfsUpload = (req, res) => {
        //이미지 파일 받아서
        const file = img;
        //const file = req.files.file.data;
        //ipfs에 추가
        ipfs.files.add(file).then(result => {
            if (!result) {
              //추가한 후에 받은 link를 SetLink로 설정시키기
              //이 값이 ERC721에 들어갈 link
              SetLink(`https://ipfs.io/ipfs/${result[result.length - 1]}`);
            }
          });
      };
      ipfsUpload();



  const abi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "string",
          name: "tokenURI",
          type: "string",
        },
      ],
      name: "mintNFT",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const CA = "0x57679b27E9acc7476204d55BF97EC998c465b1FF";

  const clickButton = async () => {
    if (name !== "" && img !== "" && link !== "" && description !== "") {
      const nftContract = await new web3.eth.Contract(abi, CA);
      const nonce = await web3.eth.getTransactionCount(account, "latest");
      const tx = {
        from: account,
        to: CA,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods
          .mintNFT(account, link + `,${name},${description}`)
          .encodeABI(),
      };

      await web3.eth.sendTransaction(tx);

      // await web3.eth.accounts.signTransaction(tx, my_pri).then((signedTx) => {
      //   web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, hash) => {
      //     if (!err) {
      //       console.log("NFT전송 완료!");
      //     } else {
      //       console.log(err);
      //     }
      //   });
      // });

      const total = await nftContract.methods.totalSupply().call();

      let arr = [];
      for (let i = 1; i <= total; i++) {
        arr.push(i);
      }
      for (let Id of arr) {
        let host = await nftContract.methods.ownerOf(Id).call();
        if (String(host) === account) {
          let tokenURI = await nftContract.methods.tokenURI(Id).call();
          console.log(tokenURI);
        }
      }
    } else {
      alert("모두 입력해 주세요");
    }
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

  const convertToBuffer = async (reader) => {
    const buffer = Buffer.from(reader.result);
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
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF 
          </text>
          <img src="/" className="img" />
          <input
            id="img"
            type="file"
            placeholder="img"
            required
            onChange={imgChange}
          />
          {/* <button id="imgbutton" onClick={imgChange}>
            Select Your Image!
          </button> */}
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
