"use client"
import Accordion from "@/components/Accordion/Accordion";
import Animated from "@/components/Animated";
import { showContentIfMobileMenuHidden } from "@/components/util/HideIfMobile";


export default function ServicesPage() {
    const showContent = showContentIfMobileMenuHidden();
    if (showContent)
    return (

        <div className="w-full h-full flex flex-col items-center">
            <Animated delay={10}>
                <h1 style={{marginTop: "24px"}} className=" w-full h-fit p-2 uppercase add-blur rounded text-xl">
                    What I Offer
                </h1>
            </Animated>
            <Animated delay={600}>
                <Accordion />
            </Animated>
        </div>

    );
    return null
}
