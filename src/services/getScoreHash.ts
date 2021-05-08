import { getContract } from 'smart-contract/erc721-score';

export function getScoreHash({
    tokenId,
}: {
    tokenId: number;
}) {
    try {
        getContract().methods.getScoreHashByTokenId(tokenId).call().then((result: any) => {
            debugger
        })
    }
    catch {
        return;
    }
}