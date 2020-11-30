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
                        href="https://raw.githubusercontent.com/cddemar/pseudocode-analyzer/5c8180d4563c3912be56940dc42b991dc1fb7f16/src/assets/docs/Reglas.pdf"
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
