import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useRef, useState } from 'react';
import { Col, Row } from 'react-styled-flexboxgrid';
import styles from './file-loader.module.scss';

interface Props {
    extension: string;
    onUpdate: (filename: string, pseudocode: string[]) => void;
}

export const FileLoader: React.FC<Props> = ({ extension, onUpdate }: Props) => {
    const fileUploadRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = (files: FileList) => {
        setError(null);
        if (files) {
            console.log(files);
            if (files.length > 1) {
                setError('Solo se acepta un archivo');
                return;
            }
            if (files.length == 1) {
                if (files[0].name.split('.').slice(-1)[0] !== extension) {
                    setError('Solo se aceptan archivos con extension .txt');
                    return;
                }
                const reader = new FileReader();
                reader.readAsArrayBuffer(files[0]);
                reader.onloadend = (ev) => {
                    if (ev.target) {
                        const data = ev.target.result as Uint8Array;
                        const text = new TextDecoder('utf-8').decode(data);
                        const array = text.split('\n');
                        onUpdate(files[0].name, array);
                    } else {
                        setError('How did I get here?');
                    }
                };
            }
        }
    };

    return (
        <Fragment>
            <Row center="xs">
                <Col xs={12}>
                    <input
                        ref={fileUploadRef}
                        style={{ visibility: 'hidden' }}
                        type="file"
                        onChange={(event) => {
                            console.log(event);
                            if (event.target.files !== null) handleFileUpload(event.target.files);
                        }}
                    />
                    <div
                        className={error !== null ? styles.file_upload_error : styles.file_upload}
                        onClick={() => {
                            if (fileUploadRef.current != null) fileUploadRef.current.click();
                        }}
                        onDragOver={(e) => {
                            e.preventDefault();
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            handleFileUpload(e.dataTransfer.files);
                        }}
                    >
                        <FontAwesomeIcon icon={['fas', 'file-import']} className={styles.file_upload_icon} />
                        <p style={{ padding: 5 }}>
                            {error !== null ? error : `Pick a .${extension} file and drop it here`}
                        </p>
                    </div>
                </Col>
            </Row>
        </Fragment>
    );
};
