const fs = require("fs");
const hre = require('hardhat');

const tokenURI = 'bafkreih3ybpzqlxcg25peckyyzd6iddoldpbrxl46dng7ggg4tovookwvq';
const addr = '0xD38Eb334caC02650c1Dc01f6f98b78dbdFAC7A67';
const main = async () => {
  let owner, buyer, attacker, mocker;
  [owner, buyer, attacker, mocker] = await hre.ethers.getSigners();
  let BrandSwap = await ethers.getContractFactory('BrandSwap');
  let brandSwap = await BrandSwap.deploy();
  await brandSwap.deployed();
  console.log(
      `Contract deployed to: https://mumbai.polygonscan.com/address/${ brandSwap.address }`);

  const tx = await brandSwap.nftMint(tokenURI);
  tx.wait();
  console.log('NFT#1 minted...');

  fs.writeFileSync(
      './brandSwapContract.js',
      `
            module.exports = "${ brandSwap.address }"
          `,
  );

  let Marketplace = await ethers.getContractFactory('Marketplace');
  let marketplace = await Marketplace.deploy(brandSwap.address, addr);
  await marketplace.deployed();

  const ERC20 = await hre.ethers.getContractFactory("ERC20PresetFixedSupply");
  const erc20 = await ERC20.deploy(
      'Test Token',
      'TXT',
      hre.ethers.utils.parseEther("1000"),
      buyer.address
  );
  await erc20.deployed();
  console.log({
    brandSwap: brandSwap.address,
    marketplace: marketplace.address,
    erc20: erc20.address,
  });
  console.log({
    owner:owner.address,
    buyer:buyer.address
  });
};

const deploy = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

deploy();