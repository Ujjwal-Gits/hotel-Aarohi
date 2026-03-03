import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogType?: string;
    ogImage?: string;
    twitterHandle?: string;
    schema?: any; // Structured Data (JSON-LD)
}

const SEO: React.FC<SEOProps> = ({
    title = 'Aarohi - Premium Hotel Experience',
    description = 'Experience the best hotel stays with Aarohi. Luxury, comfort, and personalized service at your fingertips.',
    canonical = 'https://aarohi-hotels.com',
    ogType = 'website',
    ogImage = '/assets/images/og-default.jpg',
    twitterHandle = '@aarohi_hotels',
    schema,
}) => {
    const siteName = 'Aarohi';
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph Tags (Facebook, LinkedIn, etc.) */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

            {/* Mobile App Meta Tags (optional but pro) */}
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            <meta name="theme-color" content="#4f46e5" />

            {/* JSON-LD Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
