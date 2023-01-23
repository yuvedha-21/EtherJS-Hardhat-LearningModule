/*
to let all the chains to work with a smooth flow in our application,map all the chain with is pricefeed contract or other chainlink API.

exporting inorder to use contract address of chainlink API of different chains by identifying the chain by chainId at the time of deployment

*/

const networkConfig = {
  5: {
    name: "goerli",
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
  },
  //can add more testnet to ensure smooth flow of our application to process
};

const deploymentChains = ["hardhat", "localhost"];
const DECIMAL = 8;
const INITIAL_PRICE = 200000000000;
module.exports = {
  networkConfig,
  deploymentChains,
  DECIMAL,
  INITIAL_PRICE,
};
