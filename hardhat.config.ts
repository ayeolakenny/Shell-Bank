import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-waffle";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: process.env.ALCHEMY_MUMBAI_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};

export default config;
