import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
    metadataBase: new URL('https://saasheaven.space'),
    title: "SaaS Heaven - Where Discontinued SaaS Lives On",
    description:
        "A living archive of failed SaaS. Learn from real post-mortems with stats, stories, lessons, and source code.",
    openGraph: {
        title: "SaaS Heaven",
        description:
            "A living archive of failed SaaS. Learn from real post-mortems with stats, stories, lessons, and source code.",
        url: "https://saasheaven.space",
        siteName: "SaaS Heaven",
        images: [
            {
                url: "/og.png",
                width: 1200,
                height: 630,
                alt: "SaaS Heaven preview",
            },
        ],
        locale: "en_GB",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "SaaS Heaven",
        description:
            "A living archive of failed SaaS. Learn from real post-mortems with stats, stories, lessons, and source code.",
        images: ["/og.png"],
    },
    icons: {
        icon: [
            {
                url: "/logo.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/logo.png",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/icon.svg",
                type: "image/svg+xml",
            },
        ],
        apple: "/logo.png",
    },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-28QC2761L0" />
        <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-28QC2761L0');
        `}
        </Script>
      </body>
    </html>
  )
}
