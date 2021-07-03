import {BanCircleIcon, Table, TickCircleIcon} from 'evergreen-ui';
import moment from 'moment';
import React from 'react';
import {convertScoreFormToScoreHash} from 'services/convertScoreFormToScoreHash';
import {getScoreHash} from 'services/getScoreHash';
import { mapSubjectValueToLabel } from 'utils/mapSubjectValueToLabel';
function CandidateResultRow(props : any) {
    const [scoreHash,
        setScoreHash] = React.useState('');
    const {r, index} = props;
    React.useEffect(() => {
        getScoreHash({
            tokenId: Number(props.tokenId)
        }).then(setScoreHash);
    }, [props.r.score]);
    const calculatedScoreHash = convertScoreFormToScoreHash({
        subject: r.subject,
        candidateAddress: r.id,
        score: r
            .score
            .toString()
    });
    return (
        <Table.Row
            intent={index % 2 === 0
            ? 'warning'
            : 'none'}>
            <Table.TextCell>
                {r.score}
            </Table.TextCell>
            <Table.TextCell>
                {mapSubjectValueToLabel(r.subject)}
            </Table.TextCell>
            <Table.TextCell>
                {moment(r.createdDate).format("MMM Do YYYY")}
            </Table.TextCell>
            <Table.TextCell>
                {scoreHash === calculatedScoreHash
                    ? <TickCircleIcon color="success" marginRight={16}/>
                    : <BanCircleIcon color="danger" marginRight={16}/>}
            </Table.TextCell>
        </Table.Row>
    )
}

export default CandidateResultRow;