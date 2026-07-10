interface Props {
  productName: string;
}

export default function ProductFAQSchema({
  productName,
}: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${productName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${productName} is a premium industrial entrance automation solution offered by Aven Automation.`,
        },
      },
      {
        "@type": "Question",
        name: `Where is ${productName} used?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${productName} is suitable for residential, commercial and industrial applications.`,
        },
      },
      {
        "@type": "Question",
        name: `Can Aven Automation customize ${productName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Aven Automation provides customized solutions based on project requirements.`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}