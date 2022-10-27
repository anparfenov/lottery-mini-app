import React, { FC } from 'react'
// @ts-ignore
import style from './MyImage.module.css';

type Props = {
    src: string;
    alt: string;
}

export const MyImage: FC<Props> = ({ src, alt }) => {
  return (
    <div className={style.MyImage}>
        <img className={style.MyImage__element} src={src} alt={alt} />
    </div>
  )
}
