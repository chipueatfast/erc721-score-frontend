import React from 'react';
import { majorScale, Pane } from 'evergreen-ui';
import AddCandidateForm from './result-exam-room-components/AddCandidateForm';
import ResultTable from './result-exam-room-components/ResultTable';
import RoomInfoCard from './result-exam-room-components/RoomInfoCard';
import { UserAddressContext } from 'context/userAddressContext';

function ResultExamRoomPage({roomId, subject} : {
    roomId: string;
    subject: string;
}) {
    const userAddress = React.useContext(UserAddressContext);
    return (
        <Pane marginX={majorScale(8)}>
            <Pane display='flex' flexDirection='row'>
                <RoomInfoCard subject={subject} roomId={roomId} judgeAddress={userAddress} />
                <AddCandidateForm subject={subject} roomId={roomId} />
            </Pane>
            <ResultTable subject={subject} roomId={roomId} />
        </Pane>
    );
}

export default ResultExamRoomPage;