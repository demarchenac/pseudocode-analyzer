import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useState } from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import { COMMON } from '../../../../utils';
import { Chip } from '../../common';
import { Editor, FileLoader, RadioOrCheck } from '../inputs';
import nerdamer from 'nerdamer';
import TeX from '@matejmazur/react-katex';

import styles from './controls.module.scss';

interface LineNode {
    value: string;
    checked: boolean;
}

const getTnOfIf = (lines: LineNode[], siIndex: number): string => {
    // validations
    console.log(' --- se encontro condicional --- ');
    const parenthesisRegExp = /\(([a-zA-Z][a-zA-Z0-9]*|\d+)(\s)*[<>=]*(\s)*([a-zA-Z][a-zA-Z0-9]*|\d+)\)/g;
    const matches = lines[siIndex].value.toLowerCase().trim().match(parenthesisRegExp) || [];

    let fsiIndex = -1;
    let sinoIndex = -1;

    for (let j = siIndex; j < lines.length; j++) {
        if (!lines[j].checked) {
            lines[j].checked = true;
            console.log(j, lines[j].value.trim());
            if (lines[j].value.toLowerCase().trim().slice(0, 4) === 'sino') sinoIndex = j;
            if (lines[j].value.toLowerCase().trim().slice(0, 3) === 'fsi') {
                fsiIndex = j;
                break;
            }
        }
    }

    let worstCase = 0;
    if (fsiIndex > -1) {
        if (sinoIndex === -1) {
            worstCase = fsiIndex - siIndex - 1;
        } else {
            const bloqueSi = sinoIndex - siIndex - 1;
            const bloqueSino = fsiIndex - sinoIndex - 1;
            if (bloqueSi > bloqueSino) worstCase = bloqueSi;
            else worstCase = bloqueSino;
        }
    }
    console.log(' --- fin condicional con T(n) = ' + (matches.length + worstCase));
    const sum = matches.length + worstCase;
    return sum.toString();
};

const getTnOfFor = (lines: LineNode[], paraIndex: number): string => {
    console.log(' --- se encontro ciclo para --- ');
    const paraParameters = lines[paraIndex].value.replace('para', '').trim().split(',');
    let vi = paraParameters[0].trim().split('=')[1];
    let vf = paraParameters[1];
    let inc = paraParameters[2];
    if (inc.startsWith('-')) {
        const t = vf;
        vf = vi;
        vi = t;
        inc = inc.replace('-', '');
    }
    const internal = [];
    let k = 0;
    for (let j = paraIndex; j < lines.length; j++) {
        if (!lines[j].checked) {
            k++;
            lines[j].checked = true;
            console.log(j, lines[j].value.trim());
            if (
                lines[j].value.toLowerCase().trim().slice(0, 2) === 'si' &&
                lines[j].value.toLowerCase().trim().slice(0, 4) !== 'sino'
            ) {
                k--;
                internal.push(getTnOfIf(lines, j));
            } else if (lines[j].value.toLowerCase().trim().slice(0, 4) === 'para') {
                k--;
                internal.push(getTnOfFor(lines, j));
            } else if (lines[j].value.toLowerCase().trim().slice(0, 5) === 'fpara') {
                k--;
                break;
            }
        }
    }
    const body = nerdamer(`(${internal.join('+') || 0} +${k} +2)`).toString();
    const iterations = nerdamer(`ceil((${vf}-${vi}+1)/${inc})`, undefined, 'expand').toString();
    const r = nerdamer(`(${iterations}) * (${body}) +2`).toString();
    console.log(` --- fin ciclo para con T(n) = (${iterations}) * (${body}) + 2 = ${r}`);
    return r;
};

const getTn = (pseudocode: string[]): string => {
    const temp = [];
    const lines: LineNode[] = pseudocode.map((line) => {
        return { value: line, checked: false };
    });

    console.log(
        'ver reglas en:  https://raw.githubusercontent.com/cddemar/pseudocode-analyzer/5c8180d4563c3912be56940dc42b991dc1fb7f16/src/assets/docs/Reglas.pdf',
    );
    console.log(' --- inicio --- ');

    for (let i = 0; i < lines.length; i++) {
        if (!lines[i].checked) {
            lines[i].checked = true;
            console.log(i, lines[i].value.trim());

            if (lines[i].value.toLowerCase().trim() === 'inicio') {
                temp.push(0);
            } else if (lines[i].value.toLowerCase().trim() === 'pare') {
                temp.push(0);
            } else if (lines[i].value.toLowerCase().trim().length === 0) {
                temp.push(0);
            } else if (
                lines[i].value.toLowerCase().trim().slice(0, 2) === 'si' &&
                lines[i].value.toLowerCase().trim().slice(0, 4) !== 'sino'
            ) {
                temp.push(getTnOfIf(lines, i));
            } else if (lines[i].value.toLowerCase().trim().slice(0, 4) === 'para') {
                temp.push(getTnOfFor(lines, i));
            } else {
                temp.push(1);
            }
        }
    }

    const ops = temp.filter((v) => v !== '0' && v !== 0).join('+');
    const raw = nerdamer(ops, undefined, 'expand');

    console.log(raw.toString());
    console.log(' --- fin --- ');
    return raw.toTeX();
};

export const Controls: React.FC = () => {
    const [action, setAction] = useState<string | null>(COMMON.ACTIONS.UNSELECTED);
    const [filename, setFilename] = useState<string | null>(null);
    const [pseudocode, setPseudocode] = useState<string[] | null>(['']);
    const [tex, setTex] = useState<string | null>('');
    return (
        <Fragment>
            <Row center="xs">
                <Col xs={5} sm={4} md={3}>
                    <RadioOrCheck
                        type="radio"
                        text="Cargar archivo"
                        name="action"
                        value={COMMON.ACTIONS.UPLOAD}
                        onUpdate={setAction}
                    />
                </Col>
                <Col xs={5} sm={4} md={3}>
                    <RadioOrCheck
                        type="radio"
                        text="Escribir algoritmo"
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
                            <span className={styles.file_info}>tiene {pseudocode.length} líneas</span>
                        </Row>
                    </Col>
                </Row>
            ) : null}
            {filename !== null || action === COMMON.ACTIONS.WRITE ? (
                <Row center="xs">
                    <Col xs={10}>
                        <br />
                        <Row>
                            <p>{action === COMMON.ACTIONS.WRITE ? 'Contenido' : 'Contenido del archivo'} (editable):</p>
                        </Row>
                        <Row>
                            <Editor
                                value={pseudocode?.join('\n') || ''}
                                onChange={(value) => setPseudocode(value.split('\n'))}
                            />
                        </Row>
                        <br />
                        <Row>
                            <button
                                className={styles.calc}
                                onClick={() => {
                                    if (pseudocode === null) return;
                                    console.clear();
                                    setTex(getTn(pseudocode));
                                }}
                            >
                                <FontAwesomeIcon icon={['fas', 'calculator']} />
                                <i>&nbsp; Calcular T(n)</i>
                            </button>
                        </Row>
                        <br />
                        {tex ? (
                            <Fragment>
                                <br />
                                <Row>
                                    <TeX math={`T(n) = ${tex}`} />
                                </Row>
                            </Fragment>
                        ) : null}
                    </Col>
                </Row>
            ) : null}

            <br />
        </Fragment>
    );
};
