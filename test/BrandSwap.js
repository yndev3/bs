const { expect } = require("chai");
const hre = require("hardhat");
describe("BrandSwap Contract", function () {
    const name = "BrandSwap";
    const symbol = "BS";
    let BrandSwap;
    let brandSwap;
    let owner;
    const baseURI = 'ipfs://aaa/';
    const tokenUri1 = 'testUri1';
    const tokenUri2 = 'testUri2';

    beforeEach(async function () {
        [owner, addr1] = await hre.ethers.getSigners();
        BrandSwap = await hre.ethers.getContractFactory("BrandSwap");
        brandSwap = await BrandSwap.deploy();
        await brandSwap.deployed();
    });

    it("Should be set name and symbol", async function () {
        expect(await brandSwap.name()).to.equal(name);
        expect(await brandSwap.symbol()).to.equal(symbol);
    });
    it("Deploy address should be set to owner", async function () {
        expect(await brandSwap.owner()).to.equal(owner.address);
    });
    it('Owner should have admin rights', async function () {
        expect(await brandSwap.isAdmin(await brandSwap.owner())).to.equal(true);
    });
    it('User should not have admin rights', async function () {
        expect(await brandSwap.isAdmin(addr1.address)).to.equal(false);
    });
    it("Should owner is able to grant admin role", async function () {
        await brandSwap.grantAdminRole(addr1.address);
        expect(await brandSwap.isAdmin(addr1.address)).to.equal(true);
    });
    it("Should not user is able to grant admin role", async function () {
        expect(brandSwap.connect(addr1).grantAdminRole(addr1.address)).to.be.reverted;
    });

    it("Can't remove owner permissions", async function () {
        expect(await brandSwap.revokeAdmin(await brandSwap.owner()))
            .to.be.revertedWith("AccessControl: Can not revoke roles for owner");
    });
    it("Owner role should not be revoked by user", async function () {
        expect(brandSwap.connect(addr1).revokeAdmin(await brandSwap.owner()))
            .to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("Only administrators can mint", async function () {
        await brandSwap.nftMint(tokenUri1);
        expect(await brandSwap.ownerOf(1)).to.equal(await brandSwap.owner());
    });
    it("Non administrators cannot mint", async function () {
        await expect(brandSwap.connect(addr1).nftMint(tokenUri1)).to.be.reverted;
    });
    it("Token Id should be incremented every time NFT is created", async function () {
        await brandSwap.nftMint(tokenUri1);
        await brandSwap.nftMint(tokenUri2);
        expect(await brandSwap.tokenURI(1)).to.equal(baseURI.concat(tokenUri1));
        expect(await brandSwap.tokenURI(2)).to.equal(baseURI.concat(tokenUri2));
    });

});


