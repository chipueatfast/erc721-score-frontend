import React from 'react';
import {
    Button,
    Card,
    majorScale,
    Pane,
    Select,
    Table,
    TableHeaderCell,
    TextInput
} from 'evergreen-ui';
import {Formik} from 'formik';
import {createExamRoomDocument} from 'firebase-service/createExamRoomDocument';

function CreateExamRoomForm({
    userAddress,
}: {
    userAddress: string;
}) {
    return (
        <Formik
            onSubmit={async(values, actions) => {
            createExamRoomDocument(userAddress, {
                id: Date.now(),
                subject: values.subject,
                roomName: values.name
            });
            actions.resetForm();
        }}
            initialValues={{
            subject: '',
            name: ''
        }}>
            {({values, handleChange, handleSubmit}) => {
                return (
                    <Card
                        marginBottom={majorScale(2)}
                        border
                        elevation={1}
                        width='100%'
                        maxWidth={majorScale(64)}
                        paddingY={majorScale(2)}
                        paddingX={majorScale(4)}>
                        <Select
                            name='subject'
                            value={values.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                            marginBottom={majorScale(2)}>
                            <option value="" disabled>Subject</option>
                            <option value="math">Math</option>
                            <option value="literature">Literature</option>
                            <option value="english">English</option>
                        </Select>
                        <Pane marginBottom={majorScale(2)}>
                            <TextInput
                                name='name'
                                onChange={handleChange}
                                value={values.name}
                                width='100%'
                                placeholder='Exam room name'/>
                        </Pane>

                        <Button onClick={() => handleSubmit()}>
                            Create exam room
                        </Button>
                    </Card>
                )
            }
}

        </Formik>
    );
}

export default CreateExamRoomForm;