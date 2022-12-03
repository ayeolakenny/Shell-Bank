import { ethers } from "hardhat";
import { expect } from "chai";
import { Shell, Shell__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ShellToken Contract", () => {
  // global vars
  let ShellToken: Shell__factory;
  let shellToken: Shell;
  let owner: SignerWithAddress;
  let address1: SignerWithAddress;
  let address2: SignerWithAddress;
  let tokenCap = 5000;

  beforeEach(async () => {
    // Get the contract and signature then deploy
    ShellToken = await ethers.getContractFactory("Shell");
    [owner, address1, address2] = await ethers.getSigners();
    shellToken = await ShellToken.deploy(tokenCap);
    await shellToken.deployed();
    console.log(`Shell token deployed to ${shellToken.address}`);
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await shellToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async () => {
      const ownerBalance = await shellToken.balanceOf(owner.address);
      expect(await shellToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should set the max capped supply to the argument provided during deployment", async () => {
      const cap = await shellToken.cap();
      expect(Number(ethers.utils.formatEther(cap))).to.equal(tokenCap);
    });

    // it("Should set block reward to the argument provided during deployment", async () => {
    //   const blockReward = await shellToken.blockReward();
    //   expect(Number(ethers.utils.formatEther(blockReward))).to.equal(
    //     tokenBlockReward
    //   );
    // });
  });

  describe("Transaction", () => {
    it("Should transfer tokens between accounts", async () => {
      // Transfer 50 tokens from owner to address1
      await shellToken.transfer(address1.address, 50);
      const address1Balance = await shellToken.balanceOf(address1.address);
      expect(address1Balance).to.equal(50);

      // Transfer 50 tokens from address1 to address2
      // We use .connect(signer) to transfer from another account
      await shellToken.connect(address1).transfer(address2.address, 50);
      const address2Balance = await shellToken.balanceOf(address2.address);
      expect(address2Balance).to.equal(50);
    });

    it("Should fail if sender does not have enough tokens", async () => {
      const initialOwnerBalance = await shellToken.balanceOf(owner.address);
      // Try to send 1 token from address1 which has 0 tokens to owner.
      //   require would evaluate false and revert the transfer
      //   expect(
      //     await shellToken.connect(address1).transfer(owner.address, 50)
      //   ).to.be.revertedWith("transfer amount exceeds balance");

      // owner balance should not have changed
      expect(await shellToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async () => {
      const initialOwnerBalance = await shellToken.balanceOf(owner.address);

      // transfer 100 to address 1
      await shellToken.transfer(address1.address, 100);

      // transfer 50 to address 2
      await shellToken.transfer(address2.address, 50);

      //   check balances
      const finalOwnerBalance = await shellToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

      const address1Balance = await shellToken.balanceOf(address1.address);
      expect(address1Balance).to.equal(100);

      const address2Balance = await shellToken.balanceOf(address2.address);
      expect(address2Balance).to.equal(50);
    });
  });
});
