export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",

    "@id": "https://avenautomation.in/#website",

    name: "Aven Automation",

    alternateName: [
      "Aven Industrial Automation",
      "Aven Automation",
    ],

    url: "https://avenautomation.in",

    description:
      "Aven Automation is a leading Industrial Automation and Industrial Entrance Automation company providing Automatic Gates, Industrial Doors, High Speed Doors, Boom Barriers, Dock Levelers, Dock Shelters, Conveyor Systems and Material Handling Equipment.",
    about: [
      "Industrial Automation",
      "Industrial Entrance Automation",
      "Automatic Gates",
      "Industrial Doors",
      "High Speed Doors",
      "Boom Barriers",
      "Dock Levelers",
      "Conveyor Systems",
    ],

    inLanguage: "en-IN",

    publisher: {
      "@type": "Organization",
      "@id": "https://avenautomation.in/#organization",
      name: "Aven Automation",
      url: "https://avenautomation.in",
      logo: {
        "@type": "ImageObject",
        url: "https://avenautomation.in/aven-logo.png",
      },
    },

    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://avenautomation.in/products?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
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