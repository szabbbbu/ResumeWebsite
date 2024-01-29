"use client"

import { useAppContext } from "@/contexts/useAppContext";
import Image from "next/image";

 
export default function Carousel() {
  const {menuHidden} = useAppContext();
  return (
    <div className={`${menuHidden ? "w-[100vw]" : "w-full"} h-full grid grid-rows-1 xs:grid-cols-[15%,70%,15%] sm:grid-cols-[15%,70%,15%] lg:grid-cols-[10%,80%,10%] md:grid-cols-[10%,80%,10%]  bg-rose-500`}>

      <div className="w-fit h-fit p-1 self-center justify-self-center bg-[rgba(0,0,0,0.9)] border z-10">
      <svg width="50" height="50" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.81809 4.18179C8.99383 4.35753 8.99383 4.64245 8.81809 4.81819L6.13629 7.49999L8.81809 10.1818C8.99383 10.3575 8.99383 10.6424 8.81809 10.8182C8.64236 10.9939 8.35743 10.9939 8.1817 10.8182L5.1817 7.81819C5.09731 7.73379 5.0499 7.61933 5.0499 7.49999C5.0499 7.38064 5.09731 7.26618 5.1817 7.18179L8.1817 4.18179C8.35743 4.00605 8.64236 4.00605 8.81809 4.18179Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" />

      </svg>
        </div> {/** left btn */}
      <div className="bg-blue-400 w-full h-full">
        {/* <Image /> */}
        <div>title</div>
        <div>image</div>
        <div>desc</div>
        <div>links</div>
      </div> {/** content */}

      <div className="w-fit h-fit p-1 self-center justify-self-center bg-[rgba(0,0,0,0.9)] border z-10">
      <svg width="50" height="50" viewBox="0 0 15 15" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="white" fill-rule="evenodd" clip-rule="evenodd" />
      </svg>
        </div> {/** right btn */}
    </div>
  );
}