module.exports = async ({ getNamedAddress, deployment }) => {
  const { deploy, log } = deployment;
  const { deployer } = await getNamedAddress();
  const chainId = network.config.chainId;

  const { networkConfig } = require("../helper-hardhat-config");
  const ethUsdPriceFeed = networkConfig[chainId]["ethUsdPriceFeed"];
  const fundMe = await deploy("FundMe", {
    from: deployer,
    address: [
      /* address of deployed testnet's pricefeed contract or mocked local contract */
    ],
    log: true,
  });
};
