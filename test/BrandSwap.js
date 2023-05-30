const { expect } = require("chai");
const hre = require("hardhat");

describe("BrandSwap Contract", function () {
    it("Should be set name and symbol", async function () {
      const name = "BrandSwap";
      const symbol = "BS";
      const BrandSwap = await hre.ethers.getContractFactory("BrandSwap");
      const brandSwap = await BrandSwap.deploy();
      await brandSwap.deployed();

      expect(await brandSwap.name()).to.equal(name);
      expect(await brandSwap.symbol()).to.equal(symbol);
    });
    it("deploy address should be set to owner", async function () {
        const [owner] = await hre.ethers.getSigners();
        const BrandSwap = await hre.ethers.getContractFactory("BrandSwap");
        const brandSwap = await BrandSwap.deploy();
        await brandSwap.deployed();

        expect(await brandSwap.owner()).to.equal(owner.address);
    });
});
