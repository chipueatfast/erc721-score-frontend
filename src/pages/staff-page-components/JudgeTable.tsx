import React from 'react';
import { FirebaseDatabaseNode } from '@react-firebase/database';
import { minorScale, Text, Pane, Table } from 'evergreen-ui';
import { judgePath } from 'firebase-service/judgePath';

function JudgeTable() {
    return (
        <FirebaseDatabaseNode path={`${judgePath}`}>
            {
                ({
                    value,
                }) => {
                    console.log(value);
                    let tableData = [];
                    if (value) {
                        tableData =  Object.keys(value).map(k => value[k]);
                    }
                    return (<Table>
                        <Table.Head>
                            <Table.HeaderCell>
                                NAME
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                ETH ADDRESS
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
                            : tableData.map((a: any) => {
                                    return (<Table.Row key={a.ethAddress}>
                                            <Table.TextCell>
                                                {
                                                    a.name
                                                }
                                            </Table.TextCell>
                                            <Table.TextCell>
                                                {
                                                    a.ethAddress
                                                }
                                            </Table.TextCell>
                                        </Table.Row>)
                                })
                            }
                        </Table.Body>
                    </Table>)
                }
            }
        </FirebaseDatabaseNode>
    );
}

export default JudgeTable;