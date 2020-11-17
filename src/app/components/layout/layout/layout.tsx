import React, { Fragment } from 'react';
import { Title } from '../../common';
import { Controls } from '../../forms';

export const Layout: React.FC = () => {
    return (
        <Fragment>
            <Title />
            <Controls />
        </Fragment>
    );
};
