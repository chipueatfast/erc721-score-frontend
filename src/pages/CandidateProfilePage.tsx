import {UserAddressContext} from 'context/userAddressContext';
import {BanCircleIcon, majorScale, Pane, Table, TickCircleIcon} from 'evergreen-ui';
import {getScoreResultOfAnAddress} from 'firebase-service/getScoreResultOfAnAddress';
import React from 'react';
import {useHistory} from 'react-router-dom';
import CandidateResultRow from './candidate-profile-components/CandidateResultRow';

interface IProps {}

function CandidateProfilePage(props : IProps) {
    const userAddress = React.useContext(UserAddressContext);
    const history = useHistory();
    const [candidateResult,
        setCandidateResult] = React.useState < {
        createdDate: string;
        id: string;
        name: string;
        score: string;
        tokenId: string;
        roomId: string;
        subject: string;
    }[] > ([]);
    React.useEffect(() => {
        if (userAddress) {
            getScoreResultOfAnAddress({userAddress}).then(rs => {
                setCandidateResult(rs);
            })
        }
    }, [userAddress])
    return (
        <Pane marginX={majorScale(16)}>
            <Table>
                <Table.Head>
                    <Table.HeaderCell>
                        Score
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Subject
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Exam name
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Created at
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Verified on blockchain
                    </Table.HeaderCell>

                </Table.Head>
                <Table.Body>
                    {candidateResult.map((r, index) => {
                        return (<CandidateResultRow r={r} index={index}/>)})
                    }
                </Table.Body>
            </Table>
        </Pane>
    );
}

export default CandidateProfilePage;