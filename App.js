import { useState } from "react";
import Web3 from "web3";
import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Homepage from "./Components/Homepage";
import NftList from "./Components/NftList";
import Navbar from "./Components/Navbar";
/*import NftList from "./Components/NftList";*/

function App() {
  const [light, SetLight] = useState(false);
  /*web3설정 */
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  };

  return (
    <div className="App">
      <Navbar
        SetLight={SetLight}
        light={light}
        connectWallet={connectWallet}
        web3={web3}
        account={account}
      />
      <Switch>
        <Route exact path="/">
          <Homepage light={light} />
          <Footer />
        </Route>
        <Route path="/assets">
          <NftList connectWallet={connectWallet} web3={web3} account={account}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
