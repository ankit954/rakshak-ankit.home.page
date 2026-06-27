import React from "react";
import LegalPage from "@/components/LegalPage";

const UPDATED = "December 2025";

const sections = [
  {
    title: "1. Who we are",
    body: [
      "RAKSHAK is operated by RAKSHAK Technologies Pvt. Ltd. (\u201cRAKSHAK\u201d, \u201cwe\u201d, \u201cus\u201d, \u201cour\u201d), an Indian company offering an on-demand platform that connects customers with police-verified, trained personal-security professionals (\u201cGuards\u201d) primarily across Delhi NCR.",
      "This Privacy Policy explains what personal data we collect, why we collect it, how we use it, with whom we share it, and your rights under the Digital Personal Data Protection Act, 2023 (\u201cDPDP Act\u201d). It applies to our website, mobile apps and related services (collectively, the \u201cServices\u201d).",
    ],
  },
  {
    title: "2. Personal data we collect",
    body: [
      "Identity & contact data: name, mobile number, email address, residential or service address.",
      "KYC & verification data (Guards): Aadhaar reference number, police-verification certificate, PSARA certificate, photographs and service records.",
      "Booking & usage data: services booked, dates/times, pricing, ratings, feedback, support tickets.",
      "Location & device data: real-time geolocation during an active booking, IP address, device identifiers, app version, crash logs and analytics events.",
      "Payment data: limited transaction metadata. Card/UPI credentials are handled by RBI-authorised payment partners, not stored by RAKSHAK.",
    ],
  },
  {
    title: "3. Purposes & legal basis",
    body: [
      "We process your data to (a) provide and operate the Services, (b) verify Guards and meet PSARA and police-verification obligations, (c) match bookings, enable live-tracking and SOS, (d) process payouts and payments, (e) comply with applicable law and respond to lawful requests, and (f) improve safety, quality and security of the platform.",
      "Our lawful bases under the DPDP Act are your consent (which you can withdraw at any time), performance of a contract with you, compliance with legal obligations, and legitimate uses such as fraud prevention and ensuring information security.",
    ],
  },
  {
    title: "4. Sharing of data",
    body: [
      "Guards & customers see only the minimum data needed to complete a booking (e.g. first name, masked phone, location).",
      "Verified service partners (payment processors, KYC providers, cloud, mapping, analytics) process data on our behalf under written contracts.",
      "Law-enforcement agencies and regulators, where disclosure is required by law or to investigate fraud, threats to life or platform abuse.",
      "We do not sell your personal data.",
    ],
  },
  {
    title: "5. Cross-border transfers",
    body: "Your data is primarily stored on servers located in India. Where we use service providers outside India, we transfer data only to jurisdictions permitted by the Central Government under the DPDP Act, and under appropriate safeguards.",
  },
  {
    title: "6. Retention",
    body: [
      "Account data: retained while your account is active and for up to 36 months after deletion, to satisfy legal, accounting and dispute-resolution requirements.",
      "Booking, KYC and payment records: retained for the period mandated by Indian law (typically 7\u20138 years).",
      "Anonymised analytics may be retained indefinitely.",
    ],
  },
  {
    title: "7. Your rights",
    body: [
      "Right to access, correct or update your personal data.",
      "Right to erasure of personal data that is no longer necessary for the purposes for which it was collected.",
      "Right to grievance redressal \u2014 contact our Grievance Officer (below).",
      "Right to nominate another person to exercise your rights in the event of your death or incapacity.",
      "Right to withdraw consent at any time; this will not affect the lawfulness of processing prior to withdrawal.",
    ],
  },
  {
    title: "8. Security",
    body: "We use technical and organisational safeguards \u2014 encrypted transit (TLS), least-privilege access, audit logging and KYC-grade identity binding \u2014 to protect personal data. No system is perfectly secure, and we cannot guarantee absolute security.",
  },
  {
    title: "9. Children",
    body: "Our Services are intended for users 18 and over. We do not knowingly collect personal data from anyone under 18.",
  },
  {
    title: "10. Grievance Officer",
    body: [
      "In accordance with the DPDP Act and the Information Technology Act, 2000, the contact details of our Grievance Officer are:",
      "Name: Grievance Officer, RAKSHAK Technologies Pvt. Ltd.",
      "Email: contactus@therakshak.in",
      "Address: Delhi NCR, India",
      "We will acknowledge complaints within 48 hours and resolve them within 15 days.",
    ],
  },
  {
    title: "11. Updates",
    body: "We may update this Policy from time to time. Material changes will be notified in-app, by email, or on this page \u2014 the \u201cLast updated\u201d date will reflect the most recent revision.",
  },
];

export default function Privacy() {
  return (
    <LegalPage
      testId="privacy-page"
      eyebrow="Legal"
      title="Privacy Policy"
      updated={UPDATED}
      sections={sections}
    />
  );
}
