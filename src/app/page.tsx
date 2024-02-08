"use client"
import Animated from "@/components/Animated";
import { showContentIfMobileMenuHidden } from "@/components/util/HideIfMobile";

export default function Home() {
  //TODO: don't start animations until the user closes the menu in mobile
  const showContent = showContentIfMobileMenuHidden();
  if (showContent)
  return (
    <div className="flex flex-col sm:w-[100%] h-fit items-center my-[10%] bg-rgba">

        <Animated delay={0}>
          <p>ROBERT SZABO</p>
        </Animated>
        <Animated delay={1000} > 
          <p>Full stack engineer</p>
        </Animated>
        <Animated delay={1700}>
          <p></p>
        </Animated>
        <Animated delay={2000}>
          <p>Available for contract work</p>
        </Animated>
        <Animated delay={3500}>
          <p className="text-xl flex flex-wrap text-center">Looking for a high quality website? See what I offer on the services page</p>
        </Animated>

    </div>
  );
  return null;
}
