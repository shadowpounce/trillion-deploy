
"use client";
// import Link from 'next/link';
import {useStrapi} from "@/layouts/themeProvider";
import styles from './page.module.scss';
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { getHeaderId } from "utils/strapi";
import {FC} from "react";
import {typePage} from "@/layouts/themeProvider";

interface Props {
  str: typePage;
}

export const TextPage: FC<Props> = ({str}) => {
  const {data} = useStrapi();
  const pageData = Array.isArray(data?.[str]) ? data?.[str][0] : data?.[str];
  
  return (
    <div className={styles.pageContainer}>
      <main className={styles.contentContainer}>
        <h1>{pageData?.title}</h1>
        {pageData?.content && (
            <BlocksRenderer 
            content={pageData.content}
            blocks={{
                heading: ({ level, children }) => {
                    const Tag: any = `h${level}`;
                    const id = getHeaderId(children).id;
                    return <Tag id={id}>{children}</Tag>;
                },
            }}
        />
        )}
      </main>
    </div>
  );
};