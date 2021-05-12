import { getContract } from 'smart-contract/erc721-score';

export async function mintAToken({
    fromAddress,
    toAddress,
    scoreHash,
}: {
    fromAddress: string;
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
                from: fromAddress,
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