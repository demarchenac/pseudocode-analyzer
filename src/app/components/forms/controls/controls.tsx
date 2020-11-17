import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useState } from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import { COMMON } from '../../../../utils';
import { Chip } from '../../common';
import { Editor, FileLoader, RadioOrCheck } from '../inputs';

import styles from './controls.module.scss';

export const Controls: React.FC = () => {
    const [action, setAction] = useState<string | null>(COMMON.ACTIONS.UNSELECTED);
    const [filename, setFilename] = useState<string | null>(null);
    const [pseudocode, setPseudocode] = useState<string[] | null>(['']);
    return (
        <Fragment>
            <Row center="xs">
                <Col xs={5} sm={4} md={3}>
                    <RadioOrCheck
                        type="radio"
                        text="Upload file"
                        name="action"
                        value={COMMON.ACTIONS.UPLOAD}
                        onUpdate={setAction}
                    />
                </Col>
                <Col xs={5} sm={4} md={3}>
                    <RadioOrCheck
                        type="radio"
                        text="Write text"
                        name="action"
                        value={COMMON.ACTIONS.WRITE}
                        onUpdate={setAction}
                    />
                </Col>
            </Row>
            <Row center="xs">
                <Col xs={10}>
                    {action === COMMON.ACTIONS.UPLOAD ? (
                        <FileLoader
                            extension="txt"
                            onUpdate={(filename: string, pseudocode: string[]) => {
                                setFilename(filename);
                                setPseudocode(pseudocode);
                            }}
                        />
                    ) : null}
                </Col>
            </Row>
            {filename !== null && pseudocode !== null && action === COMMON.ACTIONS.UPLOAD ? (
                <Row center="xs">
                    <Col xs={10}>
                        <br />
                        <Row between="xs">
                            <Chip iconFamily="fas" icon="file-alt" text={filename}></Chip>
                            <span className={styles.file_info}>has {pseudocode.length} lines</span>
                        </Row>
                    </Col>
                </Row>
            ) : null}
            {filename !== null || action === COMMON.ACTIONS.WRITE ? (
                <Row center="xs">
                    <Col xs={10}>
                        <br />
                        <Row>
                            <p>{action === COMMON.ACTIONS.WRITE ? 'Content' : 'File content'} (editable):</p>
                        </Row>
                        <Row>
                            <Editor
                                value={pseudocode?.join('\n') || ''}
                                onChange={(value) => setPseudocode(value.split('\n'))}
                            />
                        </Row>
                        <br />
                        <Row>
                            <button className={styles.calc}>
                                <FontAwesomeIcon icon={['fas', 'calculator']} />
                                <i>&nbsp; T(n)</i>
                            </button>
                        </Row>
                    </Col>
                </Row>
            ) : null}

            <br />
        </Fragment>
    );
};
