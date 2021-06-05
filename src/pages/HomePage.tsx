import { Heading, majorScale, Pane, Text } from 'evergreen-ui';
import React from 'react';

function HomePage() {
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
                <Text textAlign='center'>
                    Author: Pham Huy Phat, 15520604@gm.uit.edu.vn
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