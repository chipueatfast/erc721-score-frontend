import React from 'react';
import { FirebaseDatabaseNode } from '@react-firebase/database';
import { Button, Pane, Table } from 'evergreen-ui';

function ResultTable(props: {
    roomId: string;
}) {
    return (
        <FirebaseDatabaseNode path={`candidate-results/${props.roomId}`}>
            {
                (results) => {
                    if (!results || !results.value) {
                        return null;
                    }
                    return (<Pane>
                        <Table>
                            <Table.Head>
                                <Table.HeaderCell>
                                    Candidate name
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Candidate address
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Score
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Validated on blockchain
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Actions
                                </Table.HeaderCell>
                            </Table.Head>                        
                        </Table>
                        {
                            Object.keys(results.value).map((k: string) => {
                                const scoreSheet: {
                                    name: string;
                                    id: string;
                                    score: number;
                                } = results.value[k];
                                return (<Table.Row key={scoreSheet.id}>
                                    <Table.TextCell>
                                        {scoreSheet.name}
                                    </Table.TextCell>
                                    <Table.TextCell>
                                        {scoreSheet.id}
                                    </Table.TextCell>
                                    <Table.TextCell>
                                        {scoreSheet.score}
                                    </Table.TextCell>
                                    <Table.TextCell>
                                        false
                                    </Table.TextCell>
                                    <Table.Cell>
                                        <Pane>
                                            <Button>
                                                Edit
                                            </Button>
                                        </Pane>
                                    </Table.Cell>
                                </Table.Row>);
                            })
                        }

                    </Pane>)
                }
            }
        </FirebaseDatabaseNode>
    );
}

export default ResultTable;