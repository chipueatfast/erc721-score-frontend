import { UserAddressContext } from 'context/userAddressContext';
import {Button, Dialog, majorScale, Pane, Table, TextInput, toaster} from 'evergreen-ui';
import { updateScoreInCandidateResult } from 'firebase-service/updateScoreInCandidateResult';
import { Formik } from 'formik';
import React from 'react';
import {convertScoreFormToScoreHash} from 'services/convertScoreFormToScoreHash';
import {getScoreHash} from 'services/getScoreHash';
import { updateScoreToken } from 'services/updateScoreToken';

function ResultRow(props : {
    roomId: string;
    name: string;
    id: string;
    score: number;
    subject: string;
    tokenId: number;
}) {
    const userAddress = React.useContext(UserAddressContext);
    const [scoreHash,
        setScoreHash] = React.useState('');
    const [shownDialog,
        setShownDialog] = React.useState(false);
    React.useEffect(() => {
        getScoreHash({
            tokenId: Number(props.tokenId)
        }).then(setScoreHash);
    }, []);
    React.useEffect(() => {
        getScoreHash({
            tokenId: Number(props.tokenId)
        }).then(setScoreHash);
    }, [props.score]);
    const calculatedScoreHash = convertScoreFormToScoreHash({
        subject: props.subject,
        candidateAddress: props.id,
        score: props
            .score
            .toString()
    });
    return (
        <Pane>
            <Formik
                onSubmit={(values) => {
                    if (values.score === props.score) {
                        return;
                    }
                    updateScoreToken({
                        tokenId: props.tokenId,
                        fromAddress: userAddress,
                        scoreHash: convertScoreFormToScoreHash({
                            subject: props.subject,
                            candidateAddress: props.id,
                            score: values
                                .score
                                .toString()     
                        })
                    }).then(result => {
                        if (result.reponse && result.reponse.tokenId) {
                            const tokenId = result.reponse.tokenId;
                            updateScoreInCandidateResult({
                                roomId: props.roomId,
                                candidateName: props.name,
                                tokenId: props.tokenId,
                                ethAddress: props.id,
                                newScore: values.score,
                            })
                        toaster.success(`The token ID ${tokenId} has been updated`)
                    }
                    if ("errorMessage" in result && typeof result.errorMessage === 'string') {
                        toaster.danger(result.errorMessage);
                    }                        
                });
                }}
                initialValues={{
                    score: props.score,
                }}
            >
                {({handleChange, handleSubmit, values}) => {
                    return (<Dialog
                            shouldCloseOnOverlayClick={false}
                            shouldCloseOnEscapePress={false}
                            isShown={shownDialog}
                            title='Result modification'
                            confirmLabel='Update result'
                            onConfirm={() => {
                            console.log('done');
                            handleSubmit();
                            // setShownDialog(false);
                        }}
                        onCancel={() => setShownDialog(false)}>
                            <Pane>
                                <Pane marginBottom={majorScale(2)}>
                                    <TextInput
                                        name='score'
                                        
                                        onChange={handleChange}
                                        value={values.score}
                                        width='100%'
                                        placeholder='Score'/>
                                </Pane>
                            </Pane>    
                        </Dialog>
                    )
                }}
            </Formik>
            <Table.Row key={props.id}>
                <Table.TextCell>
                    {props.tokenId}
                </Table.TextCell>
                <Table.TextCell>
                    {props.name}
                </Table.TextCell>
                <Table.TextCell>
                    {props.id}
                </Table.TextCell>
                <Table.TextCell>
                    {props.score}
                </Table.TextCell>
                <Table.TextCell>
                    {scoreHash === calculatedScoreHash
                        ? 'true'
                        : 'false'}
                </Table.TextCell>
                <Table.Cell>
                    <Pane>
                        <Button onClick={() => setShownDialog(true)}>
                            Edit
                        </Button>
                    </Pane>
                </Table.Cell>
            </Table.Row>
        </Pane>
    );
}

export default ResultRow;