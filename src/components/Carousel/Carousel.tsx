"use client"

import { useAppContext } from "@/contexts/useAppContext";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { clamp } from "../util/ClampFunctions";


type Props = {
  images: StaticImageData[];
}
 
//TODO: GET CURRENT HOVERED IMAGE FROM THE APP CONTEXT (to enable consistency between wide and mobile views)
export default function Carousel({images}: Props) {
  const {menuHidden} = useAppContext();
  const [currImg, setCurrImg] = useState<number>(0);

  console.log("CURR IMG", currImg, images[currImg]);


  return (
    <div className={`${menuHidden ? "w-[100vw]" : "w-full"} h-full grid grid-rows-1 xs:grid-cols-[15%,70%,15%] sm:grid-cols-[15%,70%,15%] lg:grid-cols-[10%,80%,10%] md:grid-cols-[10%,80%,10%] bg-transparent mb-1 transition-[width]`}>

      
      <div className="w-fit h-fit p-1 self-center justify-self-center add-blur border z-10 hover:scale-105 transition-transform">
      <svg 
        onClick={
          () => {
            setCurrImg(clamp(currImg-1, 0, images.length-1));
          }
      }
      width="50" height="50" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.81809 4.18179C8.99383 4.35753 8.99383 4.64245 8.81809 4.81819L6.13629 7.49999L8.81809 10.1818C8.99383 10.3575 8.99383 10.6424 8.81809 10.8182C8.64236 10.9939 8.35743 10.9939 8.1817 10.8182L5.1817 7.81819C5.09731 7.73379 5.0499 7.61933 5.0499 7.49999C5.0499 7.38064 5.09731 7.26618 5.1817 7.18179L8.1817 4.18179C8.35743 4.00605 8.64236 4.00605 8.81809 4.18179Z" fill="white" />

      </svg>
        </div> {/** left btn */}


      <div className=" w-full h-full grid grid-cols-1 md:grid-rows-[10%,60%,15%,15%] grid-rows-auto relative">
        {/** TITLES */}
        <div className="flex items-center overflow-x-hidden">
          <div style={{transform:`translateX(-${100 * currImg}%)`}} className={`w-full flex transition-transform`}>
          <div className=" w-full flex justify-center flex-shrink-0">
            <div className="add-blur text-xl rounded p-2">
              Reverse-Engineered Nuphy Website
            </div>
          </div>
          <div className=" w-full flex justify-center flex-shrink-0">
            <div className=" w-full flex justify-center flex-shrink-0">
              <div className="add-blur text-xl rounded p-2">
               Mamontov Productions
              </div>
          </div>
          </div>
        </div>
        
        </div>
        {/* IMAGE */}
        <div className="flex max-w-[1000px] justify-self-center h-full add-blur overflow-hidden">
          <div style={{transform:`translateX(-${100 * currImg}%)`}} className={`flex transition-transform`}>
            {
              images.map((img) => {
                return (
                    <Image className="rounded border p-2" layout="" width={img.width} height={img.height} key={img.src} alt="carouselimg" src={img.src}/>
                )
              })
            }
          </div>
        </div>
        {/** DESCS */}
        <div className=" flex items-center overflow-x-hidden">
          <div style={{transform:`translateX(-${100 * currImg}%)`}} className={`w-full flex transition-transform`}>
            <div className="w-full h-fit flex-shrink-0 flex justify-center py-2">
 
              <div className="add-blur sm:h-full w-fit p-2 rounded">
                Coming out of university, I wanted to focus on frontend development. To start, I reverse-engineered the NuPhy brand's Shopify store as an exercise to get more familiar with React Typescript. The site has a working shopping cart system with item and variant filtering.
              </div>
              
            </div>

            <div className="w-full flex-shrink-0 flex justify-center">

              <div className="add-blur h-fit w-fit p-2 rounded ">
                  desc2
              </div>

            </div>

          </div>
          
        </div>

        {/** LINKS */}
        <div className=" flex items-center justify-center">
          <div className="w-full grid grid-rows-[10%,90%] justify-items-center">
            
            <p>tech used</p>
              <svg 
              className="hover:scale-105 transition-transform"
              xmlns="http://www.w3.org/2000/svg" width={54} height={54} fill="none" viewBox="-11 -10.13 22 20.27">
                  <circle r="2" fill="#2F88FF"/>
                  <g stroke="#2F88FF">
                    <ellipse rx="10" ry="4.5"/>
                    <ellipse rx="10" ry="4.5" transform="rotate(60)"/>
                    <ellipse rx="10" ry="4.5" transform="rotate(120)"/>
                  </g>
              </svg>

          </div>
          <div className="w-full grid grid-rows-[10%,90%] grid-cols-[1fr,1fr] justify-items-center">

            <p className="m-0 h-fit">source </p>
            <p className="m-0 h-fit">live demo</p>

            <a href="https://gitlab.com/rlszabo966/nuphy-clone-2" target="_blank">
              <svg 
              className="hover:scale-105 transition-transform"
              width="64px" height="64px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" fill="white" fillOpacity="0.01"/>
                <path d="M23.9627 42L42 27.4152L36.9957 6L30.9661 18.9935H17.9932L11.0151 6L6 27.4152L23.9627 42Z" fill="#2F88FF" stroke="#000000" strokeWidth="4" strokeLinejoin="round"/>
              </svg>
            </a>
              
            <a className="w-fit h-fit" href="https://nuphy-storefront-clone-2.vercel.app" target="_blank">
              <svg 
              className="hover:scale-105 transition-transform mt-2"
              width={54} height={54} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M320 1013.76a310.4 310.4 0 0 1-219.52-529.92L192 392.96a33.28 33.28 0 1 1 47.36 47.36L148.48 531.2a241.92 241.92 0 0 0 0 343.68 248.32 248.32 0 0 0 343.68 0l87.04-87.04a34.56 34.56 0 0 1 48 0 33.92 33.92 0 0 1 0 47.36l-87.68 87.68A309.12 309.12 0 0 1 320 1013.76zM809.6 640a33.28 33.28 0 0 1-24.32-10.24 33.92 33.92 0 0 1 0-47.36l90.88-90.24A243.2 243.2 0 0 0 531.84 147.2L448 234.24a33.28 33.28 0 0 1-47.36-47.36l83.84-87.04a310.4 310.4 0 0 1 439.04 439.04L832 629.12a33.28 33.28 0 0 1-22.4 10.88z" fill="#2F88FF" /><path d="M328.96 768a69.12 69.12 0 0 1-47.36-19.2 67.84 67.84 0 0 1 0-95.36l371.2-371.2a67.2 67.2 0 1 1 95.36 95.36l-371.2 371.2a69.12 69.12 0 0 1-48 19.2z" fill="#2F88FF" />
              </svg>
            
            </a>
            
          </div>
        </div>
      </div> {/** content */}

      <div className="w-fit h-fit p-1 self-center justify-self-center add-blur bg-transparent border z-10 hover:scale-105 transition-transform"
        onClick={() => {
          setCurrImg(clamp(currImg+1, 0, images.length-1));
        }}
      >
        <div className="w-fit h-fit hover:scale-105 transition-transform">

        <svg
      width="50px" height="50px" viewBox="0 0 15 15" fill="black">
        <path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="white" />
      </svg>
        </div>
      
        </div> {/** right btn */}
    </div>
  );
}
