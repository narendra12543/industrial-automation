export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",

    "@id": "https://avenautomation.in/#localbusiness",

    name: "Aven Automation",

    alternateName: "Aven Automation Pune",

    url: "https://avenautomation.in",

    image: "https://avenautomation.in/aven-logo.png",

    logo: "https://avenautomation.in/aven-logo.png",

    telephone: "+91 8956614106",

    email: "sales@avenautomation.in",

    priceRange: "$$",

    description:
      "Aven Automation is a leading Industrial Automation and Industrial Entrance Automation company providing Automatic Sliding Gates, Swing Gates, High Speed Doors, Industrial Doors, Rolling Shutters, Boom Barriers, Dock Levelers, Dock Shelters, Conveyor Systems and Material Handling Equipment across Pune, Maharashtra and India.",

    address: {
      "@type": "PostalAddress",
      streetAddress: "Chikhali",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411062",
      addressCountry: "IN",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: "18.6730",   // Replace with your exact office latitude
      longitude: "73.8008",  // Replace with your exact office longitude
    },

    areaServed: [
      "Pune",
      "Pimpri Chinchwad",
      "Chakan",
      "Hinjawadi",
      "Talegaon",
      "Mumbai",
      "Nashik",
      "Kolhapur",
      "Nagpur",
      "Aurangabad",
      "Maharashtra",
      "India",
    ],

    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],

    knowsAbout: [
      "Industrial Automation",
      "Industrial Entrance Automation",
      "Automatic Sliding Gates",
      "Automatic Swing Gates",
      "Industrial Doors",
      "High Speed Doors",
      "Rolling Shutters",
      "Boom Barriers",
      "Automatic Bollards",
      "Dock Levelers",
      "Dock Shelters",
      "Conveyor Systems",
      "Roller Bed Conveyor",
      "Flat Belt Conveyor",
      "Modular Belt Conveyor",
      "Cleated Belt Conveyor",
      "Curved Belt Conveyor",
      "Incline Belt Conveyor",
      "Material Handling Equipment",
    ],

    sameAs: [
      "https://www.linkedin.com/company/your-company",
      "https://www.facebook.com/your-page",
      "https://www.instagram.com/your-page",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}