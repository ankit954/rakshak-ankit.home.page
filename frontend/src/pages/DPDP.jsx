import React from "react";
import LegalPage from "@/components/LegalPage";
import { COMPANY, formatFullAddress } from "@/config/company";

const UPDATED = COMPANY.policiesUpdated;

const sections = [
  {
    title: "1. Purpose of this notice",
    body: `This notice (the "DPDP Notice") is issued by ${COMPANY.brandName} ("RAKSHAK") in compliance with section 6 of the Digital Personal Data Protection Act, 2023 (the "DPDP Act"). It explains the personal data we will process about you, the purposes for processing, and the rights available to you as a Data Principal.`,
  },
  {
    title: "2. Personal data we will process",
    body: [
      "Customer data: name, mobile number, email, address, payment metadata, booking history, ratings and support communications.",
      "Live-tracking data: real-time location during an active booking and shareable trip-link metadata.",
      "Guard data (where you apply or work as a Guard): Aadhaar reference, police-verification certificate, PSARA certificate, photographs, bank-account details for payouts and service records.",
      "Device & usage data: device identifiers, OS version, IP address, app analytics and crash diagnostics.",
    ],
  },
  {
    title: "3. Purposes of processing",
    body: [
      "Providing, personalising and securing the RAKSHAK Services.",
      "Verifying Guards, matching bookings, dispatching, enabling live tracking and SOS.",
      "Processing payments, payouts, refunds and taxation/GST compliance.",
      "Customer support, dispute resolution and fraud / abuse prevention.",
      "Marketing communications (only when you opt in) and product research.",
      "Complying with applicable Indian laws and lawful directions of authorities.",
    ],
  },
  {
    title: "4. Your consent",
    body: [
      "By creating a RAKSHAK account or booking a service, you consent to the processing of your personal data for the purposes described above.",
      "Your consent is free, specific, informed, unconditional and unambiguous, and is recorded with a clear affirmative action in our app or website.",
      `You may withdraw consent at any time from in-app Settings or by writing to ${COMPANY.supportEmail}. Withdrawal does not affect the lawfulness of processing prior to withdrawal, and may limit our ability to provide certain Services.`,
    ],
  },
  {
    title: "5. Sharing & processors",
    body: "We share personal data only with our verified processors (cloud hosting, KYC providers, payment partners, mapping, analytics and customer support tools), and with law-enforcement / regulators where required by law. Each processor is bound by written terms requiring confidentiality and DPDP-aligned safeguards.",
  },
  {
    title: "6. Cross-border transfers",
    body: "Where transfers outside India are necessary, they are made only to jurisdictions permitted by the Central Government under the DPDP Act, and under appropriate contractual safeguards.",
  },
  {
    title: "7. Your rights as a Data Principal",
    body: [
      "Right to access information about the personal data we process about you.",
      "Right to correction, completion, updating and erasure.",
      "Right of grievance redressal \u2014 see our Grievance Officer details below.",
      "Right to nominate another individual to exercise your rights in the event of death or incapacity.",
      "Right to withdraw consent and to lodge a complaint with the Data Protection Board of India.",
    ],
  },
  {
    title: "8. How to exercise your rights",
    body: [
      `Email ${COMPANY.supportEmail} from the email address registered with your account with the subject line "DPDP Request \u2014 [type of request]".`,
      "We acknowledge requests within 48 hours and respond substantively within 15 days, except where the law allows a longer period.",
    ],
  },
  {
    title: "9. Grievance Officer",
    body: [
      `Grievance Officer, ${COMPANY.brandName}`,
      `Email: ${COMPANY.supportEmail}`,
      `Address: ${formatFullAddress()}`,
    ],
  },
  {
    title: "10. Updates",
    body: "We will revise this DPDP Notice as the regulatory framework evolves. The \u201cLast updated\u201d date will reflect the most recent revision.",
  },
];

export default function DPDP() {
  return (
    <LegalPage
      testId="dpdp-page"
      eyebrow="Legal"
      title="DPDP Consent Notice"
      updated={UPDATED}
      sections={sections}
    />
  );
}
