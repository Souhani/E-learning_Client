'use client'
import './globals.css'
import { Poppins, Josefin_Sans } from "next/font/google";
import { ThemeProvider } from './utils/theme-provider';
import { Providers } from './Provider';
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast';
import LoadPage from './components/Loader/LoadPage';
import { useEffect } from 'react';
import socketID from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketID(ENDPOINT, { transports: ["websocket"]});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins"
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin"
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    socketId.on("connection", () => {});
  },[])
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.variable} ${josefin.variable} min-h-screen bg-no-repeat h-full bg-white dark:bg-gradient-to-b dark:from-[#161625] dark:to-[#161625]  duration-100`}>
        <SessionProvider>
          <Providers>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              <LoadPage>
                { children }
              </LoadPage>
            <Toaster position="top-center"
                    reverseOrder={false}/>
            </ThemeProvider>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
};


