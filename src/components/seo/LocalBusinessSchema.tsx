export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",

    "@id": "https://avenautomation.in/#business",

    name: "Aven Automation",

    image: "https://avenautomation.in/aven-logo.png",

    url: "https://avenautomation.in",

    telephone: "+91 9876543211",

    email: "sales@avenautomation.in",

    priceRange: "$$",

    address: {
      "@type": "PostalAddress",

    //   streetAddress: "Your Office Address",

      addressLocality: "Pune",

      addressRegion: "Maharashtra",

    //   postalCode: "000000",

      addressCountry: "IN",
    },

    areaServed: [
      "Pune",
      "Mumbai",
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