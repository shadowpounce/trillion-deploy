'use client';


// import clsx from 'clsx';;
import { AnimatePresence } from 'framer-motion';

const Loader = () => {
  // const [isVisible, setVisible] = useState<boolean>(true);

  // const ref = useRef<HTMLSpanElement | null>(null);

  // useEffect(() => {
  //   const controls = animate(0, 100, {
  //     duration: ANIMATION_DURATION,
  //     onUpdate(value) {
  //       if (ref.current) {
  //         ref.current.textContent = value.toFixed(0).padStart(3, '0').slice(-3);
  //       }
  //     },
  //   }).then(() => setVisible(false));
  //
  //   return () => {
  //     if (controls.stop) {
  //       controls.stop();
  //     }
  //   };
  // }, []);

  return (
    <AnimatePresence>
      {/*{isVisible && (*/}
      {/*  <motion.div exit={{ opacity: 0 }} className={styles.container}>*/}
      {/*    <div className={styles.item}>*/}
      {/*      <h1 className={clsx(styles.title, monaSans500.className)}>*/}
      {/*        FIBER*/}
      {/*      </h1>*/}
      {/*      <h1 className={clsx(styles.title, monaSans500.className)}>*/}
      {/*        TRACE*/}
      {/*      </h1>*/}
      {/*    </div>*/}
      {/*    <div className={styles.centralItem}>*/}
      {/*      <div>*/}
      {/*        <div className={styles.progressContainer}>*/}
      {/*          <motion.div*/}
      {/*            className={styles.progress}*/}
      {/*            initial={{ width: 0 }}*/}
      {/*            animate={{ width: '100%' }}*/}
      {/*            transition={{ duration: ANIMATION_DURATION }}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <span*/}
      {/*          className={clsx(styles.loading, monaSans500.className)}*/}
      {/*        >*/}
      {/*          Loading......*/}
      {/*        </span>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className={styles.item}>*/}
      {/*      <span*/}
      {/*        ref={ref}*/}
      {/*        className={clsx(styles.progressText, monaSans500.className)}*/}
      {/*      >*/}
      {/*        000*/}
      {/*      </span>*/}
      {/*      <span className={clsx(styles.year, monaSans400.className)}>*/}
      {/*        © {year}*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*  </motion.div>*/}
      {/*)}*/}
    </AnimatePresence>
  );
};

export default Loader;
