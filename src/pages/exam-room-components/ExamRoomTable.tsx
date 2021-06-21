import React from 'react';
import {Pane, Table, TableHeaderCell} from 'evergreen-ui';
import {FirebaseDatabaseNode} from '@react-firebase/database';
import { useHistory } from 'react-router-dom';

export function ExamRoomTable({userAddress} : {
    userAddress: string;
}) {
    const history = useHistory();
    if (!userAddress) {
        return null;
    }


    return (
        <FirebaseDatabaseNode path={`examRoom/${userAddress}`}>
            {(examRooms) => {
                if (!examRooms.value) {
                    return null;
                }
                return (
                    <Pane>
                        <Table>
                            <Table.Head>
                                <TableHeaderCell>
                                    Room name
                                </TableHeaderCell>
                                <TableHeaderCell>
                                    Exam subject
                                </TableHeaderCell>
                                <TableHeaderCell>
                                    Date created
                                </TableHeaderCell>
                            </Table.Head>
                            <Table.Body>
                                {
                                    Object.keys(examRooms.value).map((k: string) => {
                                        const r: {
                                            id: string;
                                            name: string;
                                            subject: string;
                                            createdDate: string;
                                        } = examRooms.value[k];
                                        return (<Table.Row
                                            key={r.id}
                                            isSelectable
                                            onSelect={() => {
                                                history.push(`/${r.subject}/${r.id}/result-exam-room`)
                                            }}
                                        >
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