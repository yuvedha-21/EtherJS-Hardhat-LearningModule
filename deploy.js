//to run this js file run ==> node deploy.js(deploy is a file name)
//like remix first we need to compile our contracts so we need to install solc package ==> solidity compiler
//to install this package we need  to install them using npm ==> node package manager
//also we can use other package managers as well , like yarn package manager
// to install yarn run ==> corepack enable
//yarn will be enabled then, now, install solc using yarn run ==> yarn add solc
//this would add some of the files to our system like - package.json which tells us about the dependencies we are using in this current project
// node modules folder will have all the packages that are being installed in our project

const ethers = require("ethers");
//yarn add ethers <== to add ethers packes to node-modules

const fs = require("fs-extra");
//to deploy the contract we need binary and abi of our contract , and we have them as a file...inorder to interact with them we need a package called fs-extra

require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://172.25.176.1:7545"
  );

  //this let us know to which block network we are connecting to
  //never hardcode accout details like private key instead use .env file to integrate which should be listed in gitignore
  const wallet = new ethers.Wallet(
    "e423ef626b864a5a5a1fc4e231972ae5204466b07dfe63224467ec64aea620e6",
    provider
  );

  // this is a private of a particular address to which we are interacting

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();

  const deploymentReceipt = await contract.deployTransaction.wait(1);
  // //waiting for one block confirmation that teh contract deployment or transaction is valid

  // console.log(deploymentReceipt);
  //await tells==> hey stop untill the deploy function completes the process then continue to next line

  /*
  if dont use await keyword :

  Deploying, please wait...
  Promise { <pending> }
  
  if we didn't ask them to wait they continue to run without letting the contract to deploy, that leads to incomplete deployment and pending promise

  */

  const nonce = await wallet.getTransactionCount();
  //wallet is our account currently we're using for transactions and contract deployment
  /* In real time we need to access the smartcontract funx just like we did in remix in that case we cannot hardcode the data like tx={}

so we fetch the methods of smartcontact we deployed

*/
  // const tx = {
  //   nonce: nonce, //every time we cannot hardcode the nonce details in a live projects
  //   gasPrice: 100000000000,
  //   gasLimit: 1000000,
  //   to: null,
  //   value: 0,
  //   data: "copy paste from SimpleStorage Binary",
  //   chainId: 1337,
  // };
  /*
  signing a transaction - this does not create a block as we are not sending the transaction,we are jjust signing a transaction

  ```
  let resp = await wallet.signTransaction(tx);
  console.log(resp);
  
  ```

  gives the output as a whole binary nums
  signing a transaction

  ------------------------------

  this is to send transaction with 0 value(eth) as mentioned in tx{} 
  

  const sentTxResponse = await wallet.sendTransaction(tx);
  console.log(sentTxResponse);
  
  */
  let currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber}`);
  console.log("Updating favorite number...");
  let transactionResponse = await contract.store(7);
  let transactionReceipt = await transactionResponse.wait();
  currentFavoriteNumber = await contract.retrieve();
  console.log(`New Favorite Number: ${currentFavoriteNumber}`);
  /* 

  console.log(currentFavoriteNumber);
BigNumber { _hex: '0x00', _isBigNumber: true }
  
  */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
