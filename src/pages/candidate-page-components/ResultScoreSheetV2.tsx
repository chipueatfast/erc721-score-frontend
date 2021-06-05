import React, { useEffect, useState } from 'react';
import { FirebaseDatabaseNode } from '@react-firebase/database';
import { scoreSheetPath } from 'firebase-service/scoreSheetPath';
import { convertScoreFormToScoreHash } from 'services/convertScoreFormToScoreHash';
import { Alert, Card, majorScale, Pane, Strong, Text } from 'evergreen-ui';
import firebase from 'firebase/app';

interface IProps {
    tokenId: number;
    givenScoreHash: string;
    judgeAddress: string;
}

export function ResultScoreSheetV2(props: IProps) {
    const [refresh, setRefresh] = useState(false);
    const [judgeName, setJudgeName] = useState('');
    React.useEffect(() => {
        const ref = firebase.database().ref(`judge/${props.judgeAddress}`);
        ref.get().then((snapshot) => {
            if (snapshot.exists()) {
                setJudgeName(snapshot.val().name);
              } else {
                console.log("No data available");
              }
        })
    })
    useEffect(() => {
        setRefresh(true);
        setTimeout(() => {
            setRefresh(false);
        }, 0);
    }, [props.tokenId, judgeName]);
    if (refresh) {
        return null;
    }

    return (
        <FirebaseDatabaseNode path={`${scoreSheetPath}/${props.tokenId}`}>
            {
                scoreSheet => {
                    const calculatedScoreHash = scoreSheet.value ? convertScoreFormToScoreHash(scoreSheet.value) : '';
                    if (!scoreSheet.value) {
                        return null;
                    }
                    return (
                    <div>
                        <Card
                            width='100%'
                            maxWidth={majorScale(64)}
                        >
                            <Pane
                                display='flex'
                                flexDirection='row'
                                justifyContent='space-between'
                                marginBottom={majorScale(1)}
                            >
                                <Strong>
                                    Subject:
                                </Strong>
                                <Text>
                                    {scoreSheet.value.subject}
                                </Text>
                            </Pane>
                            <Pane
                                display='flex'
                                flexDirection='row'
                                justifyContent='space-between'
                                marginBottom={majorScale(1)}
                            >
                                <Strong>
                                    Score:
                                </Strong>
                                <Text>
                                    {scoreSheet.value.score}
                                </Text>
                            </Pane>
                            <Pane
                                display='flex'
                                flexDirection='row'
                                justifyContent='space-between'
                                marginBottom={majorScale(1)}

                            >
                                <Strong>
                                    Candidate Addr.:
                                </Strong>
                                <Text>
                                    {scoreSheet.value.candidateAddress}
                                </Text>
                            </Pane>
                            <Pane
                                display='flex'
                                flexDirection='row'
                                justifyContent='space-between'
                                marginBottom={majorScale(1)}

                            >
                                <Strong>
                                    Created at:
                                </Strong>
                                <Text>
                                    {scoreSheet.value.createdDate}
                                </Text>
                            </Pane>
                            <Pane
                                display='flex'
                                flexDirection='row'
                                justifyContent='space-between'
                                marginBottom={majorScale(2)}

                            >
                                <Strong>
                                    By judge:
                                </Strong>
                                <Text>
                                    {judgeName}
                                </Text>
                            </Pane>
                            {
                                !!scoreSheet.value && calculatedScoreHash === props.givenScoreHash ?
                                <Alert
                                    intent='success'
                                    title='This score token is verified'
                                /> :
                                <Alert
                                    intent='danger'
                                    title='This score token is invalid'
                                />
                            }
                        </Card>
                    </div>)
            }}
        </FirebaseDatabaseNode>
    );
}
