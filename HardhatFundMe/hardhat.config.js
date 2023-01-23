require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
//for .env file
require("dotenv").config();
//package for easy deployment
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
RPC_URL = process.env.RPC_URL;
PRIVATE_KEY1 = process.env.PRIVATE_KEY1;
PRIVATE_KEY2 = process.env.PRIVATE_KEY2;

// ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  networks: {
    goerli: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY1, PRIVATE_KEY2],
      chainId: 5,
    },
  },
  //giving specification on which ID should be used when like for deployment , for users etc..
  namedAccounts: {
    deployer: {
      default: 0,
      5: 1,
    },
    // user: {
    //   default: 0,
    // },
  },
  // etherscan: {
  //   https://api-goerli.etherscan.io/
  //   H9WZ8W46J7DF5YFWBY6UDFCMBAMHWJBX69
  //   apiKey: ETHERSCAN_API_KEY,
  // },
  //to use diff sol compilers add multiple compilers
  // solidity: "0.8.17",
  solidity: {
    compilers: [
      {
        version: "0.8.8",
      },
      {
        version: "0.6.6",
      },
    ],
  },
};
