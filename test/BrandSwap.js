const { expect } = require("chai");
const hre = require("hardhat");
describe("BrandSwap Contract", function () {
    const name = "BrandSwap";
    const symbol = "BS";
    let BrandSwap;
    let brandSwap;
    let owner;
    const baseURI = 'ipfs://';
    const tokenUri1 = 'testUri1';
    const tokenUri2 = 'testUri2';

    const DEFAULT_ADMIN_ROLE =  hre.ethers.utils
        .keccak256(
            hre.ethers.utils.toUtf8Bytes("DEFAULT_ADMIN_ROLE")
        );
    const BURNER_ROLE =  hre.ethers.utils
            .keccak256(
                hre.ethers.utils.toUtf8Bytes("BURNER_ROLE")
            );

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
        expect(await brandSwap.defaultAdmin()).to.equal(owner.address);
    });
    it('Account should not have admin rights', async function () {
        expect(await brandSwap.hasRole(DEFAULT_ADMIN_ROLE, addr1.address)).to.equal(false);
    });
    it("Default admin can change", async function () {
        await brandSwap.beginDefaultAdminTransfer(addr1.address);
        expect(await brandSwap.defaultAdmin()).to.equal(await brandSwap.owner());
        await brandSwap.changeDefaultAdminDelay(86400 * 2);
        // to delay 3days
        await hre.network.provider.send("evm_increaseTime", [86400 * 5]);
        await hre.network.provider.send("evm_mine");
        await brandSwap.connect(addr1).acceptDefaultAdminTransfer();

        expect(await brandSwap.defaultAdmin()).to.equal(addr1.address);
    });

    it("Owners can assign roles to accounts", async function () {
        await brandSwap.grantRole(DEFAULT_ADMIN_ROLE, addr1.address);
        expect(await brandSwap.hasRole(DEFAULT_ADMIN_ROLE, addr1.address)).to.equal(true);
    });
    it("Should not user is able to grant admin role", async function () {
        expect(brandSwap.connect(addr1).grantRole(DEFAULT_ADMIN_ROLE, addr1.address)).to.be.reverted;
    });

    it("Owner role should not be revoked by user", async function () {
        expect(brandSwap.connect(addr1).revokeRole(DEFAULT_ADMIN_ROLE, owner.address)).to.be.reverted;
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
    it("Event should emit when NFT is created", async function () {
        await expect(brandSwap.nftMint(tokenUri1))
            .to.emit(brandSwap, 'nftMinted')
            .withArgs(await brandSwap.owner(), 1, tokenUri1);
    });
    it("NFT can be burned by owner", async function () {
        await brandSwap.nftMint(tokenUri1);
        await brandSwap.burn(1);
        expect(await brandSwap.balanceOf(await brandSwap.owner())).to.equal(0);
        // another account can burn
        await brandSwap.grantRole(BURNER_ROLE, addr1.address);
        await brandSwap.nftMint(tokenUri2);
        await brandSwap.connect(addr1).burn(2);
        expect(await brandSwap.balanceOf(await brandSwap.owner())).to.equal(0);
    });
    it("Only accounts with roles can be burned.", async function () {
        await brandSwap.nftMint(tokenUri1);
        await expect(brandSwap.connect(addr1).burn(1)).to.be.reverted;
    });
});


