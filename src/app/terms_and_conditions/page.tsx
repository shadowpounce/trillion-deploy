


import styles from './page.module.scss';
import Link from 'next/link';

const TermsAndConditions = () => {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.contentContainer}>
        <h1>Website Terms and Conditions</h1>

        <section>
          <span>Effective Date: January 1, 2025</span>
          <h2>1. Introduction</h2>
          <div>
            <p>
              Welcome to{' '}
              <Link
                href='https://trilliondigital.io.'
                passHref={true}
                target='_blank'
              >
                www.trilliondigital.io
              </Link>{' '}
              (the “Website”). By accessing or using this Website, you agree to
              be bound by these Website Terms and Conditions (“Terms”). If you
              do not agree to these Terms, please do not use the Website.
            </p>
            <p>
              <b>Trillion Capital Markets Inc.</b>, doing business as{' '}
              <b>Trillion Digital</b> (“Trillion Digital,” “we,” “us,” or
              “our”), provides this Website for informational purposes only. The
              content is intended solely for persons with professional
              experience in matters relating to digital asset investments
              (“Investment Professionals”) and is not directed at retail
              clients.
            </p>
          </div>
        </section>

        <section>
          <h2>2. Intellectual Property Rights</h2>
          <h3>2.1 Ownership</h3>
          <p>
            All content on the Website, including but not limited to text,
            graphics, logos, icons, images, audio clips, digital downloads, data
            compilations, and software, is the property of Trillion Digital or
            its content suppliers and is protected by United States and
            international copyright, trademark, patent, trade secret, and other
            intellectual property or proprietary rights laws.
          </p>
          <h3>2.2 Limited License</h3>
          <p>
            Trillion Digital grants you a limited, non-exclusive,
            non-transferable, and revocable license to access and use the
            Website for your personal or internal business purposes as an
            Investment Professional. Any other use of the content on the
            Website, including modification, distribution, transmission,
            performance, broadcast, publication, licensing, reverse engineering,
            or derivative works, is strictly prohibited unless expressly
            authorized by Trillion Digital in writing.
          </p>
        </section>

        <section>
          <h2>3. User Conduct</h2>
          <h3>3.1 Prohibited Activities</h3>
          <p>
            You agree not to use the Website for any unlawful purpose or any
            purpose prohibited under these Terms. You agree not to:
          </p>
          <ul>
            <li>
              Violate any applicable federal, state, local, or international law
              or regulation.
            </li>
            <li>
              Engage in unauthorized framing of or linking to the Website.
            </li>
            <li>
              Attempt to interfere with the proper functioning of the Website.
            </li>
            <li>
              Use any automated system, including robots, spiders, or offline
              readers, to access the Website in a manner that sends more request
              messages to the Trillion Digital servers than a human can
              reasonably produce in the same period.
            </li>
          </ul>
          <ul>
            <li>
              Introduce any viruses, Trojan horses, worms, logic bombs, or other
              material that is malicious or technologically harmful.
            </li>
          </ul>
          <ul>
            <li>
              Attempt to gain unauthorized access to, interfere with, damage, or
              disrupt any parts of the
            </li>
          </ul>
          <p>
            Website or any server, computer, or database connected to the
            Website.
          </p>
          <h3>3.2 User Responsibility</h3>
          <p>
            You are solely responsible for your use of the Website and for
            ensuring that your actions comply with these Terms. Trillion Digital
            reserves the right to terminate your access to the Website for any
            violation of these Terms.
          </p>
        </section>

        <section>
          <h2>4. Disclaimers and Limitation of Liability</h2>
          <h3>4.1 No Investment Advice</h3>
          <p>
            The content on this Website is provided for general informational
            purposes only and does not constitute investment, legal, accounting,
            or tax advice. Trillion Digital does not warrant the accuracy,
            completeness, or usefulness of this information. Any reliance you
            place on such information is strictly at your own risk.
          </p>
          <h3>4.2 No Warranties</h3>
          <p>
            The Website is provided on an “as is” and “as available” basis.
            Trillion Digital makes no representations or warranties of any kind,
            express or implied, regarding the operation of the Website or the
            information, content, materials, or products included on the
            Website.
          </p>
          <h3>4.3 Limitation of Liability</h3>
          <p>
            To the fullest extent permitted by law, Trillion Digital, its
            affiliates, or their licensors, service providers, employees,
            agents, officers, or directors shall not be liable for any damages
            of any kind arising from the use of the Website or from any
            information or content on the Website, including but not limited to
            direct, indirect, incidental, punitive, and consequential damages.
          </p>
        </section>

        <section>
          <h2>5. Links to Third-Party Websites</h2>
          <p>
            The Website may contain links to third-party websites or services
            that are not owned or controlled by Trillion Digital. Trillion
            Digital has no control over, and assumes no responsibility for, the
            content, privacy policies, or practices of any third-party websites
            or services. Inclusion of any links does not imply a recommendation
            or endorsement by Trillion Digital.
          </p>
        </section>

        <section>
          <h2>6. Privacy Policy Reference</h2>
          <p>
            Your use of the Website is also subject to our{' '}
            <Link href='/privacy_notice'>Privacy Policy</Link>, which is hereby
            incorporated into these Terms by reference. Please review our
            Privacy Policy here to understand our practices regarding the
            collection and use of your personal information.
          </p>
        </section>

        <section>
          <h2>7. Governing Law and Jurisdiction</h2>
          <div>
            <p>
              These Terms and any dispute or claim arising out of or related to
              them shall be governed by and construed in accordance with the
              laws of the <Link href='/'>State of Delaware</Link>, without
              giving effect to any choice or conflict of law provision or rule.
            </p>
            <p>
              Any legal suit, action, or proceeding arising out of, or related
              to, these Terms or the Website shall be instituted exclusively in
              the federal or state courts located in the State of Delaware.
            </p>
          </div>
        </section>

        <section>
          <h2>8. Amendments</h2>
          <p>
            Trillion Digital reserves the right to amend these Terms at any
            time. All changes are effective immediately when posted and apply to
            all access to and use of the Website thereafter. Your continued use
            of the Website following the posting of revised Terms means that you
            accept and agree to the changes.
          </p>
        </section>

        <section>
          <h2>9. Contact Information</h2>
          <p>
            For any questions regarding these Website Terms & Conditions, please
            contact us at{' '}
            <Link href='mailto:compliance@trilliondigital.io' passHref={true}>
              compliance@trilliondigital.io
            </Link>
          </p>
        </section>

        <section>
          <h2>Acknowledgment</h2>
          <p>
            By using this Website, you acknowledge that you have read,
            understood, and agree to be bound by these{' '}
            <Link href='/terms_and_conditions' passHref={true}>
              Terms and Conditions
            </Link>
            .
          </p>
        </section>
      </main>

      
    </div>
  );
};

export default TermsAndConditions;
