// Central brand configuration for Amrita Dairy & Products
// Easily change brand name, tagline, contacts, and delivery settings from this single file

export const brand = {
  name: "Amrita Dairy & Products",
  shortName: "Amrita Dairy",
  tagline: "Amrit Jaisi Shuddhata, Har Subah Aapke Ghar",
  englishTagline: "Pure. Fresh. Delivered.",
  shortDescription: "Pure, Vedic and 100% farm-fresh milk, A2 ghee, paneer, and curd delivered to your doorstep every morning.",
  phone: "+91 98765 43210",
  altPhone: "+91 91234 56789",
  email: "support@amritadairy.com",
  salesEmail: "orders@amritadairy.com",
  address: "Plot 42, Amrita Dairy Farm Hub, Sector 5, Gomti Nagar, Lucknow, Uttar Pradesh - 226010",
  currency: "₹",
  currencySymbol: "₹",
  operatingHours: "5:00 AM – 9:00 PM (Daily)",
  deliverySlots: [
    { id: "morning", label: "Early Morning (5:30 AM - 7:30 AM)", default: true },
    { id: "noon", label: "Mid Day (11:00 AM - 1:00 PM)", default: false },
    { id: "evening", label: "Evening (5:30 PM - 7:30 PM)", default: false }
  ],
  freeDeliveryThreshold: 299,
  defaultDeliveryFee: 30,
  taxRatePercent: 0, // Fresh unprocessed dairy is exempt in India
  socialLinks: {
    whatsapp: "https://wa.me/919876543210",
    instagram: "https://instagram.com/amritadairy_official",
    facebook: "https://facebook.com/amritadairy_official",
    twitter: "https://twitter.com/amritadairy"
  }
};

export default brand;
