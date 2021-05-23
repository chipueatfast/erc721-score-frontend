import React from 'react';
import { Code, Link, majorScale, Pane, Strong } from 'evergreen-ui';

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
            <Pane>
                <Link
                    href='/judge'
                    marginRight={majorScale(1)}
                >
                    Mint
                </Link>
                <Link
                    marginRight={majorScale(1)}
                    href='/update'
                >
                    Update
                </Link>
                <Link
                    href='/search'
                    marginRight={majorScale(1)}
                >
                    Search
                </Link>


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