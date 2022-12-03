import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { waffle, ethers } from "hardhat";
import { Bank, Bank__factory, Link, Link__factory } from "../typechain-types";

let owner: SignerWithAddress;
let signer2: SignerWithAddress;
let Bank: Bank__factory;
let bank: Bank;
let LinkToken: Link__factory;
let linkToken: Link;

// get an balance of an account
async function getBalance(address: string) {
  const balanceBigInt = await waffle.provider.getBalance(address);
  return ethers.utils.formatEther(balanceBigInt);
}

describe("Bank", () => {
  beforeEach(async () => {
    [owner, signer2] = await ethers.getSigners();
    Bank = await ethers.getContractFactory("Bank");
    bank = await Bank.deploy();
    await bank.deployed();
    console.log(`Bank deployed to ${bank.address}`);

    LinkToken = await ethers.getContractFactory("Link");
    linkToken = await LinkToken.deploy();
    await linkToken.deployed();
    console.log(`Link token deployed to ${linkToken.address}`);
  });

  describe("deposit matic token", () => {
    const amount = "1.0";
    it("deposits matic token", async () => {
      await signer2.sendTransaction({
        to: bank.address,
        value: ethers.utils.parseEther(amount),
      });
      const userMaticBalance = await bank
        .connect(signer2)
        .getTokenBalance("Matic");
      const balance = ethers.utils.formatEther(userMaticBalance).toString();
      expect(balance).eql(amount);
    });
  });

  // describe("withdraw matic token", () => {
  //   const amount = "1.0";
  //   it("withdraw matic token", async () => {
  //     await signer2.sendTransaction({
  //       to: bank.address,
  //       value: ethers.utils.parseEther(amount),
  //     });

  //     await bank.connect(signer2).withdrawMatic(1.0);

  //     const userMaticBalance = await bank
  //       .connect(signer2)
  //       .getTokenBalance("Matic");

  //     const balance = ethers.utils.formatEther(userMaticBalance).toString();
  //     console.log("Balance:", balance);

  //     expect(Math.floor(Number(balance))).eql(0);
  //   });
  // });
});
