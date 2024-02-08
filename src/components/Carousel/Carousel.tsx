"use client"

import { useAppContext } from "@/contexts/useAppContext";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { clamp } from "../util/ClampFunctions";
import GithubIcon from "../Icons/GithubIcon";
import GitlabIcon from "../Icons/GitlabIcon";
import LinkIcon from "../Icons/LinkIcon";
import ReactIcon from "../Icons/ReactIcon";
import NextJsIcon from "../Icons/NextJSIcon";
import { showContentIfMobileMenuHidden } from "../util/HideIfMobile";


type Props = {
  images: StaticImageData[];
}

const gitIcons = [
  <GitlabIcon/>, <GithubIcon/>
]

const techIcons = [
  [<ReactIcon />],
  [<ReactIcon/>, <NextJsIcon/>]
]

const gitLinks = [
  "https://gitlab.com/rlszabo966/nuphy-clone-2", 
  "https://github.com/szabbbbu/MVX_WEBSITE/"
];

const demoLinks = [
  "https://nuphy-storefront-clone-2.vercel.app",
  "https://mamont.us"
];

//TODO: GET CURRENT HOVERED IMAGE FROM THE APP CONTEXT (to enable consistency between wide and mobile views)
export default function Carousel({images}: Props) {
  const {menuHidden} = useAppContext();
  const [currImg, setCurrImg] = useState<number>(0);
  const showContent = showContentIfMobileMenuHidden();
  // console.log("CURR IMG", currImg, images[currImg]);
  if (showContent)
  return (
    <div className={`w-[100%] h-full grid grid-rows-1 xs:grid-cols-[15%,70%,15%] sm:grid-cols-[15%,70%,15%] lg:grid-cols-[10%,80%,10%] md:grid-cols-[10%,80%,10%] bg-transparent mb-1 transition-[width] place-items-center`}>

      
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


      <div className=" w-full h-full grid grid-cols-1 md:grid-rows-[10%,60%,15%,15%] grid-rows-auto relative self-center justify-self-center">
        {/** TITLES */}
        <div className="flex items-center overflow-x-hidden">
          <div style={{transform:`translateX(-${100 * currImg}%)`}} className={`w-full flex transition-transform`}>
          <div className=" w-full flex justify-center flex-shrink-0">
            <div className="add-blur text-xl rounded p-2 text-center">
              Reverse-Engineered Nuphy Website
            </div>
          </div>
          <div className=" w-full flex justify-center flex-shrink-0">
            <div className=" w-full flex justify-center flex-shrink-0">
              <div className="add-blur text-xl rounded p-2 text-center">
               Mamontov Productions
              </div>
          </div>
          </div>
        </div>
        
        </div>
        {/* IMAGE */}
        <div className="flex max-w-[1000px] self-center justify-self-center h-full add-blur overflow-hidden">
          <div style={{transform:`translateX(-${100 * currImg}%)`}} className={`transition-transform grid grid-rows-1 grid-cols-[100%,100%]`}>
            {
              images.map((img) => {
                return (
                    // <img className="object-cover" src={img.src}/>
                    <Image className="rounded border p-2 h-full" layout="" width={img.width} height={img.height} key={img.src} alt="carouselimg" src={img.src}/>
                )
              })
            }
          </div>
        </div>
        {/** DESCS */}
        <div className=" flex items-center overflow-x-hidden">
          <div style={{transform:`translateX(-${100 * currImg}%)`}} className={`w-full flex transition-transform`}>
            <div className="w-full h-fit flex-shrink-0 flex justify-center">
 
              <div className="add-blur sm:h-full w-fit p-2 rounded">
                As an exercise to better learn React TS, I reverse-engineered the NuPhy brand's Shopify store as an exercise. The site has a working shopping cart system with item and variant filtering.
              </div>
              
            </div>

            <div className="w-full flex-shrink-0 flex justify-center">

              <div className="add-blur h-fit w-fit p-2 rounded ">
                  Mamontov Productions NYC ordered a minimalist website inspired by <span>
                    <a 
                      className="text-purple-400"
                      href="https://danieldaniel.us"
                      target="_blank"
                      >
                      danieldaniel.us
                    </a>
                  </span>. The version I made has significant improvements to the mobile look and feel. 
              </div>

            </div>

          </div>
          
        </div>

        {/** LINKS */}
        <table className="border text-center xs:min-w-[90%] md:min-w-[60%] h-fit">
          <thead>
            <tr>
              <th>
                Tech used
              </th>
              <th>
                source
              </th>
              <th>
                live demo
              </th>
            </tr>
          </thead>

          <tbody className="max-h-[30px]">
            <tr className="">
              <td className="">
                <div className="flex justify-evenly hover:scale-105 transition-transform">
                  {
                  techIcons[currImg].map((icon) => {
                    return <>{icon}</>
                  })
                  }
                </div>
              </td>
              <td   className="">
                <div className="flex justify-evenly hover:scale-105 transition-transform">
                  <a href={gitLinks[currImg]} target="_blank">
                    {gitIcons[currImg]}
                  </a>
                </div>
              </td>

              <td >
                <div className="flex justify-evenly hover:scale-105 transition-transform">
                  <a href={demoLinks[currImg]} target="_blank">
                    <LinkIcon/>
                  </a>
                </div>
              </td>
            </tr>
            <tr>
            </tr>
          </tbody>
        </table>
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
  return null;
}
