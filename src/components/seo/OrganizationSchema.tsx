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

    name: "Aven Automation",

    url,

    logo,

    email: "sales@avenautomation.in",

    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91 7057748540",
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: [
          "English",
          "Hindi",
          "Marathi",
        ],
      },
    ],

    // sameAs: [
    //   "https://www.linkedin.com/company/aven-automation",
    //   "https://www.facebook.com/..."
    // ],
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