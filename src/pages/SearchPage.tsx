import React, { useState} from 'react';
import { Button, majorScale, Pane, SearchInput, Text } from 'evergreen-ui';
import { Formik } from 'formik';
import { getScoreHash } from 'services/getScoreHash';
import { ResultScoreSheetV2 } from './candidate-page-components/ResultScoreSheetV2';

export function SearchPage() {
    const [tokenId, setTokenId] = useState<number | null>(null);
    const [scoreHash, setScoreHash] = useState<string>('');
    return (
        <Pane>
            <Formik
               initialValues={{
                    tokenId: '',
                }}
                onSubmit={(values) => {
                    getScoreHash({
                        tokenId: Number(values.tokenId),
                    }).then(setScoreHash);
                    setTokenId(Number(values.tokenId));
                }}
            >
                {
                    ({
                        handleChange,
                        handleSubmit,
                    }) => {
                    return (
                    <Pane
                        marginBottom={majorScale(2)}
                    >
                        <SearchInput 
                            name='tokenId'
                            onChange={handleChange}
                            placeholder='Token ID' 
                            marginRight={majorScale(1)}
                        />
                        <Button
                            onClick={(e: any) => handleSubmit()}
                        >
                            Find score token
                        </Button>
                        </Pane>
                                    )
                                }
                            }
                        </Formik>
                        {(!!tokenId || tokenId === 0) && !scoreHash && <Text>NOT FOUND ON BLOCKCHAIN</Text>}
                        {(!!tokenId || tokenId === 0) && !!scoreHash && <ResultScoreSheetV2 givenScoreHash={scoreHash} tokenId={tokenId} />}
                    </Pane>
    );
}