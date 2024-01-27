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
  return (
    <html lang="en">
      <body
        className="grid grid-rows-1 grid-cols-2 h-[100vh] w-[100vw]"
      >
        <Header />
        <AppContextProvider>
          <CanvasLayerClient />
          <IsosurfaceLayer />
          {/* <CanvasLayerClientDebug /> */}
        </AppContextProvider>
        {children}
      </body>
    </html>
  )
}

const RootLayout = memo(RT);
export default RootLayout;
