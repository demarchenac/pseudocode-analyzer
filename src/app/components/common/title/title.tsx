import React, { Fragment } from 'react';
import styles from './title.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row } from 'react-styled-flexboxgrid';

export const Title: React.FC = () => {
    return (
        <Fragment>
            <Row center="xs">
                <div className={styles.title_container}>
                    <a
                        href="https://github.com/cddemar/pseudocode-analyzer/blob/main/src/assets/docs/Reglas.pdf"
                        target="_blank"
                        rel="help noopener noreferrer"
                    >
                        <span className={styles.title}>
                            <FontAwesomeIcon icon={['fas', 'terminal']} />
                        </span>
                        <span className={styles.title}>&nbsp; Analizador de &nbsp;</span>
                        <span className={styles.title}>Pseudocódigo</span>
                    </a>
                </div>
            </Row>
            <hr />
        </Fragment>
    );
};
