require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
RPC_URL = process.env.RPC_URL;
PRIVATE_KEY = process.env.PRIVATE_KEY;
ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  networks: {
    goerli: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      5: 1,
    },
    user: {
      default: 1,
    },
  },
  // etherscan: {
  //   https://api-goerli.etherscan.io/
  //   H9WZ8W46J7DF5YFWBY6UDFCMBAMHWJBX69
  //   apiKey: ETHERSCAN_API_KEY,
  // },
  solidity: "0.8.17",
};
