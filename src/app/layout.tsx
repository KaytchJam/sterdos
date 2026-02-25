import './globals.css';
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: "Sterdos",
  description: "Mobility score calculator",
  keywords: "Sterdos, Bus, METRO, Houston, Transit, 15 minute, 15 minute bus, bus nearby, bus close to me, bus app, transit score"
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({ children, }: {children: React.ReactNode}) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}
