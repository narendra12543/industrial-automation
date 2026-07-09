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
    "@type": "Product",

    name: product.name,

    description:
      product.shortDescription ??
      product.description ??
      product.name,

    image: product.images.map((image) => image.imageUrl),

    sku: product.id,

    brand: {
      "@type": "Brand",
      name: "Aven Automation",
    },

    manufacturer: {
      "@type": "Organization",
      name: "Aven Automation",
    },

    category: product.category?.name,

    url: `https://avenautomation.in/products/${product.slug}`,
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