import Contact from "@/components/Contact";
import HideIfMobile from "@/components/HideIfMobile";
import { InferGetStaticPropsType } from "next";


export default function ContactPage() {
    return (
        <HideIfMobile>
            <Contact />
        </HideIfMobile>
    );
}
