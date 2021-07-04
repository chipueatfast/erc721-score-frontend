import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Heading, majorScale, Pane, Text } from 'evergreen-ui';
import { detectRole } from 'firebase-service/detectRole';

function HomePage(props: {
    userAddress: string;
}) {
    const history = useHistory();
    const [displayName, setDisplayName] = React.useState('');
    React.useEffect(() => {
        if (props.userAddress) {
            detectRole({
                userAddress: props.userAddress
            }).then(rs => {
                setDisplayName(rs.titleName);
            })
        }
    }, [props.userAddress])
    return (
        <Pane
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            marginTop={majorScale(8)}
        >
            <Pane marginBottom={majorScale(1)}>
                {
                    !!displayName ? <Heading>
                        Welcome {displayName} to
                    </Heading> : 
                    <>
                        <Text>
                            If you are a candidate, please register your Ethereum address by clicking&nbsp;
                        </Text>
                        <Button
                            onClick={() => {
                                history.push('/candidate/register');
                            }}
                        >
                            Register as a candidate
                        </Button>
                    </>
                }
            </Pane>
            <Heading
                textAlign='center'
                fontSize={48}
                lineHeight={1.5}
                marginBottom={majorScale(1)}
            >
                Apply blockchain technology to 
                <br />
                managing exam score
            </Heading> 

            <img
                alt='logo'
                src='https://image.flaticon.com/icons/png/512/326/326909.png'
                
            />
            <Pane marginBottom={majorScale(1)}>
                <Text textAlign='center'>
                    Author: Nguyen Tan Toan, Pham Huy Phat
                </Text>
            </Pane>
            
            
        </Pane>
    );
}

export default HomePage;