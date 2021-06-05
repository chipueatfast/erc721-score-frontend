import React, { useState} from 'react';
import { Button, majorScale, Pane, SearchInput, Text } from 'evergreen-ui';
import { Formik } from 'formik';
import { getScoreHash } from 'services/getScoreHash';
import { ResultScoreSheetV2 } from './candidate-page-components/ResultScoreSheetV2';
import { getOwnerBytokenId } from 'services/getOwnerBytokenId';

export function SearchPage() {
    const [tokenId, setTokenId] = useState<number | null>(null);
    const [scoreHash, setScoreHash] = useState<string>('');
    const [judgeAddress, setJudgeAddress] = useState<string>('');

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
                    getOwnerBytokenId({
                        tokenId: Number(values.tokenId),
                    }).then(setJudgeAddress);
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
                        {(!!tokenId || tokenId === 0) && !!judgeAddress && !!scoreHash && <ResultScoreSheetV2 judgeAddress={judgeAddress} givenScoreHash={scoreHash} tokenId={tokenId} />}
                    </Pane>
    );
}