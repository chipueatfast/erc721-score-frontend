import React from 'react';
import { minorScale, Text, Pane, Table } from 'evergreen-ui';
import CandidateRow from './approve-page-components/CandidateRow';
import { FirebaseDatabaseNode } from '@react-firebase/database';
import { candidatePath } from 'firebase-service/candidatePath';

function ApprovePage() {
    return (
        <FirebaseDatabaseNode path={`${candidatePath}`}>
        {
            ({value}) => {
                let tableData = [];
                if (value) {
                    tableData =  Object.keys(value).map(k => value[k]);
                }
                return (<Pane>
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
                            {(tableData.length === 0) ? (<Table.Row>
                                                <Pane display='flex' alignItems='center' marginX={minorScale(3)}>
                                                    <Text>
                                                        No data yet
                                                    </Text>
                                                </Pane>
                                            </Table.Row>)
                            : tableData.map((r: any) => {
                                    return (<CandidateRow key={r.ethAddress} {...r} />)
                                })
                            }
                        </Table.Body>
                        
                    </Table>
                    
                </Pane>)
        }}
        </FirebaseDatabaseNode>
    );
}

export default ApprovePage;