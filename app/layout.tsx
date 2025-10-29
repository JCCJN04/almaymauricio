import type React from "react"
import type { Metadata } from "next"
import { Cinzel, Lora, Raleway } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Invitación Digital Elegante",
  description: "Invitación digital personalizada para eventos especiales",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${cinzel.variable} ${lora.variable} ${raleway.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
