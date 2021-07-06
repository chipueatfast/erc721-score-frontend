import React from 'react';
import {
    Button,
    Heading,
    Card,
    majorScale,
    Pane,
    TextInput,
    toaster,
    Tablist,
    Tab
} from 'evergreen-ui';
import {UserAddressContext} from 'context/userAddressContext';
import {Formik} from 'formik';
import {grantAuditorRole} from 'services/grantAuditorRole';
import {addAuditor} from 'firebase-service/addAuditor';
import AuditorTable from './staff-page-components/AuditorTable';
import JudgeTable from './staff-page-components/JudgeTable';
import {grantJudgeRole} from 'services/grantJudgeRole';
import {addJudge} from 'firebase-service/addJudge';

function StaffPage() {
    const userAddress = React.useContext(UserAddressContext);
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    return (
        <Pane>
            <Tablist 
                marginBottom={16} 
                flexBasis={240} 
                marginRight={24}
            >
                <Tab
                    id='aud'
                    key='aud'
                    onSelect={() => setSelectedIndex(0)}
                    isSelected={0 === selectedIndex}
                    aria-controls={`panel-aud`}
                >
                    Auditors
                </Tab>
                <Tab
                    id='jud'
                    key='jud'
                    onSelect={() => setSelectedIndex(1)}
                    isSelected={1 === selectedIndex}
                    aria-controls={`panel-jud`}
                >
                    Judges
                </Tab>
            </Tablist>
            {
                selectedIndex === 0 && <><Heading marginBottom={majorScale(2)}>
                Auditors
            </Heading>
            <Formik
                initialValues={{
                ethAddress: '',
                name: ''
            }}
                onSubmit={async(values, actions) => {
                if (!values.name || !values.ethAddress) {
                    toaster.danger('Please fill in all fields.');
                    return;
                }
                const blockchain = await grantAuditorRole({fromAddress: userAddress, auditorEthAddress: values.ethAddress});
                if (!blockchain.status && blockchain.errorMessage) {
                    toaster.danger(blockchain.errorMessage);
                    return;
                }
                await addAuditor({ethAddress: values.ethAddress, name: values.name});
                toaster.success('Admitted new auditor.');
                actions.resetForm();
            }}>
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
                                    placeholder='Auditor name'/>
                            </Pane>
                            <Pane marginBottom={majorScale(2)}>
                                <TextInput
                                    name='ethAddress'
                                    onChange={handleChange}
                                    value={values.ethAddress}
                                    width='100%'
                                    placeholder='Auditor address'/>
                            </Pane>
                            <Pane marginBottom={majorScale(2)} display='flex' justifyContent='flex-end'>
                                <Button onClick={() => handleSubmit()} appearance='primary'>
                                    Add auditor
                                </Button>
                            </Pane>
                        </Card>
                    )
                }
}
            </Formik>
            <Pane marginBottom={majorScale(4)}>
                <AuditorTable/>
            </Pane>
            </>
            }
            {
                selectedIndex === 1 && <> 
                <Heading marginBottom={majorScale(2)}>
                Judges
            </Heading>
            <Formik
                initialValues={{
                ethAddress: '',
                name: ''
            }}
                onSubmit={async(values, actions) => {
                if (!values.name || !values.ethAddress) {
                    toaster.danger('Please fill in all fields.');
                    return;
                }
                const blockchain = await grantJudgeRole({fromAddress: userAddress, judgeEthAddress: values.ethAddress});
                if (!blockchain.status && blockchain.errorMessage) {
                    toaster.danger(blockchain.errorMessage);
                    return;
                }
                await addJudge({ethAddress: values.ethAddress, name: values.name});
                toaster.success('Admitted new judge.');
                actions.resetForm();
            }}>
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
                                    placeholder='Judge name'/>
                            </Pane>
                            <Pane marginBottom={majorScale(2)}>
                                <TextInput
                                    name='ethAddress'
                                    onChange={handleChange}
                                    value={values.ethAddress}
                                    width='100%'
                                    placeholder='Judge address'/>
                            </Pane>
                            <Pane marginBottom={majorScale(2)} display='flex' justifyContent='flex-end'>
                                <Button onClick={() => handleSubmit()} appearance='primary'>
                                    Add judge
                                </Button>
                            </Pane>
                        </Card>
                    )
                }
}
            </Formik>
            <JudgeTable /></>
            }

        </Pane>
    );
}

export default StaffPage;