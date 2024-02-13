"use client"
import Link from "next/link";
import Animated from "@/components/Animated";
import { showContentIfMobileMenuHidden } from "@/components/util/HideIfMobile";

export default function Home() {
  //TODO: don't start animations until the user closes the menu in mobile
  const showContent = showContentIfMobileMenuHidden();
  if (showContent)
  return (
    <div className="flex flex-col sm:w-[100%] h-fit items-center my-[10%] bg-rgba">

        <Animated delay={0}>
          <h1 className="text-xl text-center">ROBERT SZABO</h1>
        </Animated>
        <Animated delay={1000} > 
          <h1 className="text-xl text-center">Full stack engineer</h1>
        </Animated>
        <Animated delay={2000}>
          <h2 className="text-center">Available for contract work</h2>
        </Animated>
        <Animated delay={3500}>
          <h2 className="text-xl flex flex-wrap text-center">Looking for a high quality website? Get in touch with me
          <Link href="/contact">
            <span className="text-siteBlue">&nbsp;here</span>
            
          </Link></h2>
        </Animated>

    </div>
  );
  return null;
}
