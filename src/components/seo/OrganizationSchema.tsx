interface OrganizationSchemaProps {
  url: string;
  logo: string;
}

export default function OrganizationSchema({
  url,
  logo,
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": `${url}#organization`,

    name: "Aven Automation",

    alternateName: [
      "Aven Automation Pune",
      "Aven Industrial Automation",
    ],

    url,

    logo,

    image: logo,

    description:
      "Aven Automation is a leading manufacturer and supplier of Industrial Entrance Automation Systems including Automatic Sliding Gates, Swing Gates, High Speed Doors, Rolling Shutters, Boom Barriers, Dock Levelers, Dock Shelters, Hangar Doors and Industrial Automation Solutions across India.",

    email: "sales@avenautomation.in",

    telephone: "+91 8956614106",

    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Gat No.73, Dehu-Alandi Road, Chikhali",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411062",
      addressCountry: "IN",
    },

    areaServed: {
      "@type": "Country",
      name: "India",
    },

    knowsAbout: [
      // Industrial Entrance Automation
      "Industrial Entrance Automation",
      "Automatic Gates",
      "Automatic Sliding Gates",
      "Automatic Swing Gates",
      "Telescopic Sliding Gates",
      "Cantilever Sliding Gates",
      "Industrial Gates",
      "Gate Automation",
      "Gate Automation Systems",

      // Industrial Doors
      "Industrial Doors",
      "High Speed Doors",
      "High Speed Roll Up Doors",
      "Clean Room Doors",
      "Anti Crash Doors",
      "Sectional Overhead Doors",
      "Transparent Sectional Doors",
      "Garage Doors",
      "Rolling Shutters",
      "Industrial Rolling Shutters",
      "Fire Rated Doors",
      "Fire Shutters",
      "Hangar Doors",
      "Steel Hangar Doors",
      "Fold Up Hangar Doors",

      // Loading Bay Equipment
      "Dock Levelers",
      "Dock Shelters",
      "Dock Seals",
      "Loading Bay Equipment",
      "Loading Dock Solutions",

      // Parking Automation
      "Boom Barriers",
      "Advertising Boom Barriers",
      "Folding Boom Barriers",
      "Automatic Bollards",
      "Hydraulic Bollards",
      "Road Blockers",
      "Tyre Killers",
      "Parking Management Systems",
      "Access Control Systems",
      "RFID Access Systems",
      "Vehicle Access Control",

      // Pedestrian Access
      "Swing Barriers",
      "Flap Barriers",
      "Tripod Turnstiles",
      "Full Height Turnstiles",
      "Speed Gates",

      // Conveyor Systems
      "Industrial Conveyor Systems",
      "Material Handling Systems",

      "Roller Conveyor",
      "Powered Roller Conveyor",
      "Gravity Roller Conveyor",
      "Roller Bed Conveyor",

      "Flat Belt Conveyor",
      "Belt Conveyor",

      "Modular Belt Conveyor",
      "Plastic Modular Conveyor",

      "Cleated Belt Conveyor",

      "Curved Belt Conveyor",

      "Incline Belt Conveyor",
      "Decline Belt Conveyor",

      "Sanitary Conveyor",
      "Wash Down Conveyor",

      "Specialty Conveyor",

      "Slat Conveyor",
      "Chain Conveyor",
      "Mesh Belt Conveyor",
      "Wire Mesh Conveyor",
      "Overhead Conveyor",
      "Spiral Conveyor",
      "Pallet Conveyor",
      "Assembly Line Conveyor",
      "Packing Conveyor",
      "Packaging Conveyor",
      "Loading Conveyor",
      "Unloading Conveyor",

      // Material Handling
      "Material Handling Equipment",
      "Industrial Automation",
      "Factory Automation",
      "Warehouse Automation",
      "Warehouse Conveyor",
      "Production Line Automation",

      // Industries
      "Food Processing Equipment",
      "Pharmaceutical Equipment",
      "Automotive Industry Solutions",
      "Warehouse Solutions",
      "Logistics Automation",
      "Manufacturing Automation",

      // Services
      "Industrial Automation Installation",
      "Industrial Automation Maintenance",
      "Industrial Automation Service",
      "Industrial Automation Repair",
      "Annual Maintenance Contract",
      "Automation Consulting",

      // Brand
      "Aven Automation",
      "Aven Automation Pune Maharashtra",
      "Aven Automation Maharashtra",
      "Aven Automation India",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91 8956614106",
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: [
          "English",
          "Hindi",
          "Marathi",
        ],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91 7757968171",
        contactType: "customer support",
        areaServed: "IN",
      },
    ],

    sameAs: [
      "https://www.linkedin.com/company/your-company",
      "https://www.facebook.com/your-page",
      "https://www.instagram.com/your-page",
      "https://maps.google.com/?cid=YOUR_GOOGLE_BUSINESS_ID",
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