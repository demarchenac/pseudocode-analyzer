import React, { Fragment } from 'react';
import styles from './editor.module.scss';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export const Editor: React.FC<Props> = ({ value, onChange }: Props) => {
    return (
        <Fragment>
            <textarea
                name="editor"
                rows={8}
                className={styles.editor}
                value={value}
                onChange={(event) => {
                    if (event.target.value !== null) onChange(event.target.value);
                }}
            />
        </Fragment>
    );
};
