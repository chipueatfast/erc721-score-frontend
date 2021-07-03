import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Heading, majorScale, Pane, Text } from 'evergreen-ui';

function HomePage() {
    const history = useHistory();
    return (
        <Pane
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            marginTop={majorScale(8)}
        >
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
            
            <Pane marginBottom={majorScale(1)}>
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
            </Pane>

            <Pane marginBottom={majorScale(1)}>
                <Text textAlign='center'>
                    Author: Nguyen Tan Toan, Pham Huy Phat
                </Text>
            </Pane>
            <img
                alt='logo'
                src='https://image.flaticon.com/icons/png/512/326/326909.png'
                
            />
            
            
        </Pane>
    );
}

export default HomePage;