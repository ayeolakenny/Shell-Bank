import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  // Deploy Bank Contract
  const BankContract = await ethers.getContractFactory("Bank");
  const bankContract = await BankContract.deploy();
  await bankContract.deployed();

  // Deploy Shell token contract
  const Shell = await ethers.getContractFactory("Shell");
  const shell = await Shell.deploy(5000);
  await shell.deployed();

  // Deploy BNB token contract
  const BnbToken = await ethers.getContractFactory("Bnb");
  const bnbToken = await BnbToken.deploy();
  await bnbToken.deployed();

  // Deploy Link token contract
  const LinkToken = await ethers.getContractFactory("Link");
  const linkToken = await LinkToken.deploy();
  await linkToken.deployed();

  // Deploy Usdt token contract
  const UsdtToken = await ethers.getContractFactory("Usdt");
  const usdtToken = await UsdtToken.deploy();
  await usdtToken.deployed();

  // Deploy Wbtc token contract
  const WbtcToken = await ethers.getContractFactory("Wbtc");
  const wbtcToken = await WbtcToken.deploy();
  await wbtcToken.deployed();

  await bankContract.whitelistTokens(
    "Matic",
    "0xeb6ED87B4ec9CbCA1a3CD6e3162353c91b854A67"
  );

  await bankContract.whitelistTokens("Shell", shell.address);

  await bankContract.whitelistTokens("Bnb", bnbToken.address);

  await bankContract.whitelistTokens("Link", linkToken.address);

  await bankContract.whitelistTokens("Usdt", usdtToken.address);

  await bankContract.whitelistTokens("Wbtc", wbtcToken.address);

  console.log("Bank deployed to", bankContract.address);
  console.log("Shell deployed to", shell.address);
  console.log("Bnb deployed to", bnbToken.address);
  console.log("Link deployed to", linkToken.address);
  console.log("Usdt deployed to", usdtToken.address);
  console.log("Wbtc deployed to", wbtcToken.address);

  // await linkToken
  //   .connect(owner)
  //   .approve(bankContract.address, ethers.utils.parseEther("0.1"));
  // await bankContract
  //   .connect(owner)
  //   .stakeTokens("Link", ethers.utils.parseEther("0.1"));

  // await wbtcToken
  //   .connect(owner)
  //   .approve(bankContract.address, ethers.utils.parseEther("2"));
  // await bankContract
  //   .connect(owner)
  //   .stakeTokens("Wbtc", ethers.utils.parseEther("2"));

  // await wbtcToken
  //   .connect(owner)
  //   .approve(bankContract.address, ethers.utils.parseEther("10"));
  // await bankContract
  //   .connect(owner)
  //   .stakeTokens("Wbtc", ethers.utils.parseEther("10"));

  // await bnbToken
  //   .connect(owner)
  //   .approve(bankContract.address, ethers.utils.parseEther("10"));
  // await bankContract
  //   .connect(owner)
  //   .stakeTokens("Bnb", ethers.utils.parseEther("10"));

  // const provider = waffle.provider;
  // const block = await provider.getBlock();
  // const newCreatedDate = block.timestamp - 86400 * 365;
  // await bankContract.connect(owner).modifyCreatedDate(1, newCreatedDate);
  // await bankContract.connect(owner).modifyCreatedDate(2, newCreatedDate);
  // await bankContract.connect(owner).modifyCreatedDate(3, newCreatedDate);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
