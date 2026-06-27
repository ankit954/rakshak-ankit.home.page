import React from "react";
import LegalPage from "@/components/LegalPage";

const UPDATED = "December 2025";

const sections = [
  {
    title: "1. Agreement",
    body: "These Terms of Service (\u201cTerms\u201d) govern your access to and use of the RAKSHAK platform, websites and mobile applications operated by RAKSHAK Technologies Pvt. Ltd. (\u201cRAKSHAK\u201d). By creating an account, booking a service or otherwise using the Services, you agree to be bound by these Terms.",
  },
  {
    title: "2. Eligibility",
    body: "You must be at least 18 years of age and legally capable of entering into a binding contract under Indian law. You agree to provide accurate information during signup, KYC and booking, and to keep your account credentials secure.",
  },
  {
    title: "3. Nature of the Services",
    body: [
      "RAKSHAK is a technology platform that connects customers with independent, police-verified security professionals (\u201cGuards\u201d). Guards are not employees of RAKSHAK; they engage with customers through the platform under our policies and applicable PSARA regulations.",
      "RAKSHAK is not a replacement for police, fire or medical emergency services. In a life-threatening situation, dial 112 first.",
    ],
  },
  {
    title: "4. Bookings, pricing & payments",
    body: [
      "Indicative pricing is shown in the app before confirmation. The final amount may include base fare, time-based charges, transport surcharges and applicable taxes (GST).",
      "Payments are processed by RBI-authorised partners via UPI, cards or cash (where supported). RAKSHAK does not store card or UPI credentials.",
      "Invoices, receipts and booking history are available in-app.",
    ],
  },
  {
    title: "5. Cancellation & refunds",
    body: [
      "Customer-initiated cancellation more than 2 hours before the scheduled start \u2014 free of charge.",
      "Cancellation within the 2-hour window \u2014 25% of the booking value as a guard-compensation fee.",
      "Service deficiency or no-show \u2014 contact support within 48 hours; refunds processed within 5\u20137 working days to the original payment instrument.",
    ],
  },
  {
    title: "6. Conduct & safety",
    body: [
      "Both customers and Guards must behave lawfully, respectfully and within the bounds of professional conduct.",
      "Harassment, assault, illegal activity, weapons handling outside the scope of the engagement, intoxication on duty, and discrimination are strictly prohibited.",
      "RAKSHAK reserves the right to suspend or terminate any account for violation of these Terms or applicable law, without prior notice.",
    ],
  },
  {
    title: "7. Guard onboarding & verification",
    body: "All Guards must complete Aadhaar-based KYC, police-verification and (where applicable) hold valid PSARA training certification. RAKSHAK periodically re-verifies credentials and may temporarily deactivate Guards whose verifications are pending or expired.",
  },
  {
    title: "8. Intellectual property",
    body: "The RAKSHAK name, logo, design, content and platform are owned by RAKSHAK and protected by Indian and international intellectual-property laws. You may not copy, modify, distribute or reverse-engineer any part of the Services without our prior written consent.",
  },
  {
    title: "9. Disclaimers & limitation of liability",
    body: [
      "The Services are provided on an \u201cas-is\u201d and \u201cas-available\u201d basis. While we work hard to verify Guards and ensure service quality, we do not warrant that the Services will be uninterrupted, error-free or meet your specific requirements.",
      "To the maximum extent permitted by law, RAKSHAK\u2019s aggregate liability arising from or relating to the Services is limited to the amounts you paid to RAKSHAK in the 12 months preceding the claim.",
    ],
  },
  {
    title: "10. Governing law & jurisdiction",
    body: "These Terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the competent courts at New Delhi.",
  },
  {
    title: "11. Changes",
    body: "We may update these Terms from time to time. Material updates will be notified in-app or by email. Continued use of the Services after such updates constitutes acceptance of the revised Terms.",
  },
  {
    title: "12. Contact",
    body: "Questions about these Terms can be sent to contactus@therakshak.in.",
  },
];

export default function Terms() {
  return (
    <LegalPage
      testId="terms-page"
      eyebrow="Legal"
      title="Terms of Service"
      updated={UPDATED}
      sections={sections}
    />
  );
}
