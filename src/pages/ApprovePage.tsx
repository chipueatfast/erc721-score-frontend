import React from 'react';
import { Pane, Table } from 'evergreen-ui';
import { getAllCandidates } from 'firebase-service/getAllCandidates';
import CandidateRow from './approve-page-components/CandidateRow';

function ApprovePage() {
    const [tableData, setTableData] = React.useState<any>([]);
    React.useEffect(() => {
        getAllCandidates().then((rs) => {
            setTableData(rs);
        });
    }, []);
    return (
        <Pane>
            <Table>
                <Table.Head>
                    <Table.HeaderCell>
                        Candidate name
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Ethereum address
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Participation status
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Actions
                    </Table.HeaderCell>
                </Table.Head>
                <Table.Body>
                    {
                        tableData.map((r: any) => {
                            return (<CandidateRow key={r.ethAddress} {...r} />)
                        })
                    }
                </Table.Body>
                
            </Table>
            
        </Pane>
    );
}

export default ApprovePage;