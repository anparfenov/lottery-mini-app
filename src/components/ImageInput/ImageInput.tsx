import { Icon28UploadOutline } from '@vkontakte/icons';
import { IconButton } from '@vkontakte/vkui';
import React, { FC, SyntheticEvent, useRef, useState } from 'react';

// @ts-ignore
import style from './ImageInput.module.css';

type Props = {
    onUpload: any;
}

export const ImageInput: FC<Props> = ({ onUpload }) => {
    const [src, setSrc] = useState('');
    const inputRef = useRef(null);

    const readURL = (file: any) => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = (e) => res(e.target.result);
            reader.onerror = (e) => rej(e);
            reader.readAsDataURL(file);
        });
    };
    const preview = async (event: SyntheticEvent) => {
        const file = (event.target as HTMLInputElement).files[0];
        console.log('file', file);
        const url = await readURL(file);
        setSrc(url as string);
        onUpload(file);
    };

    return (
        <div className={style.ImageInput}>
            <img className={style.ImageInput__element} src={src}/>
            <div className={style.ImageInput__button}>
                <IconButton onClick={() => inputRef.current.click()}>
                    <Icon28UploadOutline />
                </IconButton>
            </div>
            <input ref={inputRef} style={{visibility: 'hidden', position: 'absolute'}} type="file" onChange={preview} />
        </div>
    );
};
