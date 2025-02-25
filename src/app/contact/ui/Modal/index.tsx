import checkGrad from "assets/checkGrad.svg"
import styles from "../../page.module.scss"
import Image, {StaticImageData} from "next/image";
import clsx from "clsx";
import { FC } from "react";
import OnboardingButton from "shared/components/OnboardingButton";
import callBlue from "assets/call-blue.svg";

interface ModalProps {
  active: boolean
}

const Modal: FC<ModalProps> = ({active}) => {
  return (
    <>
      <div className={clsx(styles.before, active && styles.activeBefore)}></div>
      <div className={clsx(styles.modal, active && styles.activeModal)}>
      <div className={styles.modalContent}>
        <h2><Image src={checkGrad as StaticImageData} alt='checkGrad'></Image> Successfully</h2>
        <p>
          Thank you for reaching out! 
          Your message has been successfully submitted. 
          Our team will review your inquiry and get back 
          to you within 48 hours through your preferred contact method
        </p>
        <h4>If you have any urgent questions, feel free to call us directly at:</h4>
        <a className={styles.link} target="_blank" href="tel:+13059083844">
          <Image src={callBlue as StaticImageData} alt='call' className={styles.icon}></Image>
          +1 (305) 908-3844
        </a>
        <OnboardingButton isBackHome></OnboardingButton>
      </div>
    </div>
    </>
  )
}

export default Modal;