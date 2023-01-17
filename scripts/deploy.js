const { ethers } = require("hardhat");
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying contract.............");
  const simp = await SimpleStorageFactory.deploy();
  await simp.deployed();
  console.log(network.config);
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simp.deployTransaction.wait(6);
    await verify(simp.address, []);
  }
}
async function verify(contractAddress, args) {
  console.log("verifying contract........");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
