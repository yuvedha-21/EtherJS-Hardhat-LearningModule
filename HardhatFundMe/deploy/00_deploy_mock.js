const { network } = require("hardhat");
const { deploymentChains } = require("../helper-hardhat-config");
const DECIMALS = "8";
const INITIAL_PRICE = "200000000000";
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  if (deploymentChains.includes(network.name)) {
    log("Deploying to chainId: " + chainId);
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      /*import "@chainlink/contracts/src/v0.6/tests/MockV3Aggregator.sol"*/
      args: [
        DECIMALS,
        INITIAL_PRICE,
      ] /*constructor arguments of mockV3Aggregator*/,
    });
    log("Mocks deployed.................");
  }
};
module.exports.tags = ["tag", "mock"];
