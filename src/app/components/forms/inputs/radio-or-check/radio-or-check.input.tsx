import React, { Fragment } from 'react';
import styles from './radio-or-check.input.module.scss';

interface Props {
    type: string;
    text: string;
    name: string;
    value: string;
    onUpdate: React.Dispatch<React.SetStateAction<string | null>>;
    disabled?: boolean;
}

export const RadioOrCheck: React.FC<Props> = ({ type, text, name, value, onUpdate, disabled = false }: Props) => {
    return (
        <Fragment>
            <input
                id="radio-or-check"
                type={type}
                name={name}
                value={value}
                className={styles.radio_or_check}
                onChange={(event) => onUpdate(event.target.value)}
                disabled={disabled}
            />
            {disabled ? (
                <label htmlFor="radio-or-check" className={styles.text_disabled}>
                    {text}
                </label>
            ) : (
                <label htmlFor="radio-or-check">{text}</label>
            )}
        </Fragment>
    );
};
