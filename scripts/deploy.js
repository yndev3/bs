const fs = require("fs");

const tokenURI = 'bafkreih3ybpzqlxcg25peckyyzd6iddoldpbrxl46dng7ggg4tovookwvq';
const addr = '0xD38Eb334caC02650c1Dc01f6f98b78dbdFAC7A67';
const main = async () => {
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