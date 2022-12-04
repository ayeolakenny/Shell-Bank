<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
  </a>

  <h3 align="center">SHELL Bank</h3>

<!-- CONTACT -->

## Important Links

Project Link: [https://shell-client.vercel.app](https://shell-client.vercel.app)

Github Link: [https://github.com/ayeolakenny/Shell](https://github.com/ayeolakenny/Shell)

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#installation">Installation</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Shell Bank][product-screenshot]](./client/src/images/website01.png)

Shell Bank is basically an dapp that helps stake your ERC20 tokens for a period of time you want, pays you interest in the banks unique token (SHT) based on the number of days/months you chose and also ability withdraw back your original token when staking period is over.

Main Features:

- Stake your ERC20 tokens and get interest based on time and amount staked
- Deposit and Withdraw ERC20 token from the wallet to the app.
- Get interest in the Banks Unique SHT token

The Shell Bank Dapp also has its own unique token `Shell Token (SHT)` which is used to pay off interest to people when staking their ERC20 token.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

Technologies Shell Bank was built with.

- [![Solidity][solidity.com]][solidity-url]
- [![Next][next.js]][next-url]
- [![React][react.js]][react-url]
- [![Typescript][typescript]][typescript-url]
- [![Bootstrap][bootstrap.com]][bootstrap-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get Started you need a metamask account with a mumbai testnet, alchemy account or any corresponding networks to deploy your testnet

### Prerequisites

1. Get a free RPC Url at [Alchemy](https://www.alchemy.com/) and create a project on the mumbai testnet

2. Get metamask account and create a mumbai testnet

### Installation

2. Clone the repo

   ```sh
   git clone https://github.com/ayeolakenny/Shell.git
   https://www.alchemy.com/

   ```

3. Install NPM packages
   ```sh
   yarn install
   ```
4. Enter your API in `.env`

   ```.env
    PRIVATE_KEY=
    ALCHEMY_MUMBAI_ENDPOINT=
   ```

5. Deploy app to testnet and copy the various addresses to their variables under `client/src/contants/index.ts`
   ```sh
    yarn hardhat run scripts/deploy.ts --network mumbai
   ```
   result should be
   ```sh
    Bank deployed to 0x46264Fc466440d01aA2591B523B691D959b9F10A
    Shell deployed to 0x1eac77FE96bD81F49d3E3e87E2EC78C6491c2C3A
    Bnb deployed to 0x07f5E0A1316aef8A08f2a25ad8115B77F12a9CF4
    Link deployed to 0xB8e426EB38ce3347328a461eD51973A496a637cB
    Usdt deployed to 0x4634B54c019Df8593636091E7C7e673823E050b1
    Wbtc deployed to 0x7AF3fA31C867175AE412AF88487cB3F3151752E9
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[product-screenshot]: ./client/src/images/website01.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[solidity.com]: https://img.shields.io/badge/Solidity-e6e6e6?style=for-the-badge&logo=solidity&logoColor=black
[solidity-url]: https://soliditylang.org/
[typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: hhttps://www.typescriptlang.org/
