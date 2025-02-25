"use client"
import bg from "assets/bg-contact.png"
import styles from './page.module.scss';
import 'react-phone-number-input/style.css'
import PhoneInput, {Country} from 'react-phone-number-input'
import Image, {StaticImageData} from "next/image";
import {FlyingParticles} from "shared/components/flying-particles";
import {useState, useEffect, SyntheticEvent} from "react";
import { getCountryCallingCode } from 'libphonenumber-js';

import OnboardingButton from "shared/components/OnboardingButton";

import greenCheck from "assets/tick-circle.svg";
import location from "assets/location.svg";
import callBlue from "assets/call-blue.svg";
import smsBlue from "assets/sms-blue.svg";
import calendar from "assets/calendar.svg";

import GoogleMap from "./ui/GoogleMap";
import Modal from "./ui/Modal";
import dataSoc from "./data/dataSoc"

import query from "utils/query";

type C = Country | undefined;

export default function Contact() {
  const [formData, setFormData] = useState<Record<string, string | C>>({
    phone: "",
    firstName: "",
    lastName: "",
    email: "",
    contactMethod: "",
    message: "",
    telegramUsername: "",
  });
  
  const [countryCode, setCountryCode] = useState<Country>('US');
  const [isSubmitForm, setIsSubmitForm] = useState<boolean>(false);

  const handleCountryChange = (countryCode: Country) => {
    setCountryCode(countryCode);
  };

  const handleFormSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const btn = e.currentTarget.querySelector(".btn") as HTMLButtonElement;
    btn.disabled = true;
    const data = await query({
      hook: "hookContact",
      body: formData,
    });
    setIsSubmitForm(data.successfully);
  }

  useEffect(() => {
    const select = document.querySelector(".PhoneInputCountrySelect");
    const options = select?.querySelectorAll('option') ?? [] as any;
    const zzOption = [...options]?.find((item) => item.value === "ZZ");
    zzOption?.remove();
  }, [])

  useEffect(() => {
    const cont = document.querySelector(".PhoneInputCountryIcon");
    const phoneCode = getCountryCallingCode(countryCode);
    if(cont) {
      cont.innerHTML = `<span>${countryCode}</span> +${phoneCode}`
    }
  }, [countryCode])

  return (
    <main className="main">
      <section className={styles.section}>
        <FlyingParticles color='#fff' speed={1000}></FlyingParticles>
        <Image
          src={bg as StaticImageData}
          alt='bg'
          className={styles.bg}
        />
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.description}>Interested in our trading solutions? Our team is ready to help you. Contact us today and complete the onboarding process in less than 48 hours.</p>
        <div className={styles.formWrapper}>
          <form action="#" onSubmit={handleFormSubmit}>
            <div className={styles.input}>
              <label htmlFor="first-name">First Name*</label>
              <div className={styles.inputWrapper}>
                <input onChange={({target}) => setFormData({...formData, firstName: target.value})} type="text" id='first-name' placeholder='Enter your first name' name="first-name" required/>
              </div>
            </div>
            <div className={styles.input}>
              <label htmlFor="last-name">Last Name*</label>
              <div className={styles.inputWrapper}>
                <input onChange={({target}) => setFormData({...formData, lastName: target.value})} type="text" id='last-name' placeholder='Enter your last name' name="last-name" required/>
              </div>
            </div>
            <div className={`${styles.input} ${styles.full}`}>
              <label htmlFor="email">Email*</label>
              <div className={styles.inputWrapper}>
                <input onChange={({target}) => setFormData({...formData, email: target.value})} type="email" id='email' placeholder='Enter your email' name="email" required/>
              </div>
            </div>
            <div className={`${styles.input} ${styles.full}`}>
              <label htmlFor="phone">Phone number*</label>
              <div className={styles.inputWrapper}>
                <PhoneInput
                  country={countryCode}
                  placeholder="Enter phone number"
                  defaultCountry={countryCode}
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(value) => setFormData({...formData, phone: value})}
                  onCountryChange={handleCountryChange}
                />
              </div>
            </div>
            <div className={`${styles.radio}`}>
              <h4>Preferred Contact Method*</h4>
              {dataSoc.map(({id, value, icon}) => {
                return (
                  <div key={id} className={styles.radioInput}>
                    <input onChange={({target}) => setFormData({...formData, contactMethod: target.value})} value={value} required type="radio" id={id} name="type" />
                    <label htmlFor={id}><Image src={icon as StaticImageData} alt={value} className={styles.icon} width={20} height={20}></Image>{value}</label>
                  </div>
                )
              })}
            </div>
            {formData.contactMethod === "Telegram" && (
              <div className={`${styles.input} ${styles.full}`}>
              <label htmlFor="telegram-username">Telegram Username*</label>
              <div className={styles.inputWrapper}>
                <input pattern="^@.*"  onChange={({target}) => setFormData({...formData, telegramUsername: target.value})} type="text" id='telegram-username' placeholder='Enter your telegram @username' name="telegram-username" required/>
              </div>
            </div>
            )}
            <div className={styles.message}>
              <label htmlFor="message">Message</label>
              <b>Minimum 20 characters</b>
              <div className={styles.inputWrapper}>
                <Image src={greenCheck as StaticImageData} alt='beforeIcon' className={styles.beforeIcon}></Image>
                <textarea onChange={({target}) => setFormData({...formData, message: target.value})} minLength={20} id="message" name="message" placeholder="How can we help you?" required></textarea>
              </div>
            </div>
            <OnboardingButton isSubmit></OnboardingButton>
          </form>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <h4>Contact us</h4>
              <a href="#">
                <Image src={calendar as StaticImageData} alt='call' className={styles.icon}></Image>
                Schedule a Meeting
              </a>
              <a href="#">
                <Image src={smsBlue as StaticImageData} alt='call' className={styles.icon}></Image>
                Email Us
              </a>
            </div>
            <div className={styles.infoItem}>
              <h4>Call us</h4>
              <p className={styles.description}>Available Monday to Friday, 8:00 AM - 6:00 PM (ET)</p>
              <a target="_blank" href="tel:+13059083844">
                <Image src={callBlue as StaticImageData} alt='call' className={styles.icon}></Image>
                +1 (305) 908-3844
              </a>
            </div>
            <div className={styles.infoItem}>
              <h4>Visit Us</h4>
              <a target="_blank" href="https://g.co/kgs/1SNcQSH">
              <Image src={location as StaticImageData} alt='call' className={styles.icon}></Image>
                1001 Brickell Bay Drive, Suite 2731, Miami, FL 33131
              </a>
              <GoogleMap></GoogleMap>
            </div>
          </div>
        </div>
      </section>
      <Modal active={isSubmitForm}></Modal>
    </main>
  )
}