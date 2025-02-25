import {FC} from 'react'
import style from './style.module.scss'
import Link from "next/link";
import icon from "./icons.svg"
import Image from "next/image";

interface IOtcBtn {
  link: string;
  text?: string
}

export const OtcBtn: FC<IOtcBtn> = ({link, text = "See Details"}) => {
  return (
    <Link href={link} className={style.btn}>
      {text}
      <Image src={icon} alt='icon' className={style.icon}></Image>
    </Link>
  )
}
