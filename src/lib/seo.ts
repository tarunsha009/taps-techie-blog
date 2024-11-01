export interface SEOConfig {
    title: string;
    description: string;
    canonical?: string;
    openGraph?: {
      title?: string;
      description?: string;
      type?: string;
      image?: string;
    };
    twitter?: {
      card?: string;
      site?: string;
      creator?: string;
    };
  }
  
  export const defaultSEO: SEOConfig = {
    title: "TapsTechie - Tech Blog",
    description: "Senior Software Engineer sharing insights on Python, Java, and backend development",
    openGraph: {
      type: 'website',
      title: 'TapsTechie - Tech Blog',
      description: 'Senior Software Engineer sharing insights on Python, Java, and backend development',
      image: '/og-image.png', // You'll need to create this image
    },
    twitter: {
      card: 'summary_large_image',
      site: '@tarunsha009', // Update with your Twitter handle
      creator: '@tarunsha009'
    }
  };