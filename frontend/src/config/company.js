/**
 * Single source of truth for legal/registered company details.
 * Every legal / contact / footer surface reads from here so a change
 * in one place ripples through the whole site.
 */
export const COMPANY = {
  // Legal / registered entity
  legalName: "Pyramid Syndicate",
  brandName: "RAKSHAK",
  cin: "",
  gstin: "",

  // Registered office
  registeredAddress: {
    line1: "Unit No. O-1013, 10th Floor, EON, Plot No. 01A",
    line2: "Sector 140A",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201304",
    country: "India",
  },

  // Public support / grievance
  supportEmail: "support@therakshak.in",
  grievanceOfficer: {
    name: "Grievance Officer",
    email: "support@therakshak.in",
  },
  supportPhone: "+91 70701 31111",
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

  // Social profiles. Leave a value empty to hide its footer icon.
  social: {
    instagram: "",
    twitter: "",
    linkedin: "",
  },

  // Cancellation rules shown on the website. Keep these equal to
  // Admin → Settings (cancellation_free_hours / cancellation_fee_percent).
  cancellation: {
    freeHours: 6,
    feePercent: 25,
  },

  // Effective date of the latest legal-page revision
  policiesUpdated: "October 2026",
};

export function formatFullAddress() {
  const a = COMPANY.registeredAddress;
  return [a.line1, a.line2, `${a.city} ${a.pincode}`, `${a.state}, ${a.country}`]
    .filter(Boolean)
    .join(", ");
}
