

import styles from './page.module.scss';

import Link from 'next/link';

const RiskAndDisclosures = () => {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.contentContainer}>
        <h1>Risks & Disclosures</h1>

        <section>
          <span>Date of last update: January 1, 2025</span>
          <p>
            Cryptocurrency is a digital representation of value that functions
            as a medium of exchange, a unit of account, or a store of value, but
            it does not have legal tender status. Cryptocurrencies are sometimes
            exchanged for U.S. dollars or other currencies around the world, but
            they are not generally backed or supported by any government or
            central bank. Their value is completely derived by market forces of
            supply and demand, and they are more volatile than traditional
            currencies. The value of cryptocurrency may be derived from the
            continued willingness of market participants to exchange fiat
            currency for cryptocurrency, which may result in the potential for
            permanent and total loss of value of a particular cryptocurrency
            should the market for that cryptocurrency disappear.
            Cryptocurrencies are not covered by either FDIC or SIPC insurance.
            Legislative and regulatory changes or actions at the state, federal,
            or international level may adversely affect the use, transfer,
            exchange, and value of cryptocurrency.
          </p>
          <p>
            Purchasing cryptocurrencies comes with a number of risks, including
            volatile market price swings or flash crashes, market manipulation,
            and cybersecurity risks. In addition, cryptocurrency markets and
            exchanges are not regulated with the same controls or customer
            protections available in equity, option, futures, or foreign
            exchange investing. There is no assurance that a person who accepts
            a cryptocurrency as payment today will continue to do so in the
            future.
          </p>
          <p>
            Investors should conduct extensive research into the legitimacy of
            each individual cryptocurrency, including its platform, before
            investing. The features, functions, characteristics, operation, use
            and other properties of the specific cryptocurrency may be complex,
            technical, or difficult to understand or evaluate. The
            cryptocurrency may be vulnerable to attacks on the security,
            integrity or operation, including attacks using computing power
            sufficient to overwhelm the normal operation of the cryptocurrency’s
            blockchain or other underlying technology. Some cryptocurrency
            transactions will be deemed to be made when recorded on a public
            ledger, which is not necessarily the date or time that a transaction
            may have been initiated.
          </p>
          <p>
            Cryptocurrency trading requires knowledge of cryptocurrency markets.
            In attempting to profit through cryptocurrency trading you must
            compete with traders worldwide. You should have appropriate
            knowledge and experience before engaging in substantial
            cryptocurrency trading. Any individual cryptocurrency may change or
            otherwise cease to operate as expected due to changes made to its
            underlying technology, changes made using its underlying technology,
            or changes resulting from an attack. These changes may include,
            without limitation, a &quot;fork,&quot; a &quot;rollback,&quot; an
            &quot;airdrop,&quot; or a &quot;bootstrap.&quot; Such changes may
            dilute the value of an existing cryptocurrency position and/or
            distribute the value of an existing cryptocurrency position to
            another cryptocurrency. Trillion Digital Assets retains the right to
            support or not support any of these changes. Any cryptocurrency may
            be cancelled, lost or double spent, or otherwise lose all or most of
            their value, due to forks, rollbacks, attacks, or failures to
            operate as intended. The nature of cryptocurrency means that any
            technological difficulties experienced by Trillion Digital Assets
            may prevent the access of your cryptocurrency. Any insurance or
            surety bonds maintained by Trillion Digital Assets for the benefit
            of its customers may not be sufficient to cover all losses incurred
            by customers.
          </p>
          <p>
            Cryptocurrency trading can be extremely risky. Cryptocurrency
            trading may not generally be appropriate, particularly with funds
            drawn from retirement savings, student loans, mortgages, emergency
            funds, or funds set aside for other purposes. Cryptocurrency trading
            can lead to large and immediate financial losses. The volatility and
            unpredictability of the price of cryptocurrency relative to fiat
            currency may result in significant loss over a short period of time.
            Transactions in cryptocurrency may be irreversible, and,
            accordingly, losses due to fraudulent or accidental transactions may
            not be recoverable. The nature of cryptocurrency may lead to an
            increased risk of fraud or cyber attack.
          </p>
          <p>
            Under certain market conditions, you may find it difficult or
            impossible to liquidate a position quickly at a reasonable price.
            This can occur, for example, when the market for a particular
            cryptocurrency suddenly drops, or if trading is halted due to recent
            news events, unusual trading activity, or changes in the underlying
            cryptocurrency system.
          </p>
          <p>
            The greater the volatility of a particular cryptocurrency, the
            greater the likelihood that problems may be encountered in executing
            a transaction. In addition to normal market risks, you may
            experience losses due to one or more of the following: system
            failures, hardware failures, software failures, network connectivity
            disruptions, and data corruption.
          </p>
          <p>
            Not finding what you were looking for? Send us an email at{' '}
            <Link href='mailto:info@trilliondigital.io' passHref={true}>
              info@trilliondigital.io
            </Link>{' '}
            and we will get back within 12 business hours.
          </p>
        </section>
      </main>

      
    </div>
  );
};

export default RiskAndDisclosures;
