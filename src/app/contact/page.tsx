import Contact from "@/components/Contact";
import { InferGetStaticPropsType } from "next";


export default function ContactPage() {
    const key = process.env.HCAPTCHA_SITE_KEY as string;
    return (
        
        <Contact captchaKey={key} />
    );
}
