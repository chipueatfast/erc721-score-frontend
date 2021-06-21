import React from 'react';
import { Pane } from 'evergreen-ui';
import AddCandidateForm from './result-exam-room-components/AddCandidateForm';
import ResultTable from './result-exam-room-components/ResultTable';

function ResultExamRoomPage({roomId, subject} : {
    roomId: string;
    subject: string;
}) {
    return (
        <Pane>
            <AddCandidateForm subject={subject} roomId={roomId} />
            <ResultTable roomId={roomId} />
        </Pane>
    );
}

export default ResultExamRoomPage;