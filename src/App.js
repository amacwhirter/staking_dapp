import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import TetherToken from './build/Tether_Token.json';
import DummyToken from './build/Dummy_Token.json';
import StakingDapp from './build/Staking_Dapp.json';
import {Component, useEffect, useState} from "react";

export const App = (props) => {
  const [account, setAccount] = useState('0x0');
  const [tetherToken, setTetherToken] = useState({});
  const [tetherTokenBalance, setTetherTokenBalance] = useState('0');
  const [dummyToken, setDummyToken] = useState({});
  const [dummyTokenBalance, setDummyTokenBalance] = useState('0');
  const [stakingDapp, setStakingDapp] = useState({});
  const [stakingDappBalance, setStakingDappBalance] = useState('0');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialLoad = async () => {
      await loadWeb3();
      await loadBlockchainData();
    }

    initialLoad().catch(console.error)
  }, [])

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccount();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const TetherTokenData = TetherToken.networks[networkId];
    const DummyTokenData = DummyToken.networks[networkId];
    const StakingDappData = StakingDapp.networks[networkId];

    if (TetherTokenData) {
      const tetherToken = new web3.eth.Contract(TetherToken.abi, TetherTokenData.address)
      setTetherToken(tetherToken);
      let tetherTokenBalance = await tetherToken.methods.balance(account).call();
      setTetherTokenBalance(tetherTokenBalance.toString());
    }

    if (DummyTokenData) {
      const dummyToken = new web3.eth.Contract(DummyToken.abi, DummyTokenData.address)
      setDummyToken(dummyToken);
      let dummyTokenBalance = await dummyToken.methods.balance(account).call();
      setDummyTokenBalance(dummyTokenBalance.toString());
    }

    if (StakingDappData) {
      const newStakingDapp = new web3.eth.Contract(StakingDapp.abi, StakingDappData.address)
      setStakingDapp(newStakingDapp);
      let stakingDappBalance = await stakingDapp.methods.stakingBalance(account).call();
      setStakingDappBalance(stakingDappBalance.toString());
    }
  }

  // connect web3, metamask to dapp
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-Ethereum browser detected. you should consider trying Metamask!");
    }
  }

  const stakeTokens = (amount) => {
    setLoading(true);
    tetherToken.methods.approve(stakingDapp.address, amount).send({from: account}).on("transactionHash", (hash) => {
      stakingDapp.methods.stakeTokens(amount).send({from: account}).on("transactionHash", (hash) => {
        setLoading(false);
      })
    });
  }

  const unstakeTokens = (amount) => {
    setLoading(true);
    stakingDapp.methods.unstakeTokens(amount).send({from: account}).on("transactionHash", (hash) => {
      setLoading(false);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App;
