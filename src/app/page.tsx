"use client"
import Link from "next/link";
import Animated from "@/components/Animated";
import { showContentIfMobileMenuHidden } from "@/components/util/HideIfMobile";
import { MouseEventHandler } from "react";

export default function Home() {
  //TODO: don't start animations until the user closes the menu in mobile
  const showContent = showContentIfMobileMenuHidden();
  if (showContent)
  return (
    <div className="flex flex-col w-full h-fit justify-center items-center my-[10%]">
      <div
      className="add-blur border rounded-lg w-[90%] flex flex-col items-center justify-center">
        <Animated delay={10}>
          <h1 className="text-2xl text-center">ROBERT SZABO</h1>
        </Animated>
        <Animated delay={110} > 
          <h1 className="text-2xl text-center uppercase">Full stack engineer</h1>
        </Animated>
        <Animated delay={210}>
          <h2 className="text-center text-2xl">I make web apps 😎</h2>
        </Animated>
        <Animated delay={310}>
          <h2 className="text-xl text-center">
            Looking for a high quality website? 
          <Link href="/contact" className="w-full">
            &nbsp;Contact me
            <span className=" text-siteBlue text-center">
              &nbsp;here
            </span>
          </Link>
          </h2>
          
        </Animated>
      <Animated delay={410}>
        <h3 className="text-xl text-center">Want to just watch the blobs? click 
          <Link href="/screensaver" className="add-blur text-siteBlue">
            &nbsp;here
          </Link>
        </h3>
      </Animated>
      </div>
    </div>
  );
  return null;
}
