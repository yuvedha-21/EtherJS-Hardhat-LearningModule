const { networkConfig } = require("../helper-hardhat-config.js");
//to let js know from where network is coming
const { network } = require("hardhat");
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  //getting exported networkConfig
  //getting key value from chain mapping[helper-hardhat]
  const ethUsd = networkConfig[chainId]["ethUsdPriceFeed"];
  //deployment funct
  console.log(ethUsd);
  let fundMe = await deploy("FundMe", {
    //letting function know which address to use for deployment
    from: deployer,
    address: [ethUsd],
    log: true,
  });
  await fundMe.deployed();
  //   console.log(fundme.address);
};
module.exports.tags = ["all", "fundme"];
