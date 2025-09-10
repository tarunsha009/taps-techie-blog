import { defaultSEO } from '@/lib/seo'
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../components/layout/Header'
import { ThemeProvider } from '../components/theme/ThemeProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    metadataBase: new URL('https://taps-techie-blog.vercel.app'), // Update with your domain
    title: {
        default: defaultSEO.title,
        template: '%s | TapsTechie'
    },
    description: defaultSEO.description,
    keywords: ['Python', 'Java', 'Backend Development', 'Software Engineering', 'Tech Blog'],
    authors: [{ name: 'Tarun' }],
    creator: 'Tarun',
    publisher: 'TapsTechie',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://taps-techie-blog.vercel.app',
        siteName: 'TapsTechie',
        title: defaultSEO.title,
        description: defaultSEO.description,
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'TapsTechie Blog'
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: defaultSEO.title,
        description: defaultSEO.description,
        creator: '@tarunsha009',
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png' },
        ],
        other: [
            {
                rel: 'mask-icon',
                url: '/safari-pinned-tab.svg',
            },
        ],
    },
    manifest: '/site.webmanifest',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider>
                    <Header />
                    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                        {children}
                        <Analytics />
                    </main>
                </ThemeProvider>
            </body>
        </html>
    )
}