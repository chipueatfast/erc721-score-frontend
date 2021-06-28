import React from 'react';
import { Code, Link, majorScale, Pane, Strong } from 'evergreen-ui';
import HeaderItem from './HeaderItem';

interface IProps {
    userAddress: string;
}

export function Header(props: IProps) {
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
               <HeaderItem
                    headerName='Judge'
                    headerHref='/exam-room'

               />
                <HeaderItem
                    headerHref='/search'
                    headerName='Search'
                />
            </Pane>
            <Pane>
                <Strong>
                    User address:&nbsp;
                </Strong>
                <Code>
                    {props.userAddress}
                </Code>
            </Pane>
        </Pane>
    );
}