import "./App.css";
import NFT from "./components/NFT";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import DeSoIdentity from "./tools/desoIdentity";
import DesoApi from "./tools/desoAPI";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const IdentityUsersKey = "identityUsersV2";

function App() {
  const [publicKey, setPublicKey] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [desoPrice, setDeSoPrice] = useState(32);
  const [isLoading, setIsLoading] = useState(true);
  const [appState, setAppState] = useState(null);
  const [desoIdentity, setDesoIdentity] = useState(null);
  const [desoApi, setDesoApi] = useState(null);
  const initAppState = async (da) => {
    try {
      const exchangeRate = await da.getDeSoPrice();
      const desoPrice = exchangeRate.USDCentsPerDeSoExchangeRate;
      setDeSoPrice(desoPrice);
      const getAppState = await da.getAppState();
      console.log(getAppState);
      setAppState(getAppState);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    setIsLoading(true);
    const di = new DeSoIdentity();
    setDesoIdentity(di);
    const da = new DesoApi();
    setDesoApi(da);
    let user = {};
    if (localStorage.getItem(IdentityUsersKey) === "undefined") {
      user = {};
    } else if (localStorage.getItem(IdentityUsersKey)) {
      user = JSON.parse(localStorage.getItem(IdentityUsersKey) || "{}");
    }
    if (user.publicKey) {
      setLoggedIn(true);
      setPublicKey(user.publicKey);
      localStorage.setItem("lastLoggedInUser", `${user.publicKey.toString()}`);
    }
    await initAppState(da);
    setIsLoading(false);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/NFT' element={<Home />} />
        <Route path='/NFT/:postHashHex' element={<NFT />} />
      </Routes>
    </Router>
  );
}

export default App;
