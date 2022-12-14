const Web3 = require("web3");
// Loading the contract ABI
// (the results of a previous compilation step)
const fs = require("fs");
const { abi } = JSON.parse(fs.readFileSync("build/contracts/MintNFT.json"));
const pinata=require('./pinata_api')
// import { SDK, Auth, TEMPLATES } from '@infura/sdk';

async function mintNFTs() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
    )
  );
  // console.log(web3)
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY
  );
  // console.log(await web3.eth.getBalance(signer))
  web3.eth.accounts.wallet.add(signer);
  // Creating a Contract instance
  // console.log(process.env.MINT_CONTRACT)
  const contract = new web3.eth.Contract(
    abi,
    process.env.MINT_CONTRACT
  );
  // console.log(contract)
  // Issuing a transaction that calls the "mint" method
  const res=(await pinata.pinFileToIPFS())
  var IPFS_hash
  if(res.status==200)
  {
    IPFS_hash=res.IPFS_hash
  }
  else 
  {
    console.error("File upload to pinata failed")
    return
  }

  const _tokenURI="https://ipfs.io/ipfs/"+IPFS_hash+"?filename=meta2.json"
  const tx=contract.methods.mint(_tokenURI)
  var url,blocknumber;
  const receipt = await tx
  .send({
    from: signer.address,
    gasLimit: 500000
  })
  .once("transactionHash", (txhash) => {
    console.log(`Mining transaction ...`);
    url=`https://${network}.etherscan.io/tx/${txhash}`
    console.log(`https://${network}.etherscan.io/tx/${txhash}`);

  }).on('error',(err)=>{
    console.log(err)
  });

// The transaction is now on chain!
blocknumber= receipt.blockNumber
console.log('Mined in block ',blocknumber);
console.log("IPFS Hash",IPFS_hash);
return {"url":url,"blockNumber":blocknumber,"IPFS_hash":IPFS_hash,"message":"NFT minted successfully"}
}
async function getAllNFTs(){

}
require("dotenv").config();
module.exports={
  mintNFTs,
  getAllNFTs
}
// mintNFTs();
