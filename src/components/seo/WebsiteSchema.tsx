export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",

    name: "Aven Automation",

    url: "https://avenautomation.in",

    inLanguage: "en-IN",

    publisher: {
      "@type": "Organization",
      name: "Aven Automation",
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