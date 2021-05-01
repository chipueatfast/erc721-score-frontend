import Web3EthContract, { Contract } from 'web3-eth-contract';

const erc721ScoreJson = require('./ERC721PresetMinterPauserAutoId.json');

let contract: Contract;

export function getContract(): Contract {
    if (!contract) {
        console.log(Web3EthContract);
        contract = new (Web3EthContract as any)(erc721ScoreJson.abi);
    }
    return contract;
}