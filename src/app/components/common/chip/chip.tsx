import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import style from './chip.module.scss';

interface Props {
    iconFamily: IconPrefix;
    icon: IconName;
    text: string;
}

export const Chip: React.FC<Props> = ({ iconFamily, icon, text }: Props) => {
    return (
        <div className={style.content}>
            <div>
                <FontAwesomeIcon icon={[iconFamily, icon]} />
            </div>
            &nbsp;
            {text}
        </div>
    );
};
