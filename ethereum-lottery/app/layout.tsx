import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/components/Provider"


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
      <body >
        <Providers>
  {children}
        </Providers>
      </body>
    </html>
  )
}
