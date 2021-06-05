import React from 'react';
import { Link, majorScale } from 'evergreen-ui';

interface IProps {
    headerName: string;
    headerHref: string;
}

function HeaderItem(props: IProps) {
    const isActive = props.headerHref === window.location.pathname;

    return (
        <Link
            fontWeight={isActive ? 'bold' : 'normal'} 
            href={props.headerHref}
            marginRight={majorScale(2)}
        >
            {props.headerName}
        </Link>
    );
}

export default HeaderItem;