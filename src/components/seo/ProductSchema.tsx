interface ProductSchemaProps {
  product: {
    id: string;
    name: string;
    slug: string;
    shortDescription?: string | null;
    description?: string | null;
    images: {
      imageUrl: string;
    }[];
    category?: {
      name: string;
    } | null;
  };
}

export default function ProductSchema({
  product,
}: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "Organization",
        "@id": `https://avenautomation.in/products/${product.slug}#product`,
        

        name: "Aven Automation",

        sku: product.id,
        mpn: product.id,

        url: "https://avenautomation.in",

        keywords: [
          product.name,
          product.category?.name,
          "Industrial Automation",
          "Aven Automation",
        ],

        isRelatedTo: {
          "@id": "https://avenautomation.in/#organization",
        },

        logo: "https://avenautomation.in/logo.png",
      },

      {
        "@type": "Product",

        name: product.name,

        description:
          product.shortDescription ??
          product.description ??
          product.name,

        image: product.images.map((img) => img.imageUrl),

        brand: {
          "@type": "Brand",
          name: "Aven Automation",
        },

        manufacturer: {
          "@id": `https://avenautomation.in/products/${product.slug}#product`, 
        },

        category: product.category?.name,

        url: `https://avenautomation.in/products/${product.slug}`,

        keywords: [
          product.name,
          product.category?.name,
          "Industrial Automation",
          "Aven Automation",
        ],

        isRelatedTo: {
          "@id": "https://avenautomation.in/#organization",
        },

        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Business Type",
            value: "Manufacturer",
          },
          {
            "@type": "PropertyValue",
            name: "Supply",
            value: "Pan India",
          },

          {
            "@type": "PropertyValue",
            name: "Country of Origin",
            value: "India",
          },
          {
            "@type": "PropertyValue",
            name: "Application",
            value: "Industrial Automation",
          },

          {
            "@type": "PropertyValue",
            name: "Country of Origin",
            value: "India",
          },
          {
            "@type": "PropertyValue",
            name: "Application",
            value: "Industrial Automation",
          },
        ],
      }
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