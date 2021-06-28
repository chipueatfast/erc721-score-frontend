import React from 'react';
import firebase from 'firebase/app';
import {Card, majorScale, Pane, Text} from 'evergreen-ui';

function RoomInfoCard(props : {
    roomId: string;
    judgeAddress: string;
    subject: string;
}) {
    const [judgeName,
        setJudgeName] = React.useState('');
    React.useEffect(() => {
        if (props.judgeAddress) {
            const ref = firebase
            .database()
            .ref(`judge/${props.judgeAddress}`);
        ref
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setJudgeName(snapshot.val().name);
                } else {
                    console.log("No data available");
                }
            })
        }
    }, [props.judgeAddress])
    return (
        <Card             
            marginRight={majorScale(4)}
            backgroundColor={'#b5bcd1'}
            marginBottom={majorScale(2)}
            elevation={1}
            width='100%'
            maxWidth={majorScale(32)}
            paddingY={majorScale(2)}
            paddingX={majorScale(4)}
        >
            <Pane display='flex' flexDirection='row' alignItems='center' marginBottom={majorScale(2)} height={32}>
                <Text >
                    <Text fontWeight='bold'>Room ID:</Text> {props.roomId}
                </Text>
            </Pane>
            <Pane display='flex' flexDirection='row' alignItems='center' height={32} marginBottom={majorScale(2)}>
                <Text >
                    <Text fontWeight='bold'>Judge name:</Text>  {judgeName}
                </Text>
            </Pane>
            <Pane display='flex' flexDirection='row' alignItems='center' height={32} marginBottom={majorScale(2)}>
                <Text >
                    <Text fontWeight='bold'>Subject:</Text> {props.subject}
                </Text>

            </Pane>
        </Card>)
}

export default RoomInfoCard;