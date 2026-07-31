import React from "react";
import LegalPage from "@/components/LegalPage";
import { COMPANY, formatFullAddress } from "@/config/company";

// NOTE FOR LEGAL REVIEW:
// This wording is drafted to be careful and defensible under Indian consumer
// law. It deliberately avoids absolute "not responsible for anything"
// language. Items marked [LEGAL REVIEW: ...] are placeholders for a lawyer
// to finalise (jurisdiction, limitation amounts, arbitration specifics).

const sections = [
  {
    title: "1. Agreement",
    body: `These Terms of Service (the "Terms") constitute a legally binding agreement between you and ${COMPANY.legalName} ("RAKSHAK", "we", "us", "our") governing your access to and use of the RAKSHAK website, mobile applications and all related services (the "Services"). By creating an account, booking a service or otherwise using the Services, you accept and agree to be bound by these Terms.`,
  },
  {
    title: "2. Eligibility",
    body: `You must be at least 18 years of age and legally capable of entering into a binding contract under Indian law. You are responsible for the accuracy of the information you provide during signup, KYC and booking, and for keeping your account credentials secure.`,
  },
  {
    title: "3. Nature of the Services",
    body: [
      "RAKSHAK is a technology platform that connects customers with independent, verified private-security professionals (\u201cGuards\u201d). Guards engage with customers via the platform, under RAKSHAK's policies and the applicable PSARA framework.",
      "RAKSHAK is not a substitute for police, fire, ambulance or other emergency services. In any life-threatening situation, please dial 112 first.",
    ],
  },
  {
    title: "4. Platform role & facilitator status",
    body: [
      "RAKSHAK operates a technology platform that connects customers with independent, verified security professionals (\u201cGuards\u201d). The Guards are independent service providers and are NOT employees, agents or partners of RAKSHAK.",
      "RAKSHAK's role is limited to facilitating discovery, booking, scheduling, communication and payment between customers and Guards. The security service itself \u2014 the on-ground protection, conduct and performance of duties \u2014 is provided by the Guard, who is solely responsible for the manner in which that service is rendered, subject to applicable law.",
      "By enabling a booking, RAKSHAK does not assume the role of the security-service provider and does not itself deliver security services. Any contract for the actual provision of security services is formed directly between the customer and the assigned Guard, facilitated through the platform.",
      "This facilitator status does not dilute the standards RAKSHAK enforces on the platform (see the verification, conduct and complaints section below), nor any rights available to you under applicable Indian consumer-protection law.",
    ],
  },
  {
    title: "5. Customer responsibilities",
    body: [
      "Provide accurate and complete booking details \u2014 including your name, mobile number, service address, date, time and the nature of the engagement.",
      "Provide a safe and lawful environment for the Guard to perform the booked service, and give only lawful instructions consistent with the booked service category.",
      "You must NOT direct, request or induce a Guard to perform any illegal, unsafe or unethical act, to use unlawful force, or to act beyond what is permitted for licensed private-security personnel under Indian law.",
      "Not misuse the platform \u2014 including making false SOS alerts, false service-deficiency claims, or harassment of Guards or support staff.",
      "Treat the assigned Guard with the same respect and professionalism you would expect from them.",
    ],
  },
  {
    title: "6. Guard responsibilities",
    body: [
      "Complete Aadhaar KYC and police verification (and PSARA training where applicable) before accepting jobs, and keep these credentials current.",
      "Report to the booked location at or before the scheduled start time, in the correct uniform / attire, and remain on duty for the entire booked duration.",
      "Conduct themselves professionally and lawfully at all times; not consume alcohol or intoxicants on duty; not accept side payments outside the platform; not solicit customers away from the platform.",
      "Act only within the scope of duties lawfully permitted for licensed private-security personnel, and comply with all applicable Indian laws and PSARA / private-security regulations.",
    ],
  },
  {
    title: "7. Bookings & payments",
    body: [
      "Indicative pricing is shown before you confirm a booking. The final amount payable \u2014 including any night surcharge, extension charges and applicable GST \u2014 is shown on the fare screen inside the app.",
      "Accepted payment methods include UPI, credit / debit cards, popular Indian wallets and net-banking, processed through RBI-authorised payment gateway partners. Cash may be accepted where explicitly enabled by RAKSHAK.",
      "GST invoices are generated in-app after every completed booking.",
    ],
  },
  {
    title: "8. Cancellations & refunds",
    body: `Cancellations, refunds and chargebacks are governed by our Refund & Cancellation Policy, which forms an integral part of these Terms.`,
  },
  {
    title: "9. Prohibited use",
    body: `You must not use the Services to (a) commit or facilitate any crime, (b) intimidate, threaten, defame or harm any person, (c) transport contraband, (d) circumvent lawful law-enforcement processes, or (e) evade taxes. RAKSHAK cooperates with law-enforcement agencies where there is a lawful basis for such cooperation.`,
  },
  {
    title: "10. Verification, conduct & complaints",
    body: [
      "RAKSHAK verifies Guards \u2014 including police verification and ID / KYC checks \u2014 to a reasonable standard before they are activated on the platform, and re-verifies periodically. While we take these steps in good faith to raise the quality and safety of the network, RAKSHAK does not warrant or guarantee the outcome of any individual booking or the conduct of any individual Guard.",
      "If you experience any misconduct, deficiency, dispute or grievance, you may report it to RAKSHAK support (see the Contact section) or to our Grievance Officer. Upon receiving a report, RAKSHAK will investigate the matter in good faith, may suspend or remove the Guard concerned, may facilitate an appropriate resolution under our Refund & Cancellation Policy, and will cooperate with lawful authorities where required.",
      "Nothing in this section limits the remedies available to you under the Consumer Protection Act, 2019 or other applicable Indian law.",
    ],
  },
  {
    title: "11. Limitation of liability",
    body: [
      "The Services are provided on an \u201cas-is\u201d and \u201cas-available\u201d basis. While we work hard to verify Guards and enforce service quality, we do not warrant that the Services will be uninterrupted, error-free or free from every risk inherent in on-ground security services.",
      "As RAKSHAK acts as a facilitator connecting customers and independent Guards, RAKSHAK is not liable for the independent acts, omissions or conduct of Guards or Customers beyond RAKSHAK's role as a facilitator \u2014 except to the extent such liability arises from RAKSHAK's own negligence or wilful default, or cannot be excluded under applicable law.",
      `To the maximum extent permitted by applicable law, RAKSHAK's aggregate liability arising out of or relating to the Services is limited to [LEGAL REVIEW: insert agreed limitation \u2014 e.g. the total amount paid by the customer for the specific booking giving rise to the claim, or a capped sum]. RAKSHAK is not liable for indirect, incidental, special, punitive or consequential damages, including loss of profits, data or goodwill.`,
      "Nothing in these Terms excludes or limits any liability that cannot lawfully be excluded or limited under the laws of India, including under the Consumer Protection Act, 2019. This section is intended to operate only to the extent permitted by applicable law.",
    ],
  },
  {
    title: "12. Account suspension & termination",
    body: [
      "We may suspend or terminate your account for material breach of these Terms \u2014 including fraud, non-payment, harassment, safety incidents, false claims, chargeback abuse or violation of applicable law. Where reasonably practicable and lawful, we will give notice and an opportunity to respond.",
      "You may close your RAKSHAK account at any time from in-app settings. Certain data will be retained as described in our Privacy Policy for legal and accounting reasons.",
    ],
  },
  {
    title: "13. Grievance redressal & dispute resolution",
    body: [
      "We aim to resolve every issue through good-faith conversation. Please contact our Grievance Officer first (see the Contact section).",
      "[LEGAL REVIEW: confirm dispute-resolution mechanism.] Any dispute that cannot be resolved amicably may be referred to arbitration by a sole arbitrator under the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be [LEGAL REVIEW: insert seat/venue, e.g. New Delhi]. The language of arbitration shall be English. Nothing in this clause prevents a consumer from pursuing remedies available under the Consumer Protection Act, 2019.",
    ],
  },
  {
    title: "14. Governing law & jurisdiction",
    body: `These Terms are governed by, and construed in accordance with, the laws of the Republic of India. Subject to the clause above and to any non-excludable consumer rights, the competent courts at [LEGAL REVIEW: insert jurisdiction, e.g. New Delhi] shall have jurisdiction.`,
  },
  {
    title: "15. Intellectual property",
    body: `The RAKSHAK name, logo, design, source code, content, product features and platform are the intellectual property of ${COMPANY.legalName}, protected by Indian and international laws. You may not copy, modify, distribute, reverse-engineer or create derivative works of any part of the Services without our prior written consent.`,
  },
  {
    title: "16. Changes to these Terms",
    body: `We may update these Terms from time to time. Material changes will be notified in-app or by email. Your continued use of the Services after such changes constitutes acceptance of the revised Terms.`,
  },
  {
    title: "17. Contact",
    body: [
      `${COMPANY.legalName}`,
      formatFullAddress(),
      `Support: ${COMPANY.supportEmail} \u00b7 ${COMPANY.supportPhone}`,
      `Grievance Officer: ${COMPANY.grievanceOfficer.email}`,
    ],
  },
];

export default function Terms() {
  return (
    <LegalPage
      testId="terms-page"
      eyebrow="Legal"
      title="Terms of Service"
      updated={COMPANY.policiesUpdated}
      sections={sections}
    />
  );
}
