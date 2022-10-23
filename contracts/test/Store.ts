import { expect } from "chai";
import { ethers } from "hardhat";

describe("Store", () => {
  it("Should store and return cv hash", async () => {
    const Store = await ethers.getContractFactory("Store");
    const store = await Store.deploy();
    await store.deployed();
    await store.setCVHash("abc");
    expect(await store.cvHash()).to.equal("abc");
  });
});
