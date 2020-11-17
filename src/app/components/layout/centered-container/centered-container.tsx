import React from 'react';
import { Col, Row } from 'react-styled-flexboxgrid';

import styles from './centered-container.module.scss';

interface Props {
    width: number;
    children: JSX.Element;
}

export const CenteredContainer: React.FC<Props> = ({ width = 6, children }: Props) => {
    return (
        <Col xs={12}>
            <Row center="xs">
                <Col xs={11} sm={8} md={width} className={styles.background}>
                    {children}
                </Col>
            </Row>
        </Col>
    );
};
