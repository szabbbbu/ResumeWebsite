import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'

import AppContextProvider from '@/contexts/AppContextProvider'
import IsosurfaceLayer from '@/components/isosurface/CanvasLayerSystem/IsosurfaceLayer';
import IsoContextProvider from '@/contexts/isosurface/IsoContextProvider'
import CircleLayer from '@/components/isosurface/CanvasLayerSystem/CircleLayer'

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
          <IsoContextProvider>
            <IsosurfaceLayer />
            <CircleLayer />
          </IsoContextProvider>
          
        <main className="z-0 xs:flex sm:flex md:flex xs:absolute md:static inset-0 w-[100vw] h-[100vh] xs:overflow-scroll md:overflow-hidden">
          {children}
        </main>
        </AppContextProvider>
      </body>
    </html>
  )
}

const RootLayout = RT;
export default RootLayout;
