export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",

    "@id": "https://avenautomation.in/#localbusiness",

    name: "Aven Automation",

    alternateName: [
      "Aven Industrial Automation",
      "Aven Automation",
    ],
    

    url: "https://avenautomation.in",

    image: "https://avenautomation.in/aven-logo.png",

    logo: "https://avenautomation.in/aven-logo.png",

    telephone: "+91 8766918892",

    email: "sales@avenautomation.in",

    priceRange: "$$",

    description:
      "Aven Automation is a leading Industrial Automation and Industrial Entrance Automation company providing Automatic Sliding Gates, Swing Gates, High Speed Doors, Industrial Doors, Rolling Shutters, Boom Barriers, Dock Levelers, Dock Shelters, Conveyor Systems and Material Handling Equipment across Pune, Maharashtra and India.",

    slogan:
    "Industrial Automation & Industrial Entrance Automation Solutions",

    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Office No-03, Near Akurdi Railway Station Road, Gurudwara Colony, Nigdi",
      addressLocality: "Pimpri-Chinchwad",
      addressRegion: "Maharashtra",
      postalCode: "411035",
      addressCountry: "IN",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: "18.646617",
      longitude: "73.764662",
    },

    areaServed: [
      "Pune",
      "Pimpri-Chinchwad",
      "Nigdi",
      "Akurdi",
      "Chinchwad",
      "Ravet",
      "Wakad",
      "Hinjawadi",
      "Moshi",
      "Bhosari",
      "Chakan",
      "Talegaon",
      "Kharadi",
      "Baner",
      "Balewadi",
      "Hadapsar",
      "Mumbai",
      "Nashik",
      "Kolhapur",
      "Aurangabad",
      "Nagpur",
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

    paymentAccepted: [
      "Cash",
      "UPI",
      "Bank Transfer",
    ],

    currenciesAccepted: "INR",

    foundingLocation: {
      "@type": "Place",
      name: "Pune, Maharashtra, India",
    },

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
      "Automatic Garage Doors",
      "Automatic Gates",
      "Industrial Automation Solutions",
      "Industrial Entrance Automation",
      "Gate Automation",
      "Warehouse Automation",
      "Factory Automation",
      "Access Control System",
      "Parking Management System",
      "Loading Bay Equipment",
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