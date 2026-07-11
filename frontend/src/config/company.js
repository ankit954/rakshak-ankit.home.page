/**
 * Single source of truth for legal/registered company details.
 * Payment gateway reviewers (BillDesk / Razorpay / etc.) check that
 * the SAME entity name, address, email and phone appear consistently
 * across Contact / Privacy / Terms / Refund / Service Delivery pages.
 *
 * ⚠️ Replace the placeholder values below with the final registered
 * company details BEFORE submitting for gateway approval. All pages
 * update automatically.
 */
export const COMPANY = {
  // Legal / registered entity
  legalName: "RAKSHAK Technologies Private Limited",
  brandName: "RAKSHAK",
  // If you have a CIN / GSTIN, drop them here — reviewers appreciate the
  // extra proof of legitimacy. Leave "" if you don't yet.
  cin: "",
  gstin: "",

  // Registered office address (put the address on your Certificate of Incorporation)
  registeredAddress: {
    line1: "[Registered Office Address, Line 1]",
    line2: "[Line 2 / Landmark]",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    country: "India",
  },

  // Public support / grievance
  supportEmail: "contactus@therakshak.in",
  grievanceOfficer: {
    name: "Grievance Officer",
    email: "contactus@therakshak.in",
  },
  supportPhone: "+91-XXXXXXXXXX", // replace before submission
  supportHours: "Mon – Sat, 9:00 – 21:00 IST",

  // Regions currently live
  serviceCities: [
    "Delhi",
    "Gurugram",
    "Noida",
    "Ghaziabad",
    "Faridabad",
  ],
  serviceRegion: "Delhi NCR",

  // Web
  site: "https://therakshak.in",
  adminSite: "https://admin.therakshak.in",

  // Effective date of the latest legal-page revision (bump when you edit)
  policiesUpdated: "December 2025",
};

export function formatFullAddress() {
  const a = COMPANY.registeredAddress;
  return [a.line1, a.line2, `${a.city} ${a.pincode}`, `${a.state}, ${a.country}`]
    .filter(Boolean)
    .join(", ");
}
