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
        "@id": "https://avenautomation.in/#organization",

        name: "Aven Automation",

        url: "https://avenautomation.in",

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
          "@id": "https://avenautomation.in/#organization",
        },

        category: product.category?.name,

        url: `https://avenautomation.in/products/${product.slug}`,

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