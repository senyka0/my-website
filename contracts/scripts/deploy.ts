import hre from "hardhat";
import "@nomicfoundation/hardhat-ethers";

async function main() {
  const { ethers } = hre;
  const Store = await ethers.getContractFactory("Store");
  const store = await Store.deploy();
  await store.waitForDeployment();
  const address = await store.getAddress();
  console.log(`deployed to: ${address}`);

  console.log("Waiting for block confirmations...");
  await store.deploymentTransaction()?.wait(5);

  console.log("Verifying contract...");
  try {
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: [],
    });
    console.log("Contract verified successfully");
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("Contract is already verified");
    } else {
      console.error("Verification failed:", error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
