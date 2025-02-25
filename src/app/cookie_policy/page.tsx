
import Link from 'next/link';

import styles from './page.module.scss';


const CookiePolicy = () => {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.contentContainer}>
        <h1>Cookie Policy</h1>

        <section>
          <span>Date of last update: January 1, 2025</span>
          <h3>1. Understanding how and why we use cookies</h3>
          <div>
            <p>
              Trillion Capital Markets Inc d/b/a Trillion Digital (Trillion
              we/us/our), use cookies on our website (Site) and product
              platforms (Products) to distinguish you from other users of the
              Site and Products. This helps us to improve your experience when
              using our Site and Products and to ensure the Site and Products
              perform as you expect it to. By browsing the Site and Products,
              you are agreeing to our use of cookies.
            </p>
            <p>
              Due to recent changes in law, all websites which operate across
              certain parts of the European Union are required to obtain consent
              to using or storing cookies (or similar technologies) on your
              computers or mobile devices. This Cookie Policy provides you with
              clear and comprehensive information about the cookies we use and
              the purposes for using them. To review the privacy policies that
              apply to users of our Products, please read our Privacy Policy.
            </p>
          </div>
        </section>

        <section>
          <h3>2. What are cookies?</h3>
          <div>
            <p>
              Cookies are small text files that are sent to and stored on your
              computer, smartphone, or other device for accessing the internet,
              whenever you visit a website. Cookies are useful because they
              allow a website to recognize a user’s device. We use the following
              cookies on our Site and Products: ‘Strictly necessary’ cookies,
              which are essential to ensure performance of the site. They
              include, for example, cookies that enable you to log into secure
              areas of our Site and Products.
            </p>
            <p>
              More information about cookies can be found on
              www.allaboutcookies.org.
            </p>
          </div>
        </section>

        <section>
          <h3>3. How cookies make our websites safer and easier to use </h3>
          <div>
            <p>
              Cookies are used for a variety of reasons, such as to improve the
              functionality and performance of this Site and Products. If you
              leave a secure session window open when logged in to Trillion,
              cookies will enhance your security by prompting you to end (and/or
              automatically ending) your secure session.
            </p>
            <p>
              When we include links to third party websites, please bear in mind
              they will have their own privacy and cookie policies that will
              govern the use of any information you submit. We recommend you
              read their policies as we are not responsible or liable for any
              third party’s privacy practices.
            </p>
          </div>
        </section>

        <section>
          <h3>4. How you can manage your cookies</h3>
          <div>
            <p>
              The browsers of most computers, smartphones and other web-enabled
              devices are typically set up to accept cookies. If you wish to
              amend your cookie preferences for this Site and Products or any
              other websites, you can do this through your browser settings.
              Your browser’s ‘help’ function will tell you how to do this.
            </p>
            <p>
              However, please remember that cookies are often used to enable and
              improve certain functions on our Site and Products. If you choose
              to switch certain cookies off, it is likely to affect how our Site
              and Products work and you may not be able to access all or parts
              of the Site and Products.
            </p>
            <p>
              For more information about how to disable cookies, visit{' '}
              <Link
                href='https://allaboutcookies.org.'
                passHref={true}
                target='_blank'
              >
                www.allaboutcookies.org.
              </Link>
            </p>
          </div>
        </section>

        <p>
          If you have questions or concerns regarding this Cookie Policy, or if
          you have a complaint, you should first contact us at{' '}
          <Link href='mailto:info@trilliondigital.io' passHref={true}>
            info@trilliondigital.io
          </Link>
          .
        </p>
      </main>

      
    </div>
  );
};

export default CookiePolicy;
