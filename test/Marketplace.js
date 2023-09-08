const { expect } = require("chai");
const hre = require("hardhat");
describe("Marketplace Contract", function () {
    let BrandSwap, brandSwap;
    let ERC20, erc20;
    let Marketplace, marketplace;
    let owner, buyer, attacker, mocker;

    beforeEach(async function () {
        [owner, buyer, attacker, mocker] = await hre.ethers.getSigners();
        BrandSwap = await hre.ethers.getContractFactory("BrandSwap");
        Marketplace = await hre.ethers.getContractFactory("Marketplace");
        ERC20 = await hre.ethers.getContractFactory("ERC20PresetFixedSupply"); // This is a mock ERC20 token for testing purposes

        // Deploying the contracts
        brandSwap = await BrandSwap.deploy();
        await brandSwap.deployed();

        marketplace = await Marketplace.deploy(brandSwap.address, owner.address);
        await marketplace.deployed();

        erc20 = await ERC20.deploy(
            'Test Token',
            'Txt',
            hre.ethers.utils.parseEther("30"),
            buyer.address
        );

        await erc20.deployed();
        expect(await erc20.balanceOf(buyer.address)).to.equal(hre.ethers.utils.parseEther("30"));

    });

    it('allows the owner to set a sale', async () => {
        // Minting an NFT
        const uri = "ipfs://aaa/1";
        await brandSwap.connect(owner).nftMint(uri);
        const ownerBalance = await brandSwap.balanceOf(owner.address);
        expect(ownerBalance).to.equal(1);
        expect(await brandSwap.ownerOf(1)).to.equal(owner.address);

        // The owner approves the Marketplace to operate the token
        await brandSwap.connect(owner).approve(marketplace.address, 1);

        // Setting NFT for sale
        const price = hre.ethers.utils.parseEther("10"); // price is 1 ERC20 token
        const payment = hre.ethers.utils.parseEther("10");// price is 1 ERC20 token
        await marketplace.connect(owner).setSale(1, price, true);

        // Checking the sale
        const sale = await marketplace.getSale(1);
        expect(sale.price).to.equal(price);
        expect(sale.isSale).to.be.true;

        // Setting the currency
        await marketplace.connect(owner).setTokenContract(erc20.address);

        // Approving tokens to marketplace
        await erc20.connect(buyer).approve(marketplace.address, price);

        // Buying the NFT
        await marketplace.connect(buyer).buyWithERC20(1, payment, erc20.address);
        const buyerBalance = await brandSwap.balanceOf(buyer.address);
        expect(buyerBalance).to.equal(1);
        expect(await erc20.balanceOf(buyer.address)).to.equal(hre.ethers.utils.parseEther("20"));
    });


});