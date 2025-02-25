
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';;
import styles from './index.module.scss';
import delimiterSource from 'assets/delimiter.png';
import { FC } from 'react';

type DelimiterProps = {
  className?: string;
};

const Delimiter: FC<DelimiterProps> = ({className}) => {
  return (
    <Image
      src={delimiterSource as StaticImageData}
      alt='Delimiter'
      className={clsx(
        className,
        styles.delimiter,
        "delimiter"
      )}
    />
  );
};

export default Delimiter;
