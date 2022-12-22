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
  const provider = new ethers.providers.JsonRpcProvider("http://0.0.0.0:7545");

  //this let us know to which block network we are connecting to
  //never hardcode accout details like private key instead use .env file to integrate which should be listed in gitignore
  const wallet = new ethers.Wallet(
    "b7f7b678391d55d5fa61619a72798ae8d96ccc80358202f586b9f5be845bf7e0",
    provider
  );

  // this is a private of a particular address to which we are interacting

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  //in ethers contractFactory is an object used to deploy a contract
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet); //passing the details as arguments
  console.log("deploying contract....");
  const contract = await ethers.contractFactory.deploy();
  console.log(contract);
  //await tells==> hey stop untill the deploy function completes the process then continue to next line
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
