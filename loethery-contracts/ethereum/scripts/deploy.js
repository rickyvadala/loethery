const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
const compiledContract = require('../build/Lottery.json');

require('dotenv').config();

const provider = new HDWalletProvider(
  process.env.WALLET_MNEMONIC,
  'https://goerli.infura.io/v3/' + process.env.INFURA_API_KEY
);

const web3 = new Web3(provider);

(async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(`Attempting to deploy from account: ${accounts[0]}`);

  const deployedContract = await new web3.eth.Contract(compiledContract.abi)
    .deploy({
      data: '0x' + compiledContract.evm.bytecode.object,
      arguments: [web3.utils.toWei('0.02', 'ether'), true]
    })
    .send({from: accounts[0], gas: 1000000});

  const writeStream = fs.createWriteStream("./ethereum/build/address.js");
  writeStream.write(`export const address = '${deployedContract.options.address}'`);
  writeStream.end();

  console.log(`Contract deployed at address: ${deployedContract.options.address}`);

  provider.engine.stop();
})();
