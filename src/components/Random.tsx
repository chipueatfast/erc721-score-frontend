import React from 'react';
import { mintAToken } from 'services/mintAToken';

export function Random() {
    const [scoreHashValue, setScoreHashValue] = React.useState<string>('');
    const [toAddressValue, setToAddressValue] = React.useState<string>('');
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    return (
        <div
            style={{
                display: 'block',
            }}
        >
            Random
            <div>
                <input
                    placeholder='score hash..'
                    onChange={(e) => {
                        setScoreHashValue(e.target.value);
                    }}
                    value={scoreHashValue}
                />
            </div> 
            <div>
                <input
                    placeholder='to address..'
                    onChange={(e) => {
                        setToAddressValue(e.target.value);
                    }}
                    value={toAddressValue}
                />

            </div>
            <button
                onClick={() => {
                    mintAToken({
                        scoreHash: scoreHashValue,
                        toAddress: toAddressValue,
                    }).then(result => {
                        if ("errorMessage" in result && typeof result.errorMessage === 'string') {
                            setErrorMessage(result.errorMessage);
                        }
                        debugger
                        
                    })
                }}
            >
                Mint a score
            </button>
            {
                !!errorMessage &&
                <div style={{color: 'red'}}>
                    {errorMessage}
                </div>
            }
        </div>
    );
}
