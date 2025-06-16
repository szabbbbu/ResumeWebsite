"use client"
import Link from "next/link";
import Animated from "@/components/Animated";
import { showContentIfMobileMenuHidden } from "@/components/util/HideIfMobile";
import Styles from "@/components/CustomLink/CustomLink.module.css"

export default function Home() {
  //TODO: don't start animations until the user closes the menu in mobile
  const showContent = showContentIfMobileMenuHidden();
  if (showContent)
  return (
    <div className="flex flex-col w-full justify-center items-center my-[10%]">
      <div
      className="add-blur border rounded-lg w-[90%] flex flex-col items-center justify-center py-4 space-y-2">
        <Animated delay={10}>
          <h1 className="text-2xl text-center">ROBERT SZABO</h1>
        </Animated>
        <div className="flex space-x-2">
          <Animated delay={110} > 
            <h1 className="text-2xl text-center uppercase">
              Software Developer
            </h1>
          </Animated>

        </div>
        <Animated delay={210}>
          <h2 className="text-center text-2xl"></h2>
        </Animated>

        <div className="flex space-x-4">

          <Animated delay={310}>
            <div className="h-8">
              <Link id={Styles.container} href="/contact" className="w-full">
              <h2 className="text-xl uppercase text-siteBlue">
                  Contact
              </h2>
              </Link>
              <div id={Styles.bar}></div>
            </div>
          </Animated>
        <Animated delay={410}>
          <h3 className="text-xl text-center uppercase">
            <div className="h-8">
              <Link id={Styles.container} href="/screensaver" className="add-blur text-siteBlue">
                Screensaver
              </Link>
              <div id={Styles.bar}></div>
            </div>
          </h3>
        </Animated>
        </div>
      </div>
    </div>
  );
  return null;
}
