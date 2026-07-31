import React from "react";
import LegalPage from "@/components/LegalPage";
import { COMPANY, formatFullAddress } from "@/config/company";

const sections = [
  {
    title: "1. Overview",
    body: `This Refund & Cancellation Policy governs cancellations of, and refunds for, personal-security bookings made through the RAKSHAK platform (the "Services"). "RAKSHAK", "we", "us" and "our" refer to the RAKSHAK brand, operated by the entity identified on our Contact page. By making a booking you agree to the terms below in addition to our Terms of Service.`,
  },
  {
    title: "2. Cancellation by the customer",
    body: [
      "You may cancel a booking at any time from within the RAKSHAK app. The applicable charge depends on how close to the scheduled start time you cancel:",
      "• Free cancellation — more than 2 hours before the scheduled start: full refund of the amount paid, no charge.",
      "• Late cancellation — within 2 hours of the scheduled start (but before a guard has been assigned): 15% of the booking value is charged as an operations fee; the balance is refunded.",
      "• Very late cancellation — within 2 hours of the scheduled start AND after a guard has been assigned: 25% of the booking value is charged as a guard-compensation fee; the balance is refunded.",
      "• After service has started — no cancellation is possible once the guard has verified the start OTP. If the service is interrupted due to a fault attributable to RAKSHAK or the guard, please contact support so we can raise a service-deficiency claim (section 4).",
    ],
  },
  {
    title: "3. Cancellation by RAKSHAK",
    body: [
      "In rare cases, RAKSHAK may need to cancel a booking — for example when no verified guard is available in your area, when the address falls outside our current service area, or in an event of force majeure (public unrest, weather emergency, government restriction).",
      "Where RAKSHAK cancels a booking, the entire booking value is refunded automatically to the original payment source. No cancellation fee is charged in this case.",
    ],
  },
  {
    title: "4. Service deficiency & partial refunds",
    body: [
      "If the guard fails to arrive within 30 minutes of the confirmed arrival time (guard no-show), you are entitled to a full refund and a service credit at our discretion. Contact support within 24 hours of the incident.",
      "If the assigned guard leaves the shift before the booked end time without a valid reason, the unused portion of the shift is refunded on a pro-rata basis.",
      "For any other genuine service-deficiency claim, please email the details to " +
        COMPANY.supportEmail +
        " within 48 hours. We investigate every claim and communicate the outcome — full refund, partial refund or credit — within 7 business days.",
    ],
  },
  {
    title: "5. Refund method & timelines",
    body: [
      "All eligible refunds are processed to the ORIGINAL payment method used at the time of booking. RAKSHAK does not offer cash refunds against digital payments.",
      "Typical timelines from the date the refund is initiated:",
      "• UPI / RAKSHAK-wallet: instant to 24 hours.",
      "• Debit / Credit cards: 5 – 7 business days depending on the issuing bank.",
      "• Net-banking: 3 – 5 business days.",
      "You will receive a confirmation notification once the refund is initiated. The Reference / ARN number is available in the app under Bookings → Refund status.",
    ],
  },
  {
    title: "6. How to request a refund",
    body: [
      "Most refunds are triggered automatically. Where a manual request is required (e.g. service-deficiency claim), please raise it via:",
      "• In-app: Bookings → the booking in question → Report an issue → Request a refund.",
      "• Email: " + COMPANY.supportEmail + " with subject line “Refund request — <booking reference>”.",
      "Include your registered mobile number, the booking reference and a short description of the issue. Photos or screenshots help us resolve faster.",
    ],
  },
  {
    title: "7. Non-refundable items",
    body: [
      "Referral bonuses, promotional credits, RAKSHAK-wallet top-ups and any amount already redeemed against a completed booking are non-refundable.",
      "Convenience fees or gateway fees (if disclosed separately at checkout) may be non-refundable — this is stated on the fare screen before payment.",
    ],
  },
  {
    title: "8. Chargebacks",
    body: `Before initiating a chargeback with your bank, please raise a refund request with us — we resolve the vast majority of issues within a few business days. Unwarranted chargebacks may lead to suspension of your RAKSHAK account until the dispute is resolved.`,
  },
  {
    title: "9. Contact for refund escalations",
    body: [
      `Grievance Officer, ${COMPANY.brandName}`,
      `Email: ${COMPANY.grievanceOfficer.email}`,
      `Address: ${formatFullAddress()}`,
      `Business hours: ${COMPANY.supportHours}`,
    ],
  },
];

export default function Refund() {
  return (
    <LegalPage
      testId="refund-page"
      eyebrow="Legal"
      title="Refund & Cancellation Policy"
      updated={COMPANY.policiesUpdated}
      sections={sections}
    />
  );
}
