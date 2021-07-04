import React from 'react';
import { Code, Paragraph, majorScale, Text, Pane, Position, Strong, Tooltip } from 'evergreen-ui';
import HeaderItem from './HeaderItem';
import { detectRole } from 'firebase-service/detectRole';


interface IProps {
    userAddress: string;
}

export function Header(props: IProps) {
    const [role, setRole] = React.useState('');
    const [displayName, setDisplayName] = React.useState('');
    React.useEffect(() => {
        if (props.userAddress) {
            detectRole({
                userAddress: props.userAddress
            }).then(rs => {
                setRole(rs.role);
                setDisplayName(rs.titleName);
            })
        }
    }, [props.userAddress])
    return (
        <Pane
            height={majorScale(8)}
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            paddingX={majorScale(2)}
            borderBottom
            marginBottom={majorScale(3)}
        >
            <Pane
              display='flex'
              flexDirection='row'
              
            >
               <a href='/'>
                    <Pane
                        marginRight={majorScale(2)}
                    >
                        <img
                            alt='logo'
                            style={
                                {
                                    width: 24,
                                    height: 24,
                                }
                            }
                            src='https://image.flaticon.com/icons/png/512/326/326909.png'
                        />
    
                    </Pane>
               </a>
                {
                    role === 'AUDITOR' &&
                    <>
                        <HeaderItem
                            headerHref='/auditor'
                            headerName='Auditor'
                        />
                        <HeaderItem
                            headerHref='/search'
                            headerName='Search'
                        />
                    </>
                }
                {
                   role === 'JUDGE' &&
                   <HeaderItem
                        headerName='Judge'
                        headerHref='/exam-room'
                        activatedList={['/:subject/:roomId/result-exam-room']}
                    />
                }
                {
                    role === 'CANDIDATE' &&
                    <HeaderItem
                        headerName='Candidate'
                        headerHref='/candidate-profile'
                    />
                }
            </Pane>
            <Pane>
                <Tooltip 
                    content={<Pane overflow='hidden'>
                        <Text textOverflow='ellipsis' color='white'>
                        User address: {props.userAddress}
                        </Text>
                        </Pane>} 
                    position={Position.LEFT}
                >
                    <Code>
                        {displayName}
                    </Code>
                </Tooltip>
            </Pane>
        </Pane>
    );
}