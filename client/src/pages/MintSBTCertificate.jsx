import React from 'react';
import { useState, useEffect } from "react";

const{contractSBT_Address,contractSBT_ABI} =require('../contract_instance/contractSBT_Instance')
const { ethers } = require("ethers");

const MintCertificate = () => {

const [account, setAccount] = useState("");
const [contractSBT, setContractSBT] = useState(null);
const [provider, setProvider] = useState(null);
const [signer, setSigner] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        await provider.send("eth_requestAccounts", []);
        const signerA = provider.getSigner();
        setSigner(signerA);
        const address = await signerA.getAddress();
        setAccount(address);
        const contract1 = new ethers.Contract(
            contractSBT_Address,
            contractSBT_ABI,
          signerA
        );
        setContractSBT(contract1);
        setProvider(provider);
        console.log("Account Address is",account);
        console.log("Signer Address is",signer);
        console.log("Contract Instance is ",contractSBT);
        console.log("Provider is ", provider);
      } else {
        alert("Wallet is not present");
      }
    };
    provider && loadProvider();
  }, []);


  return (
    <div>MintCertificate</div>
  )
}

export default MintCertificate