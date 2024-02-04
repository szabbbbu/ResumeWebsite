"use client"
import HideIfMobile from "@/components/HideIfMobile";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRef } from "react";
export default function ContactPage() {
    const captchaRef = useRef(null);
  
    return (
        <HideIfMobile>
            <div className="w-full h-[70%] flex flex-col items-center justify-center bg-rose-600">
                <h1>Want to commission me for your next project?</h1>
                <div>
                    <button className="text-white  add-blur w-fit p-4 rounded border">
                        Get in touch
                    </button>
                    <HCaptcha
                        ref={captchaRef}
                        sitekey="63cec785-a99d-4a00-b81f-207caccae4b3"
                        onVerify={(token, ekey) => console.log(token, ekey)}
                    />
                </div>
                
                <div className="flex">
                    <h3>GitHub</h3>
                    <h3>GitLab</h3>
                </div>
                
            </div>
            
        </HideIfMobile>
    );
}
