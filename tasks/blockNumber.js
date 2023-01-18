const { task } = require("hardhat/config");
//task is inside hardhat config
task("block-number", "Prints the current block number").setAction(
  // const blockTask = async function() => {}
  // async function blockTask() {}
  async (taskArgs, hre) => {
    //hre=hardhat runtime env
    //it is same as const{ethers}=require("hardhat")
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);
  }
);

module.exports = {};
