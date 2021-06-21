import React from 'react';
import {Pane, Table, TableHeaderCell} from 'evergreen-ui';
import {FirebaseDatabaseNode} from '@react-firebase/database';

export function ExamRoomTable({userAddress} : {
    userAddress: string;
}) {
    if (!userAddress) {
        return null;
    }

    return (
        <FirebaseDatabaseNode path={`examRoom/${userAddress}`}>
            {(examRooms) => {
                if (!examRooms.value) {
                    return null;
                }
                console.log(examRooms.value);
                return (
                    <Pane>
                        <Table>
                            <Table.Head>
                                <TableHeaderCell>
                                    Room name
                                </TableHeaderCell>
                                <TableHeaderCell>
                                    Exam object
                                </TableHeaderCell>
                                <TableHeaderCell>
                                    Date created
                                </TableHeaderCell>
                            </Table.Head>
                            <Table.Body>
                                {
                                    Object.keys(examRooms.value).map((k: string) => {
                                        const r: {
                                            name: string;
                                            subject: string;
                                            createdDate: string;
                                        } = examRooms.value[k];
                                        return (<Table.Row>
                                            <Table.TextCell>
                                                {r.name}
                                            </Table.TextCell>
                                            <Table.TextCell>
                                                {r.subject}
                                            </Table.TextCell>
                                            <Table.TextCell>
                                                {r.createdDate}
                                            </Table.TextCell>
                                        </Table.Row>)
                                    })
                                }
                            </Table.Body>
                        </Table>
                    </Pane>
                )
            }
}
        </FirebaseDatabaseNode>
    );
}