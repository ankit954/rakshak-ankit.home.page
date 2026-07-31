import React from "react";
import LegalPage from "@/components/LegalPage";
import { COMPANY, formatFullAddress } from "@/config/company";

const sections = [
  {
    title: "1. Purpose",
    body: `This Service Delivery Policy explains how ${COMPANY.legalName} ("RAKSHAK") facilitates the delivery of personal-security services booked through the RAKSHAK mobile application. Because RAKSHAK is a service — not a physical good — this policy is the equivalent of a shipping / delivery policy for on-ground service delivery.`,
  },
  {
    title: "2. Platform role",
    body: [
      "RAKSHAK operates a technology platform that connects customers with independent, verified security professionals (\u201cGuards\u201d). Guards are independent service providers, not employees of RAKSHAK.",
      "RAKSHAK facilitates discovery, booking, scheduling, communication and payment. The security service itself is delivered on the ground by the assigned Guard. This policy therefore describes how a facilitated booking is fulfilled, and does not make RAKSHAK the direct provider of the security service. Your rights under applicable Indian consumer law are unaffected.",
    ],
  },
  {
    title: "3. What is being delivered",
    body: [
      "A police-verified, Aadhaar-KYC private-security professional (“Guard”) attends the customer at the location, on the date and for the duration specified in the booking. The service may include, depending on the category selected:",
      "• Static or roving deterrence in uniform.",
      "• Personal companionship / discreet protection (including trained female personnel).",
      "• Event / crowd management (bouncer detail).",
      "• Guard + driver combination for door-to-door protected transit.",
      "The Guard does not carry firearms or use force other than that which is lawfully permitted for licensed private-security personnel under the applicable Indian regulations, including the PSARA framework.",
    ],
  },
  {
    title: "4. Service areas",
    body: [
      `RAKSHAK currently delivers services in the ${COMPANY.serviceRegion}:`,
      "• " + COMPANY.serviceCities.join(", ") + ".",
      "Additional cities are announced in-app and on our website as they go live. Bookings for addresses outside a live city are not accepted and, if inadvertently placed, are cancelled with a full refund.",
    ],
  },
  {
    title: "5. Confirmation & assignment",
    body: [
      "Once payment is successfully processed, the booking is CONFIRMED. You will receive an in-app notification, an SMS and a booking receipt.",
      "For on-demand bookings, a verified Guard is typically assigned within 15 minutes in serviceable areas. For scheduled bookings, the assigned Guard’s profile (name, photo, category, rating) is shown in the app up to 24 hours before the scheduled start.",
      "If a suitable verified Guard cannot be assigned within the promised window, the booking is auto-cancelled and the full amount is refunded to the original payment source under our Refund & Cancellation Policy.",
    ],
  },
  {
    title: "6. Arrival & OTP-verified start",
    body: [
      "The assigned Guard travels to the booked location so as to arrive at or before the scheduled start time. You can track the Guard’s live location on the app map and share a public trip-link with family or friends.",
      "On arrival, the Guard requests a Start OTP that you enter in your app. Only upon successful OTP verification does the shift clock begin — this ensures you are never billed for time before service actually starts.",
      "For late arrivals attributable to the Guard, please refer to section 4 of the Refund & Cancellation Policy (service-deficiency claims).",
    ],
  },
  {
    title: "7. During the shift",
    body: [
      "The Guard remains on duty for the entire booked duration and follows any lawful instructions consistent with the booked service category.",
      "You can tap SOS in the app at any time to alert the RAKSHAK operations team, share live location with emergency contacts and — where required — escalate to law enforcement. In any life-threatening situation always dial 112 first.",
      "Live tracking, in-app chat with the RAKSHAK ops team, and the shareable trip link stay active for the full duration of the shift.",
    ],
  },
  {
    title: "8. Completion & OTP-verified end",
    body: [
      "When the shift ends, the Guard requests an End OTP that you enter in your app. This closes the booking, generates a GST invoice, releases any temporary hold on your payment and enables rating.",
      "For hourly extensions past the originally booked duration, the customer approves the extension in-app and the incremental fare is charged transparently.",
    ],
  },
  {
    title: "9. Failure / interruption of service",
    body: [
      "If service delivery is interrupted due to reasons attributable to RAKSHAK or the Guard, please contact " +
        COMPANY.supportEmail +
        " immediately. Depending on the circumstances, remedies include:",
      "• Continuation of service by a replacement Guard where feasible.",
      "• Pro-rata refund of the unused portion of the shift.",
      "• Full refund + a discretionary service credit for material service deficiency.",
      "All such claims are governed by section 4 of the Refund & Cancellation Policy.",
    ],
  },
  {
    title: "10. Force majeure",
    body: `Where RAKSHAK is unable to deliver service due to events outside its reasonable control — including natural disasters, public unrest, government-imposed restrictions or communication-network failure — bookings are cancelled with a full refund; no consequential damages are payable.`,
  },
  {
    title: "11. Contact",
    body: [
      `${COMPANY.legalName}`,
      formatFullAddress(),
      `Support: ${COMPANY.supportEmail} · ${COMPANY.supportPhone}`,
      `Business hours: ${COMPANY.supportHours}`,
    ],
  },
];

export default function ServiceDelivery() {
  return (
    <LegalPage
      testId="service-delivery-page"
      eyebrow="Legal"
      title="Service Delivery Policy"
      updated={COMPANY.policiesUpdated}
      sections={sections}
    />
  );
}
