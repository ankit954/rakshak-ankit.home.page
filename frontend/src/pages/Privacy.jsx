import React from "react";
import LegalPage from "@/components/LegalPage";
import { COMPANY, formatFullAddress } from "@/config/company";

const sections = [
  {
    title: "1. Who we are",
    body: [
      `${COMPANY.legalName} (“RAKSHAK”, “we”, “us”, “our”) is the operator of the RAKSHAK on-demand personal-security platform. Our registered office is at ${formatFullAddress()}.`,
      `This Privacy Policy explains what personal data we collect, why, how it is stored and protected, whom we share it with and your rights under the Digital Personal Data Protection Act, 2023 (“DPDP Act”). It applies to our website ${COMPANY.site}, the RAKSHAK mobile applications and all related services (together, the “Services”).`,
    ],
  },
  {
    title: "2. Personal data we collect",
    body: [
      "Identity & contact data — full name, mobile number, email address, home/work/booking address, and profile photograph.",
      "Booking data — services booked, dates, times, locations, ratings, feedback, chat messages with support and communications with the assigned guard through in-app relayed channels.",
      "Location data — real-time geolocation during an active booking (customer and guard), and the trip-link metadata you may share with family or friends.",
      "Guard KYC data — where you enrol as a guard: Aadhaar reference number (the last four digits are shown in the app; the full number is masked in our systems), a police-verification certificate (PVC), PSARA certification (if any), service / discharge records, and bank details required to receive payouts.",
      "Payment data — the amount, method, currency and status of every payment. Actual card numbers, UPI PINs, CVVs and net-banking credentials are handled directly by RBI-authorised payment gateway partners and are never stored on RAKSHAK servers.",
      "Device & usage data — device model, operating system, app version, IP address, crash logs, and interaction analytics required for security, fraud detection and product improvement.",
    ],
  },
  {
    title: "3. Purposes of processing",
    body: [
      "(a) provide, personalise and operate the Services (booking, matching, dispatch, live tracking, SOS, payouts);",
      "(b) verify Guards under Aadhaar KYC and police-verification obligations, and to satisfy applicable PSARA and other regulatory requirements;",
      "(c) process payments, GST invoicing, refunds and payouts;",
      "(d) provide customer support and resolve disputes;",
      "(e) detect, prevent and investigate fraud, abuse, safety incidents and platform misuse;",
      "(f) communicate with you about transactions, service updates, and — only with your explicit opt-in — marketing;",
      "(g) comply with applicable Indian laws and respond to lawful requests from courts and authorities.",
    ],
  },
  {
    title: "4. Legal basis under the DPDP Act",
    body: `We process your personal data on the basis of your explicit, free, specific, informed, unconditional and unambiguous CONSENT, recorded through a clear affirmative action in the app or website. We also rely on statutory legitimate uses under the DPDP Act, including performance of the booking contract, compliance with legal obligations and prevention of fraud or safety threats.`,
  },
  {
    title: "5. How your data is stored & protected",
    body: [
      "Storage: personal data is stored primarily on servers physically located in India. Backups follow the same jurisdictional rule.",
      "Encryption: all data in transit is encrypted with TLS 1.2+ / HTTPS. Sensitive fields at rest (including KYC references and access tokens) are encrypted at the storage layer.",
      "Access controls: engineering / operations access is on a least-privilege basis; every read and write on production databases is audit-logged.",
      "Payments: card / UPI / net-banking data is never touched by RAKSHAK — the payment gateway partner’s PCI-DSS environment holds the tokenised credentials.",
    ],
  },
  {
    title: "6. Sharing with third parties",
    body: [
      "Guards & customers — the minimum data required to complete a booking (first name, masked phone, live location during the shift).",
      "Payment gateway partners — e.g. BillDesk / Razorpay and their acquiring banks — for the sole purpose of processing your payment and, where applicable, initiating refunds.",
      "SMS / OTP providers — Indian licensed telecom / SMS aggregators for transactional OTPs and booking notifications.",
      "Maps & geolocation providers — for live tracking, address search and reverse-geocoding.",
      "KYC providers — Aadhaar-based verification agencies contracted under Indian law.",
      "Law-enforcement agencies and regulators — where disclosure is required by law or to protect life, safety or platform integrity.",
      "We do NOT sell your personal data to third parties for advertising.",
    ],
  },
  {
    title: "7. Your rights as a Data Principal",
    body: [
      "Access — request a copy of the personal data we hold about you.",
      "Correction / completion / updation — of any inaccurate or incomplete personal data.",
      "Erasure — of personal data that is no longer necessary for the purpose for which it was collected, subject to legal-retention requirements.",
      "Withdrawal of consent — at any time, from in-app settings or by writing to us. Withdrawal does not affect the lawfulness of processing prior to withdrawal, and may limit our ability to provide certain Services.",
      "Grievance redressal — see section 11.",
      "Nomination — you may nominate another individual to exercise the above rights on your behalf in the event of your death or incapacity.",
      "To exercise any of these rights, email " +
        COMPANY.supportEmail +
        " from the email address registered with your account, with the subject line “DPDP Request — <type of request>”. We acknowledge within 48 hours and respond substantively within 15 days.",
    ],
  },
  {
    title: "8. Data retention",
    body: [
      "Account data: retained while your account is active and for up to 36 months after deletion, to satisfy legal, accounting and dispute-resolution requirements.",
      "Booking, KYC, payment and invoice records: retained for the period mandated by Indian tax and record-keeping law (typically 7–8 years).",
      "Anonymised / aggregated statistics may be retained indefinitely.",
    ],
  },
  {
    title: "9. Cookies & similar technologies",
    body: `Our website uses first-party functional cookies for session management and preference remembering. We do not set third-party advertising cookies. Where analytics cookies are used, they are configured to strip personal identifiers before data leaves your browser. You can block cookies in your browser settings, though this may impair site functionality.`,
  },
  {
    title: "10. Children",
    body: `The Services are intended for individuals aged 18 and above. We do not knowingly collect personal data from anyone below 18. If you believe a minor has provided us data, please contact us for immediate deletion.`,
  },
  {
    title: "11. Grievance Officer",
    body: [
      `In accordance with the DPDP Act and the Information Technology Act, 2000, the contact details of our Grievance Officer are:`,
      `${COMPANY.grievanceOfficer.name}, ${COMPANY.legalName}`,
      `Email: ${COMPANY.grievanceOfficer.email}`,
      `Address: ${formatFullAddress()}`,
      `Business hours: ${COMPANY.supportHours}`,
      `We acknowledge complaints within 48 hours and endeavour to resolve them within 15 days.`,
    ],
  },
  {
    title: "12. Changes to this Policy",
    body: `We may update this Policy from time to time. Material changes will be notified in-app, by email and on this page. The “Last updated” date at the top reflects the most recent revision.`,
  },
];

export default function Privacy() {
  return (
    <LegalPage
      testId="privacy-page"
      eyebrow="Legal"
      title="Privacy Policy"
      updated={COMPANY.policiesUpdated}
      sections={sections}
    />
  );
}
