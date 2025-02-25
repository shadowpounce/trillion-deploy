'use client';


import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import {FlyingParticles} from "shared/components/flying-particles";
import styles from './page.module.scss';
import checkedRadioSource from 'assets/checked_radio.png';
import uncheckedRadioSource from 'assets/unchecked_radio.png';
import onboardingBackgroundSource from 'assets/onboarding_bg.png';
import backgroundSource from 'assets/form_bg.png';
import SubmitButton from 'shared/components/SubmitButton';
import query from '@/utils/query';
import { getCountryCallingCode } from 'libphonenumber-js';
import Modal from "../contact/ui/Modal";
import { useEffect, useState } from 'react';

import 'react-phone-number-input/style.css'
import PhoneInput, { Country, isPossiblePhoneNumber } from 'react-phone-number-input'
import clsx from 'clsx';

// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const Onboarding = () => {
  const [countryCode, setCountryCode] = useState<Country>('US');
  const [phone, setPhone] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  
  let isValid = false;

  if(phone !== undefined) {
    isValid = isPossiblePhoneNumber(`${phone}`);
  }

  const formik = useFormik({
    initialValues: {
      type: '',
      entityName: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: phone,
    },
    validationSchema: Yup.object({
      type: Yup.string().required(''),
      entityName: Yup.string().when('type', {
        is: (type: string) =>
          type === 'Corporation' || type === 'Financial Institution',
        then: (schema) => schema.required(''),
      }),
      firstName: Yup.string().required(''),
      lastName: Yup.string().required(''),
      email: Yup.string().email('').required(''),
      phone: Yup.string(),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: async (values, { setSubmitting }) => {
      values.phone = phone;
      const phoneInput = document.querySelector(`.PhoneInput input`) as HTMLInputElement;
      if(!isValid) {
        phoneInput.setCustomValidity('Please enter a valid phone number');
        phoneInput.reportValidity();
        return;
      } else {
        phoneInput.setCustomValidity('');
      }

      const btn = document.querySelector(`.${styles.formContainer} button`) as HTMLButtonElement;
      btn.disabled = true;
      // console.log(values)
      const {successfully} = await query({
        hook: "hookRequest",
        body: values,
      });
      setIsSubmit(successfully);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    const select = document.querySelector(".PhoneInputCountrySelect");
    const options = select?.querySelectorAll('option') ?? [] as any;
    const zzOption = [...options]?.find((item) => item.value === "ZZ");
    zzOption?.remove();
  }, [formik.values.type])

  useEffect(() => {
    const cont = document.querySelector(".PhoneInputCountryIcon");
    const phoneCode = getCountryCallingCode(countryCode);
    if(cont) {
      cont.innerHTML = `<span>${countryCode}</span> +${phoneCode}`
    }
  }, [countryCode, formik.values.type])

  return (
    <>
      <Modal active={isSubmit}></Modal>
      <main className={styles.pageContainer}>
      <FlyingParticles color='#fff' speed={1000}></FlyingParticles>
      <Image
        src={onboardingBackgroundSource as StaticImageData}
        alt='Page Background'
        className={styles.pageBackground}
      />
      <div className={styles.formWrapper}>
        <Image
          src={backgroundSource as StaticImageData}
          alt='Form Background'
          className={styles.formBackground}
        />
        <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
          <div>
            <h1 className={styles.title}>Client Onboarding Request</h1>
            <h2 id='onboarging_type_group' className={styles.subtitle}>
              Select Onboarding Type
            </h2>
            <div
              role='group'
              aria-labelledby='onboarging_type_group'
              className={styles.radioGroup}
            >
              <label className={styles.radioItem}>
                <input
                required
                  type='radio'
                  id='individual'
                  name='type'
                  value='Individual'
                  className={styles.radio}
                  checked={formik.values.type === 'Individual'}
                  onChange={formik.handleChange}
                />
                <div className={styles.checkboxMarkContainer}>
                  {formik.values.type === 'Individual' ? (
                    <Image
                      src={checkedRadioSource as StaticImageData}
                      alt='Checkbox'
                    />
                  ) : (
                    <Image
                      src={uncheckedRadioSource as StaticImageData}
                      alt='Checkbox'
                    />
                  )}
                </div>
                Individual
              </label>

              <label className={styles.radioItem}>
                <input
                required
                  type='radio'
                  id='corporation'
                  name='type'
                  value='Corporation'
                  className={styles.radio}
                  checked={formik.values.type === 'Corporation'}
                  onChange={formik.handleChange}
                />
                <div className={styles.checkboxMarkContainer}>
                  {formik.values.type === 'Corporation' ? (
                    <Image
                      src={checkedRadioSource as StaticImageData}
                      alt='Checkbox'
                    />
                  ) : (
                    <Image
                      src={uncheckedRadioSource as StaticImageData}
                      alt='Checkbox'
                    />
                  )}
                </div>
                Corporation
              </label>

              <label className={styles.radioItem}>
                <input
                required
                  type='radio'
                  id='financial_institution'
                  name='type'
                  value='Financial Institution'
                  className={styles.radio}
                  checked={formik.values.type === 'Financial Institution'}
                  onChange={formik.handleChange}
                />
                <div className={styles.checkboxMarkContainer}>
                  {formik.values.type === 'Financial Institution' ? (
                    <Image
                      src={checkedRadioSource as StaticImageData}
                      alt='Checkbox'
                    />
                  ) : (
                    <Image
                      src={uncheckedRadioSource as StaticImageData}
                      alt='Checkbox'
                    />
                  )}
                </div>
                Financial Institution
              </label>
            </div>
            <p className={styles.description}>
              Please select the account application type in order to complete
              the respective onboarding request
            </p>
          </div>
          {(formik.values.type === 'Corporation' ||
            formik.values.type === 'Financial Institution') && (
            <div>
              <label className={styles.label}>Entity Legal Name</label>
              <div className={styles.inputsWrapper}>
                <input
                  required
                  id='entityName'
                  name='entityName'
                  placeholder='Acme Corp'
                  className={styles.input}
                  value={formik.values.entityName}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          )}

          <div>
            {formik.values.type && (
              <>
                {(formik.values.type === 'Individual') && (
                  <label className={styles.label}>Authorized Representative</label>
                )}
                {(formik.values.type === 'Corporation' ||
                  formik.values.type === 'Financial Institution') && (
                  <label className={styles.label}>Full Legal Name</label>
                )}
                <div className={styles.inputsWrapper}>
                  <div className={styles.inputsContainer}>
                    <div className={styles.inputsContainerMini}>
                      <span>First Name*</span>
                      <input
                        required
                        id='firstName'
                        name='firstName'
                        placeholder='Enter your first name'
                        className={styles.input}
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className={styles.inputsContainerMini}>
                      <span>Last Name*</span>
                      <input
                        required
                        id='lastName'
                        name='lastName'
                        placeholder='Enter your last name'
                        className={styles.input}
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <div className={clsx(styles.inputsContainer, styles.inputsContainerFull)}>
                    <div className={styles.inputsContainerMini}>
                      <span>Email*</span>
                      <input
                        required
                        id='email'
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        className={styles.input}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <div className={clsx(styles.inputsContainer, styles.inputsContainerFull)}>
                    <div className={styles.inputsContainerMini}>
                      <span>Phone number*</span>
                      <PhoneInput
                        country={countryCode}
                        placeholder="(555) 000-0000"
                        defaultCountry={countryCode}
                        name="phone"
                        id="phone"
                        required
                        value={formik.values.phone}
                        onChange={(p: any) => setPhone(p)}
                        className={clsx(styles.input, isValid ? styles.valid : styles.invalid, styles.PhoneInput)}
                        onCountryChange={(c: Country) => setCountryCode(c)}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <div className={styles.noteContainer}>
              <p className={styles.note}>
                For further assistance, questions or comments relating to the
                onboarding process at Trillion Capital Markets Inc d/b/a
                Trillion Digital, please email us at{' '}
                <Link href='mailto:onboarding@trilliondigital.io'>
                  onboarding@trilliondigital.io
                </Link>
              </p>
            </div>
            <SubmitButton isSubmit={isSubmit} />
          </div>
        </form>
      </div>
      </main>
    </>
  );
};

export default Onboarding;
