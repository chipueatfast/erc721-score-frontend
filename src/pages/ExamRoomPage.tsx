import React from 'react';
import {Button, Card, Pane, Select, Table, TableHeaderCell, TextInput} from 'evergreen-ui';
import CreateExamRoomForm from './exam-room-components/CreateExamRoomForm';
import { UserAddressContext } from 'context/userAddressContext';
import { ExamRoomTable } from './exam-room-components/ExamRoomTable';

function ExamRoomPage() {
    const userAddress = React.useContext(UserAddressContext);
    return (
        <Pane>
            <CreateExamRoomForm userAddress={userAddress} />
            <ExamRoomTable userAddress={userAddress} />

        </Pane>
    );
}

export default ExamRoomPage;