import { socialChannels } from "@/lib/public-channels";
// components/StructuredData.tsx

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Forge Intellitech Services Ltd",
    alternateName: "Forge",
    url: "https://forgeintellitech.com",
    logo: "https://forgeintellitech.com/images/brand/forge-wordmark.png",
    description:
      "We build technology solutions rooted in African realities. From education to fintech, we create products that understand and serve our continent.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressRegion: "Lagos State",
      addressCountry: "NG",
    },
    sameAs: socialChannels.filter((s) => s.url).map((s) => s.url),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@forgeintellitech.com",
      availableLanguage: ["English"],
    },
    areaServed: {
      "@type": "Place",
      name: "Africa",
    },
    knowsAbout: [
      "Technology",
      "Education",
      "Software Development",
      "Fintech",
      "Digital Skills Training",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Forge Intellitech",
    alternateName: "Forge ITS",
    url: "https://forgeintellitech.com",
    description: "Technology Built for Africa",
    publisher: {
      "@type": "Organization",
      name: "Forge Intellitech",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Forge Intellitech",
    image: "https://forgeintellitech.com/images/og-image.png",
    url: "https://forgeintellitech.com",
    telephone: "",
    email: "info@forgeintellitech.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressRegion: "Lagos State",
      addressCountry: "NG",
    },
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-18:00",
    serviceType: [
      "Technology Solutions",
      "Software Development",
      "Digital Skills Training",
      "Educational Technology",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// For product pages like TechUp, LaunchPad
export function ProductSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description,
    url: url,
    brand: {
      "@type": "Brand",
      name: "Forge Intellitech",
    },
    provider: {
      "@type": "Organization",
      name: "Forge Intellitech",
      url: "https://forgeintellitech.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// For FAQ sections
export function FAQSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// For breadcrumbs
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
