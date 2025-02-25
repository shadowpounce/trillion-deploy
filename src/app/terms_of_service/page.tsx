

import styles from './page.module.scss';

import Link from 'next/link';

const TermsOfService = () => {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.contentContainer}>
        <h1>Terms of Service</h1>

        <section>
          <span>Effective Date: January 1, 2025</span>
          <h2>1. Introduction</h2>
          <p>
            By accessing{' '}
            <Link href='https://trilliondigital.io' target='_blank'>
              www.trilliondigital.io
            </Link>{' '}
            (the “Website”), you agree to the Website Terms and Conditions.
            Additionally, by engaging Trillion Capital Markets Inc. or any of
            its affiliates (collectively, “Trillion Digital,” “we,” “us,” or
            “our”) for trading or liquidity services, you agree to be bound by
            these Terms of Service.
          </p>
          <p>
            Trillion Digital provides services exclusively to approved
            counterparties who have entered into a signed agreement (the “Master
            Trade Agreement”). Accessing the Website does not establish a
            counterparty relationship or imply the existence of a Master Trade
            Agreement.
          </p>
          <p>
            Prior to becoming an approved counterparty, all parties must
            complete our onboarding process, including satisfactory completion
            of counterparty due diligence and Know Your Customer/Anti-Money
            Laundering (“KYC/AML”) procedures. By accessing the Website and
            entering into transactions with Trillion Digital, you agree to be
            bound by these Terms of Service.
          </p>
          <p>
            Trillion Digital is a global trading firm operating as a dealer,
            counterparty, and liquidity provider in digital asset markets where
            such activities are permissible. We engage in price discovery, price
            quoting, order taking, trade execution, and other related
            activities. Unless expressly agreed otherwise in writing, Trillion
            Digital acts as principal for its own account and does not serve as
            an agent, fiduciary, or financial advisor on behalf of clients or
            counterparties. As detailed in Section 4 (Conflicts of Interest),
            Trillion Digital and its counterparties may have divergent or
            conflicting interests.
          </p>
          <p>
            These Terms of Service supplement any other applicable terms agreed
            between you and Trillion Digital, as well as any laws or regulations
            governing our trading activities. Interactions with Trillion Digital
            will be based on these terms unless expressly agreed otherwise (i)
            between you and Trillion Digital, (ii) provided in other applicable
            Trillion Digital terms of dealing, or (iii) required by law or
            regulation. These Terms of Service may be updated periodically to
            reflect regulatory, industry, or other developments.
          </p>
          <p>
            Nothing in this document constitutes an offer to sell, a
            solicitation to buy, or a recommendation of any products or services
            described herein in jurisdictions where such activities are
            prohibited.
          </p>
        </section>

        <section>
          <h2>2. Intended Audience</h2>
          <p>
            Communications and services provided by Trillion Digital are
            intended solely for persons with professional experience in matters
            relating to digital asset investments (“Investment Professionals”).
            Individuals without such professional experience should not rely on
            these communications and are advised to consult their legal,
            accounting, or financial advisors before engaging in any
            transactions or services described herein.
          </p>
          <p>
            By accepting these Terms of Service, you confirm that you are an
            Investment Professional and possess sufficient experience and
            understanding of the transactions and services provided to assess
            their suitability and associated risks. Our communications and
            services are not intended for retail clients and are not suitable
            for such persons.
          </p>
        </section>

        <section>
          <h2>3. No Investment Advice</h2>
          <p>
            Unless expressly agreed otherwise in writing, Trillion Digital does
            not provide investment advice. All counterparties are responsible
            for making their own investment decisions and for understanding the
            risks associated with trading digital assets.
          </p>
        </section>

        <section>
          <h2>4. Conflicts of Interest</h2>
          <p>
            Unless explicitly agreed otherwise, Trillion Digital acts as
            principal in transactions with counterparties and does not act as an
            agent. As a liquidity provider, we manage a portfolio of positions
            for multiple counterparties with competing interests and engage in
            proprietary trading activities.
          </p>
          <p>
            Trillion Digital may trade prior to or alongside counterparty
            transactions to manage risk, source liquidity, or facilitate order
            execution. These activities may include entering into pre-hedging
            transactions executed before, during, or after the pricing or
            execution of related transactions. While these activities are
            intended to facilitate counterparty transactions and manage risk,
            they may impact pricing and liquidity.
          </p>
          <p>
            We maintain policies and procedures designed to manage potential
            conflicts of interest, ensuring that counterparties are treated
            fairly and that transactions are executed in accordance with agreed
            terms.
          </p>
        </section>

        <section>
          <h2>5. Best Execution and Order Internalization</h2>
          <p>
            Digital assets are subject to significant price volatility and lack
            a centralized pricing authority. Trillion Digital determines
            transaction pricing at its sole discretion, taking into account
            market conditions and other relevant factors. We do not guarantee
            that our prices represent the best available price in the market.
          </p>
          <p>
            When appropriate, Trillion Digital may execute transactions by
            crossing counterparty orders with internal orders or with orders
            from other counterparties on an over-the-counter basis. Such
            transactions will be priced fairly and in accordance with the terms
            agreed upon with the counterparties.
          </p>
        </section>

        <section>
          <h2>6. No Offer of Securities</h2>
          <p>
            This document and the information contained herein are provided for
            informational purposes only and do not constitute an offer to sell
            or a solicitation to buy any securities or other financial
            instruments.
          </p>
        </section>

        <section>
          <h2>7. Risks Associated with Digital Assets</h2>
          <p>
            Trading digital assets involves significant risks, including the
            potential for substantial financial loss. Prices can be highly
            volatile and may fluctuate dramatically within short periods.
            Trading digital assets may not be suitable for all investors. You
            are encouraged to fully educate yourself about the risks associated
            with digital assets and to consider your own financial circumstances
            before engaging in such transactions.
          </p>
          <p>
            For additional information, please review regulatory advisories on
            digital assets. Links to relevant advisories may be provided for
            your convenience but are not guaranteed to be accurate or up to
            date.
          </p>
        </section>

        <section>
          <h2>8. Amendments</h2>
          <p>
            These Terms of Service are effective as of January 1, 2025 and may
            be amended from time to time. Any amendments will be posted on the
            Website, and your continued use of our services constitutes
            acceptance of any such amendments.
          </p>
        </section>

        <section>
          <h2>Contact Information</h2>
          <p>
            For any questions regarding these Terms of Service, please contact
            us at{' '}
            <Link href='mailto:compliance@trilliondigital.io' passHref={true}>
              compliance@trilliondigital.io
            </Link>
            .
          </p>
        </section>
      </main>

      
    </div>
  );
};

export default TermsOfService;
