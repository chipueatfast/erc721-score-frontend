import React from 'react';
import { Button, Card, majorScale, Pane, TextInput, toaster } from 'evergreen-ui';
import { Formik } from 'formik';
import { addCandidateV2 } from 'firebase-service/addCandidateV2';
import { grantCandidateRole } from 'services/grantCandidateRole';
import { UserAddressContext } from 'context/userAddressContext';

function CandidateRegisterPage() {
    const userAddress = React.useContext(UserAddressContext);
    if (!userAddress) {
        return null;
    }
    return (

        <Pane display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
            <Formik
                initialValues={{
                    ethAddress: userAddress,
                    name: '',
                }}
                onSubmit={async (values, actions) => {
                    const rs = await grantCandidateRole({
                        name: values.name,
                        fromAddress: userAddress,
                    });
                    if (rs.status) {
                        if (await addCandidateV2(values)) {
                            toaster.success(`Your credential has been added to our list`);
                        } else {
                            toaster.success('This address has been updated credential');
                        }
                    } else {
                        if (rs.errorMessage) {
                            toaster.danger(rs.errorMessage);
                        }
                    }
                }}
            >
                {({handleSubmit, handleChange, values}) => {
                    return (
                        <Card
                            marginBottom={majorScale(2)}
                            border
                            elevation={1}
                            width='100%'
                            maxWidth={majorScale(64)}
                            paddingY={majorScale(2)}
                            paddingX={majorScale(4)}>
                            <Pane marginBottom={majorScale(2)}>
                                <TextInput
                                    name='name'
                                    onChange={handleChange}
                                    value={values.name}
                                    width='100%'
                                    placeholder='Candidate name'/>
                            </Pane>
                            <Pane marginBottom={majorScale(2)}>
                                <TextInput
                                    disabled
                                    name='ethAddress'
                                    onChange={handleChange}
                                    value={values.ethAddress}
                                    width='100%'
                                    placeholder='Registered ethereum address'/>
                            </Pane>
                            <Pane marginBottom={majorScale(2)} display='flex' justifyContent='flex-end'>
                                <Button onClick={() => handleSubmit()} appearance='primary'>
                                    Register or Update
                                </Button>
                            </Pane>
                        </Card>
                    )
                }
    }
            </Formik>
        </Pane>
    );
}

export default CandidateRegisterPage;