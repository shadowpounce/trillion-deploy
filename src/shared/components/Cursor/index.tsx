"use client";

import { useEffect, useRef } from "react"
import gsap from "gsap";
import styles from "./index.module.scss"

const Cursor = () => {
  const item = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let isStart = false;
    
    document.onmousemove = (e) => {
      if(!isStart) {
        gsap.to(item.current, {
          opacity: 1
        })
        isStart = true;
      }
      gsap.to(item.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.75,
        ease: "sine"
      })
    }
  }, [])
  return <div className={styles.item} ref={item}></div>
}

export default Cursor