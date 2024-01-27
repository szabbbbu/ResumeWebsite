import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'
import CanvasLayerClient from '@/components/CanvasLayerSystem/CanvasLayerClient'
import AppContextProvider from '@/contexts/AppContextProvider'
import IsosurfaceLayer from '@/components/CanvasLayerSystem/IsosurfaceLayer'
import { memo } from 'react'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Robert Szabo | Web Developer',
  description: 'web development services',
}

function RT({
  children,
}: {
  children: React.ReactNode
}) {
  console.log("rendering layout")
  // grid grid-rows-1 grid-cols-[0.8fr,2fr]
  return (
    <html lang="en">
      <body
        className="flex h-[100vh] w-[100vw]"
      >
        <AppContextProvider>
          <Header />
          <CanvasLayerClient />
          <IsosurfaceLayer />
          {/* <CanvasLayerClientDebug /> */}
        <main className="h-[100%] justify-start lg:w-[100%] md:w-[100%] md:flex lg:flex xl:flex 2xl:flex flex-col sm:hidden xs:hidden">
          {children}
        </main>
        <main className="z-[0] xs:flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden absolute inset-0 w-[100vw] h-[100vh] overflow-scroll">
          {children}
        </main>
        </AppContextProvider>
      </body>
    </html>
  )
}

const RootLayout = memo(RT);
export default RootLayout;
