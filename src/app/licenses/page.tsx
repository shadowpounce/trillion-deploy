


import styles from './page.module.scss';
import Link from 'next/link';

const Licenses = () => {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.contentContainer}>
        <h1>Licenses</h1>

        <section>
          <h2>Florida Office of Financial Regulation</h2>
          <h3>Money Transmitters Part II:</h3>
          <h3>License Number: FT2300000409</h3>
        </section>

        <section>
          <h2>Florida Consumers Virtual Currency Disclosure</h2>
          <div>
            <p>
              BY GRANTING TRILLION CAPITAL MARKETS INC. D/B/A TRILLION DIGITAL
              ASSETS A LICENSE, THE FLORIDA OFFICE OF FINANCIAL REGULATION IS
              NOT ENDORSING THE USE OF DIGITAL OR VIRTUAL CURRENCIES.
            </p>
            <p>
              * U.S. currency is legal tender backed by the U.S. government.
              <br />* Digital and virtual currencies are not issued or backed by
              the U.S. government, or related in any way to U.S. currency, and
              have fewer regulatory protections.
              <br />* The value of digital and virtual currencies is derived
              from supply and demand in the global marketplace which can rise or
              fall independently of any fiat (government) currency.
              <br />* Holding digital and virtual currencies carries exchange
              rate and other types of risk.
            </p>
          </div>
          <p>
            POTENTIAL USERS OF DIGITAL OR VIRTUAL CURRENCIES, INCLUDING BUT NOT
            LIMITED TO BITCOIN, SHOULD BE FOREWARNED OF A POSSIBLE FINANCIAL
            LOSS AT THE TIME THAT SUCH CURRENCIES ARE EXCHANGED FOR FIAT
            CURRENCY DUE TO AN UNFAVORABLE EXCHANGE RATE. A FAVORABLE EXCHANGE
            RATE AT THE TIME OF EXCHANGE CAN RESULT IN A TAX LIABILITY. PLEASE
            CONSULT YOUR TAX ADVISOR REGARDING ANY TAX CONSEQUENCES ASSOCIATED
            WITH YOUR HOLDING OR USE OF DIGITAL OR VIRTUAL CURRENCIES.
          </p>
          <p>
            Florida residents may contact the Florida Office of Financial
            Regulation with any unresolved questions or complaints about
            Trillion Capital Markets Inc. d/b/a Trillion Digital Assets at 200
            E. Gaines Street, Tallahassee, FL 32399-0376, telephone number:{' '}
            <Link href={`tel:(800) 848-3792`} passHref={true}>
              (800) 848-3792
            </Link>{' '}
            (toll free).
          </p>
        </section>

        <section>
          <h2>Florida Consumer Complaints Procedures</h2>
          <div>
            <p>
              If you have a complaint, please contact Trillion Capital Markets
              Inc. d/b/a Trillion Digital Assets by emailing{' '}
              <Link href='mailto:complaints@trilliondigital.io' passHref={true}>
                complaints@trilliondigital.io
              </Link>
              .
            </p>
            <p>
              If you still have an unresolved complaint regarding Trillion
              Capital Markets Inc. d/b/a Trillion Digital Assets’s money
              transmission activity, you may file it by contacting the Florida
              Office of Financial Regulation at:
            </p>
            <p>
              Online: In order to file your complaint, you will need to register
              electronically through Online Services. A valid email address is
              required.
            </p>
            <p>
              NOTE: Consumers are encouraged to file their complaints online. If
              you are unable to file online, please download and mail a
              completed paper form. Under Florida law, e-mail addresses are
              public records. If you do not want your e-mail address released in
              response to a public records request, do not send electronic mail
              to the Office. Instead, contact this office by phone or in
              writing. Communications with this office, regardless of the form
              or means of transmission, are subject to disclosure under
              Florida&apos;s public records law.
            </p>
            <p>
              <Link href='/' passHref={true}>
                Download Consumer Complaint Form
              </Link>
              <br />
              <Link href='/' passHref={true}>
                Download Consumer Collection Agency
              </Link>
            </p>
            <p>
              Complaint Form Florida Office of Financial Regulation - Consumer
              Finance
              <br />
              200 E. Gaines Street, Tallahassee,
              <br />
              FL 32399-0376
              <br />
              <Link href={`tel:850-487-9687`} passHref={true}>
                850-487-9687
              </Link>
            </p>
          </div>
          <p>
            FL e-Licensing Portal for filing a complaint
            <br />
            <Link href='/' passHref={true}>
              FL Office of Financial Regulation Complaint Portal
            </Link>
          </p>
        </section>
      </main>

      
    </div>
  );
};

export default Licenses;
