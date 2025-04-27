import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/components/Provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ether Lottery",
  description: "An Ethereum Lottery dApp",
   
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
