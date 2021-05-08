import { getContract } from 'smart-contract/erc721-score';

export async function mintAToken({
    toAddress,
    scoreHash,
}: {
    toAddress: string,
    scoreHash: string,
}): Promise<{
    reponse?: {
        tokenId: number;
    };
    errorMessage?: string;
}> {
    return new Promise((resolve) => {
        try {
            getContract().methods.mint(toAddress, scoreHash).send({
                from: '0x8a4e1258e898e526046EB8CebAAE23B655B9783b',
            });
            getContract().once('Transfer', (err, data) => {
                resolve({
                    reponse: {
                        tokenId: data.returnValues.tokenId,
                    },
                })
            })

        } catch (error) {
            return resolve({
                errorMessage: error.message,
            });
        }
    })
}