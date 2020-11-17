import React, { Fragment } from 'react';
import styles from './title.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row } from 'react-styled-flexboxgrid';

export const Title: React.FC = () => {
    return (
        <Fragment>
            <Row center="xs">
                <div className={styles.title_container}>
                    <span className={styles.title}>
                        <FontAwesomeIcon icon={['fas', 'terminal']} />
                    </span>
                    <span className={styles.title}>&nbsp; Pseudocode &nbsp;</span>
                    <span className={styles.title}>Analyzer</span>
                </div>
            </Row>
            <hr />
        </Fragment>
    );
};
