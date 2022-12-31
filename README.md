

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/rickyvadala/loethery">
    <img src="images/logo.png" alt="Logo" width="400">
  </a>

<h3 align="center">Loethery</h3>

  <p align="center">
    The decentralized web3 lottery
    <br />
    <a href="https://github.com/rickyvadala/loethery">Explore the repository »</a>
    <br />
    <br />
    ··· <a href="https://loethery.rickyvadala.com"><strong>LIVE Demo</strong></a> ···
  </p>
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
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://loethery.rickyvadala.com)

Loethery is a blockchain lottery case of study made by <a target="_blank" href="http://rickyvadala.com/">Ricky Vadala</a> for <a href="http://olatim.com/" target="_blank">Olatim Community</a>    

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Javascript][Javascript]][Javascript-url]
* [![Typescript][Typescript]][Typescript-url]
* [![Node][Node]][Node-url]
* [![Solidity][Solidity]][Solidity-url]
* [![React][React.js]][React-url]
* [![Vite][Vite]][Vite-url]

[![Tailwind][Tailwind]][Tailwind-url]
[![Mocha][Mocha]][Mocha-url]
[![Ethers][Ethers]][Ethers-url]
[![Web3][Web3]][Web3-url]
[![Truffle][Truffle]][Truffle-url]
[![Ganache][Ganache]][Ganache-url]
[![Firebase][Firebase]][Firebase-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/rickyvadala/loethery.git
   ```
2. Install NPM packages on both projects (frontend & contracts)
   ```sh
   npm install
   ```
3. Required Accounts
   1. [MetaMask](https://metamask.io/)
      1. Create or login into a wallet
      2. Copy your **mnemonic**
      3. Select Goerli Test Network
      4. Get some free GoerliETH from this [faucet](https://goerlifaucet.com/)
   2. [Etherscan](https://etherscan.io/)
      1. Get an **API key**
   3. [Infura](https://app.infura.io/)
      1. Get an **API key**
   
4. Create a `.env` file in the root folder on both projects (frontend & contracts).
   ```
   # .env file on loethery-frontend
   VITE_ETHERSCAN_API_KEY = YOUR_ETHERSCAN_API_KEY
   ```

   ```
   # .env file on loethery-contracts
   WALLET_MNEMONIC="YOUR_METAMASK_MNEMONIC"
   INFURA_API_KEY="YOUR_INFURA_API_KEY"
   ```
5. To deploy your own version of the contract
   ```sh
   npm run deploy
   ```
6. To run the frontend
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

[![MIT License][license-shield]][license-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Ricky Vadala

[![Website][website-shield]][website-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Gmail][gmail-shield]][gmail-url]
[![Instagram][instagram-shield]][instagram-url]
[![Github][github-shield]][github-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/rickyvadala/loethery.svg?style=for-the-badge
[contributors-url]: https://github.com/rickyvadala/loethery/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/rickyvadala/loethery.svg?style=for-the-badge
[forks-url]: https://github.com/rickyvadala/loethery/network/members
[stars-shield]: https://img.shields.io/github/stars/rickyvadala/loethery.svg?style=for-the-badge
[stars-url]: https://github.com/rickyvadala/loethery/stargazers
[issues-shield]: https://img.shields.io/github/issues/rickyvadala/loethery.svg?style=for-the-badge
[issues-url]: https://github.com/rickyvadala/loethery/issues
[license-shield]: https://img.shields.io/github/license/rickyvadala/loethery.svg?style=for-the-badge
[license-url]: https://github.com/rickyvadala/loethery/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/linkedIn-black?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ricardovadala
[gmail-shield]: https://img.shields.io/badge/mail-black?style=for-the-badge&logo=gmail&colorB=555
[gmail-url]: mailto:rickyvadala@gmail.com
[instagram-shield]: https://img.shields.io/badge/instagram-black?style=for-the-badge&logo=instagram&colorB=555
[instagram-url]: mailto:rickyvadala@gmail.com
[github-shield]: https://img.shields.io/badge/github-black?style=for-the-badge&logo=github&color=555
[github-url]: mailto:rickyvadala@gmail.com
[website-shield]: https://img.shields.io/badge/website-black?style=for-the-badge&logo=googlemaps&colorB=555
[website-url]: http://rickyvadala.com

[product-screenshot]: images/loethery.png

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/react-black?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Vite]: https://img.shields.io/badge/vite-black?style=for-the-badge&logo=vite&logoColor=9468fe
[Vite-url]: https://vitejs.dev/
[Tailwind]: https://img.shields.io/badge/tailwind-black?style=for-the-badge&logo=tailwindcss&logoColor=blue
[Tailwind-url]: https://tailwindcss.com/
[Solidity]: https://img.shields.io/badge/solidity-black?style=for-the-badge&logo=solidity&logoColor=darkgray
[Solidity-url]: https://soliditylang.org/
[Javascript]: https://img.shields.io/badge/javascript-black?style=for-the-badge&logo=javascript&logoColor=yellow
[Javascript-url]: https://www.ecma-international.org/publications-and-standards/standards/ecma-262/
[Typescript]: https://img.shields.io/badge/typescript-black?style=for-the-badge&logo=typescript&logoColor=blue
[Typescript-url]: https://www.typescriptlang.org/
[Node]: https://img.shields.io/badge/node-black?style=for-the-badge&logo=nodedotjs&logoColor=green
[Node-url]: https://nodejs.org/en/
[Mocha]: https://img.shields.io/badge/mocha-black?style=for-the-badge&logo=mocha&logoColor=brown
[Mocha-url]: https://mochajs.org/
[Ethers]: https://img.shields.io/badge/ethers.js-black?style=for-the-badge&logo=ethersdotjs&logoColor=white
[Ethers-url]: https://docs.ethers.org/
[Web3]: https://img.shields.io/badge/web3.js-black?style=for-the-badge&logo=web3&logoColor=white
[Web3-url]: https://web3js.org/
[Truffle]: https://img.shields.io/badge/truffle-black?style=for-the-badge&logo=truffle&logoColor=white
[Truffle-url]: https://trufflesuite.com/
[Ganache]: https://img.shields.io/badge/ganache-black?style=for-the-badge&logo=ganache&logoColor=white
[Ganache-url]: https://trufflesuite.com/docs/ganache
[Firebase]: https://img.shields.io/badge/firebase-black?style=for-the-badge&logo=firebase&logoColor=golden
[Firebase-url]: https://firebase.google.com/docs
