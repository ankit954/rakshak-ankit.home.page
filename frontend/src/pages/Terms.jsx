import React from "react";
import LegalPage from "@/components/LegalPage";
import { COMPANY, formatFullAddress } from "@/config/company";

const sections = [
  {
    title: "1. Agreement",
    body: `These Terms of Service (the “Terms”) constitute a legally binding agreement between you and ${COMPANY.legalName} (“RAKSHAK”, “we”, “us”) governing your access to and use of the RAKSHAK website, mobile applications and all related services (the “Services”). By creating an account, booking a service or otherwise using the Services, you accept and agree to be bound by these Terms.`,
  },
  {
    title: "2. Eligibility",
    body: `You must be at least 18 years of age and legally capable of entering into a binding contract under Indian law. You are responsible for the accuracy of the information you provide during signup, KYC and booking, and for keeping your account credentials secure.`,
  },
  {
    title: "3. Nature of the Services",
    body: [
      "RAKSHAK is a technology platform that connects customers with independent, police-verified private-security professionals (“Guards”). Guards are not employees of RAKSHAK; they engage with customers via the platform, under RAKSHAK’s policies and the applicable PSARA framework.",
      "RAKSHAK is not a substitute for police, fire, ambulance or other emergency services. In any life-threatening situation, please dial 112 first.",
    ],
  },
  {
    title: "4. Customer obligations",
    body: [
      "Provide accurate mobile number, name, service address and booking-related information.",
      "Not misuse the platform — including making false SOS alerts, false service-deficiency claims, harassment of Guards or support staff, and use of the Service to facilitate any unlawful activity.",
      "Treat the assigned Guard with the same respect and professionalism you would expect from them.",
    ],
  },
  {
    title: "5. Guard obligations",
    body: [
      "Complete Aadhaar KYC and police verification (and PSARA training where applicable) before accepting jobs.",
      "Report to the booked location at or before the scheduled start time, in the correct uniform / attire, and remain on duty for the entire booked duration.",
      "Conduct themselves professionally at all times; not consume alcohol or intoxicants on duty; not accept side payments outside the platform; not solicit customers away from the platform.",
      "Comply with all applicable Indian laws and PSARA / private-security regulations.",
    ],
  },
  {
    title: "6. Bookings & payments",
    body: [
      "Indicative pricing is shown before you confirm a booking. The final amount payable — including any night surcharge, extension charges and applicable GST — is shown on the fare screen inside the app.",
      "Accepted payment methods include UPI, credit / debit cards, popular Indian wallets and net-banking, processed through RBI-authorised payment gateway partners. Cash may be accepted where explicitly enabled by RAKSHAK.",
      "GST invoices are generated in-app after every completed booking.",
    ],
  },
  {
    title: "7. Cancellations & refunds",
    body: `Cancellations, refunds and chargebacks are governed by our Refund & Cancellation Policy, which forms an integral part of these Terms.`,
  },
  {
    title: "8. Prohibited use",
    body: `You must not use the Services to (a) commit or facilitate any crime, (b) intimidate, threaten, defame or harm any person, (c) transport contraband, (d) circumvent lawful law-enforcement processes, or (e) evade taxes. RAKSHAK cooperates fully with law-enforcement agencies where there is a lawful basis for such cooperation.`,
  },
  {
    title: "9. Liability & limitation of liability",
    body: [
      "The Services are provided on an “as-is” and “as-available” basis. While we work hard to verify Guards and enforce service quality, we do not warrant that the Services will be uninterrupted, error-free or free from any risk inherent in on-ground security services.",
      `To the maximum extent permitted by law, RAKSHAK’s aggregate liability arising out of or relating to the Services is limited to the amounts you paid to ${COMPANY.legalName} in the twelve (12) months immediately preceding the event giving rise to the claim.`,
      "RAKSHAK is not liable for indirect, incidental, special, punitive or consequential damages, including loss of profits, loss of data or loss of goodwill.",
    ],
  },
  {
    title: "10. Account suspension & termination",
    body: [
      "We may suspend or terminate your account at any time, with or without notice, for material breach of these Terms — including but not limited to fraud, non-payment, harassment, safety incidents, false claims, chargeback abuse or violation of applicable law.",
      "You may close your RAKSHAK account at any time from in-app settings. Certain data will be retained as described in our Privacy Policy for legal and accounting reasons.",
    ],
  },
  {
    title: "11. Dispute resolution",
    body: [
      "We aim to resolve every issue through good-faith conversation. Please contact our Grievance Officer first (see section 12).",
      "Any dispute that cannot be resolved amicably shall be referred to arbitration by a sole arbitrator appointed under the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be New Delhi. The language of arbitration shall be English.",
    ],
  },
  {
    title: "12. Governing law & jurisdiction",
    body: `These Terms are governed by, and construed in accordance with, the laws of the Republic of India. Subject to the arbitration clause above, the competent civil courts at New Delhi have exclusive jurisdiction.`,
  },
  {
    title: "13. Intellectual property",
    body: `The RAKSHAK name, logo, design, source code, content, product features and platform are the intellectual property of ${COMPANY.legalName}, protected by Indian and international laws. You may not copy, modify, distribute, reverse-engineer or create derivative works of any part of the Services without our prior written consent.`,
  },
  {
    title: "14. Changes to these Terms",
    body: `We may update these Terms from time to time. Material changes will be notified in-app or by email. Your continued use of the Services after such changes constitutes acceptance of the revised Terms.`,
  },
  {
    title: "15. Contact",
    body: [
      `${COMPANY.legalName}`,
      formatFullAddress(),
      `Support: ${COMPANY.supportEmail} · ${COMPANY.supportPhone}`,
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
