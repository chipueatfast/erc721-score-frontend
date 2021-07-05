import React from 'react';
import {Dialog, Text, IconButton, majorScale, ManuallyEnteredDataIcon, Pane, Table, TextInput, Tooltip} from 'evergreen-ui';
import { Formik } from 'formik';

function CandidateRow(props : any) {
    const [shownDialog,
        setShownDialog] = React.useState(false);
    const {ethAddress, name, isVerified} = props;
    return (
        <Pane>
             <Formik
                onSubmit={(values) => {
                    if (values.score === props.score) {
                        return;
                    }
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
                            title='Check for approval'
                            confirmLabel='Admit this candidate'
                            onConfirm={() => {
                            handleSubmit();
                        }}
                        onCancel={() => setShownDialog(false)}>
                            <Pane>
                                <Pane marginBottom={majorScale(2)}>
                                    <img 
                                        style={{
                                            marginTop: majorScale(2),
                                        }} 
                                        src='https://i.imgur.com/NpGeq0m.png' alt='mock KYC' 
                                    /> 
                                </Pane>
                            </Pane>    
                        </Dialog>
                    )
                }}
            </Formik>
            <Table.Row>
                <Table.TextCell>
                    {name}
                </Table.TextCell>
                <Table.TextCell>
                    {ethAddress}
                </Table.TextCell>
                <Table.TextCell>
                    {isVerified
                        ? 'Participated'
                        : 'Waiting for approval'
                    }
                </Table.TextCell>
                <Table.Cell>
                    {
                        isVerified ?
                        <Text>
                            No actions available
                        </Text> :
                        <Pane>
                            <Tooltip content="Check for approval">
                                <IconButton onClick={() => setShownDialog(true)} icon={ManuallyEnteredDataIcon} />
                            </Tooltip>
                        </Pane>
                    }
                </Table.Cell>

            </Table.Row>
        </Pane>
    );
}

export default CandidateRow;