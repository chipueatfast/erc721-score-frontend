import { getContract } from 'smart-contract/erc721-score';

export function mintAToken({
    toAddress,
    scoreHash,
}: {
    toAddress: string,
    scoreHash: string,
}) {
    getContract().methods.mint(toAddress, scoreHash).send({
        from: '0x8a4e1258e898e526046EB8CebAAE23B655B9783b',
    });
}