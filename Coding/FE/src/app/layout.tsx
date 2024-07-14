import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Providers } from "@/lib/redux/provider";



export const metadata: Metadata = {
  title: "Pet Spa",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body>
          <Providers>
            <NextUIProvider>
              {children}
            </NextUIProvider>
          </Providers>


        </body>
      </html>

    </>


  );
}
