import { ethers } from "hardhat";

async function main() {
  const Store = await ethers.getContractFactory("Store");
  const store = await Store.deploy();
  await store.deployed();
  console.log(`deployed to: ${store.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
