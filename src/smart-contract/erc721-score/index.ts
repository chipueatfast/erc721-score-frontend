import { getWeb3 } from 'GlobalContext';
import * as Web3EthContract from 'web3-eth-contract';

const ERC721_CONTRACT_ADDRESS = '0xa34E6C6354771D74dCaACc077eC1C9e2Dd2C41De';

const erc721ScoreJson = require('./ERC721PresetMinterPauserAutoId.json');

let contract: Web3EthContract.Contract;

export function getContract(): Web3EthContract.Contract {
    if (!contract && !!getWeb3()) {
        console.log(Web3EthContract);
        (Web3EthContract as any).setProvider(getWeb3().eth.currentProvider);

        contract = new (Web3EthContract as any)(erc721ScoreJson.abi, ERC721_CONTRACT_ADDRESS);
    }
    return contract;
}