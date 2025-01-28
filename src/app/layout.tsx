import type { Metadata } from 'next'
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
  // console.log("rendering layout")
  // grid grid-rows-1 grid-cols-[0.8fr,2fr]
  return (
    <html lang="en">
      <body
        className="flex h-[100vh] w-[100vw]"
      >
          <IsoContextProvider>
            <IsosurfaceLayer />
            <CircleLayer />
          </IsoContextProvider>
        <AppContextProvider>
          <Header />
          
        <main className="z-0 xs:flex sm:flex md:flex xs:absolute md:static flex-col inset-0 w-[100vw] h-[100vh] overflow-y-scroll justify-center">
          {children}
        </main>
        </AppContextProvider>
        {/* THE FOOTER */}
        {/* <div className="absolute bottom-4 xs:right-[25%] md:right-[40%]">
        &#169; Robert Szabo (2024)
        </div> */}
      </body>
    </html>
  )
}

const RootLayout = RT;
export default RootLayout;
