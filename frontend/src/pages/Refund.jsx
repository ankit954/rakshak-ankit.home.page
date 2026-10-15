import React from "react";
import LegalPage from "@/components/LegalPage";
import { COMPANY, formatFullAddress } from "@/config/company";

const { freeHours, feePercent } = COMPANY.cancellation;

// Section 4 is referenced from the Shipping & Delivery Policy; keep its number.
const sections = [
  {
    title: "1. Overview",
    body: `This Cancellation & Refund Policy applies to every security-service booking made through the RAKSHAK app or website (the "Services"). "RAKSHAK", "we", "us" and "our" refer to the RAKSHAK brand, operated by the entity named on our Contact page. It explains when you can cancel, what you get back, and how and when refunds reach you. It forms part of our Terms & Conditions.`,
  },
  {
    title: "2. Cancelling a booking",
    body: [
      "You can cancel a booking in the RAKSHAK app, from the booking's details, at any time until the guard arrives and starts the shift. Before you confirm, the app shows exactly how much will be refunded.",
      "• No guard assigned yet: free. You get a full refund.",
      `• Guard assigned, and you cancel at least ${freeHours} hours before the start time: free. You get a full refund.`,
      `• Guard assigned, and you cancel less than ${freeHours} hours before the start time: ${feePercent}% of the amount you paid is kept to compensate the guard who set time aside for you. The rest is refunded.`,
      "• After the guard has arrived and the shift has started: the booking can no longer be cancelled. If something went wrong with the service, see section 4.",
      "• Bookings you chose to pay in cash after the service: no charge applies, because nothing was paid in advance.",
    ],
  },
  {
    title: "3. Cancellation by RAKSHAK or the guard",
    body: [
      "If no verified guard is available, if the address is outside our service area, or if we cannot deliver the service because of events outside our control (for example public unrest, severe weather or a government restriction), we cancel the booking and refund the full amount automatically. No fee is charged.",
      "If the assigned guard cancels, we look for another guard at no extra cost to you. If we cannot find one, the booking is cancelled and the full amount is refunded.",
    ],
  },
  {
    title: "4. Problems with the service and partial refunds",
    body: [
      `If the guard did not arrive, left before the booked end time, or the service was not delivered as booked, tell us within 48 hours from the RAKSHAK app or by email to ${COMPANY.supportEmail}, with your booking reference.`,
      "We review every claim and reply within 7 working days. If the problem is confirmed, we refund the part of the service that was not delivered, or the full amount if no service was delivered.",
    ],
  },
  {
    title: "5. How and when refunds are paid",
    body: [
      "Refunds always go back to the original payment method (UPI, debit or credit card, or net banking) through our payment partners. We do not give cash refunds for online payments.",
      "A refund is initiated as soon as the booking is cancelled, or when a service claim is approved. The money usually reaches your account within 5 to 7 working days, depending on your bank; UPI refunds are often faster.",
      "You can see the refund amount and its status on the booking in the RAKSHAK app. If it has not reached you within 7 working days, contact us with your booking reference and we will follow it up with the bank.",
    ],
  },
  {
    title: "6. What is not refunded",
    body: [
      "Completed services are not refunded, except under section 4.",
      `The cancellation charge described in section 2 (${feePercent}% of the amount paid, only when a guard is assigned and you cancel less than ${freeHours} hours before the start).`,
      "Coupon or promotional discounts are not paid out as money; only the amount you actually paid is refunded.",
    ],
  },
  {
    title: "7. Chargebacks",
    body: "Please contact us before raising a chargeback with your bank; most refund questions are resolved within a few working days. Chargebacks raised without contacting us first may delay the resolution.",
  },
  {
    title: "8. Contact",
    body: [
      `Customer support: ${COMPANY.supportEmail} · ${COMPANY.supportPhone} (${COMPANY.supportHours})`,
      `Grievance Officer: ${COMPANY.grievanceOfficer.email}`,
      `Address: ${formatFullAddress()}`,
    ],
  },
];

export default function Refund() {
  return (
    <LegalPage
      testId="refund-page"
      eyebrow="Legal"
      title="Cancellation & Refund Policy"
      updated={COMPANY.policiesUpdated}
      sections={sections}
    />
  );
}
