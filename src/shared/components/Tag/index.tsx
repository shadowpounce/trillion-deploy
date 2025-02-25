

import styles from './index.module.scss';

interface ITag {
  title: string;
}

const Tag = ({ title }: ITag) => {
  return <div className={styles.tag}>{title}</div>;
};

export default Tag;
