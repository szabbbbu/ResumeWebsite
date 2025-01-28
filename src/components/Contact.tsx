"use client"
// import dynamic from "next/dynamic";
import { useState, useEffect, useRef, ReactNode } from "react";
import { CopyIcon } from "@radix-ui/react-icons";
import emailjs from "@emailjs/browser"
// const HCaptcha = dynamic(() => import('@hcaptcha/react-hcaptcha'), { ssr: false });
import { showContentIfMobileMenuHidden } from "./util/HideIfMobile";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function Contact () {
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const [emailLoading, setEmailLoading] = useState<boolean>(false);
    const [captchaSolved, setCaptchaSolved] = useState<boolean>(false);
    const [hCaptchaKey, setHCaptchaKey] = useState<string | null>(null)

    const showContent = showContentIfMobileMenuHidden();

    const formRef = useRef<HTMLFormElement | null>(null);
    const captchaRef = useRef<HCaptcha | null>(null)

    async function getHCaptchaKey() {
        const resp = await fetch("/api/hkey");
        const j = await resp.json();
        return j.hkey;
    }

    useEffect(() => {
        getHCaptchaKey().then(k => {
        // setTimeout(() =>  
            setHCaptchaKey(k)
        // , 4000)
        });

    }, []);

    function handleSubmitForm(e: React.FormEvent) {
        e.preventDefault()
        if (!captchaSolved) {
            console.error("Form submitted without a solved captcha. Won't send form!")
            return;
        }
        if (!formRef.current) return;
        // if (!captchaRef.current) return;
        captchaRef.current?.resetCaptcha()
        // console.log("send email!")

        setEmailLoading(true);
        emailjs.sendForm("service_ab3t9xb", "template_5tvsrgn", formRef.current, {
            publicKey: "TBGfNR4FMpIrpoxjM"
        })
        .then(resp => {
            console.log("success!", resp)
            setEmailSent(true)
        })
        .catch(err => {
            console.error(err)
        })
        .finally(() => {
            setEmailLoading(false);
            setCaptchaSolved(false);
        })
    }

    function handleVerify(token: string, ekey: string) {
        // console.log("Captcha solved. Token:", token, ekey);
        setCaptchaSolved(true);
    }

    if (showContent)
        return (
            <div className="bg-rgba w-full h-full p-2 flex flex-col items-center overflow-scroll">
                <h1 className="mt-2 xs:text-sm md:text-lg">Get in Touch - Tell me about your project</h1>
                <h1 className="flex items-center justify-center space-x-2">
                    <span>
                        <span className="text-siteBlue">EMAIL:</span> robert@oncomputer.us
                    </span>
                    <span onClick={async () => {
                        await window.navigator.clipboard.writeText("robert@oncomputer.us");
                    }} title="copy email">
                        <CopyIcon className="hover:scale-110 active:scale-95 cursor-pointer" width={16} height={16} />
                    </span>
                </h1>
                <form 
                    ref={formRef}
                    name="h-captcha-response"
                    className="flex flex-col w-[90%] xs:mt-4 md:mt-[0px] xs:items-center md:items-start"
                    onSubmit={handleSubmitForm}
                >
                    <label htmlFor="name" className="mb-2 capitalize w-fit">
                        *name
                    </label>
                    <input required className="px-2 text-black mb-4 w-full" type="text" name="name" id="" />
                    <label htmlFor="email" className="mb-2 capitalize">
                        *email
                    </label>
                    <input required className="px-2 text-black mb-4 w-full" type="email" name="email" id="" />
                    <label htmlFor="subject" className="mb-2 capitalize">
                        subject
                    </label>
                    <input name="subject" className="px-2 text-black mb-4 w-full" type="text" />
                    <label htmlFor="msg" className="mb-2 capitalize">
                        *message
                    </label>
                    <textarea required placeholder="Please fill all fields leading with '*'" name="msg" id="" rows={12} className="w-full text-black p-4"></textarea>
                    {
                        emailSent ? 
                        <div
                            className=" text-green-400 text-center w-full"
                        >
                            <p>
                            message sent!
                            </p>
                            
                        </div> : null
                    }
                    <div className="flex w-full">
                    {
                        captchaSolved ? 
                        <button className="w-[80%] h-fit py-2 mt-2 border rounded mx-auto" type="submit">
                            {!emailLoading ? <span>SEND</span>: <span>sending message...</span>}
                        </button>
                        :
                        hCaptchaKey ? 
                        <div className="w-fit h-fit mt-2 mx-auto">
                            <HCaptcha
                                ref={captchaRef}
                                theme="dark" 
                                size="compact"
                                sitekey={hCaptchaKey}
                                onVerify={(token, ekey) => handleVerify(token, ekey)}
                            />
                        </div>

                        : <h1 className="border rounded mt-2 mx-auto xs:text-sm md:text-lg">loading captcha...</h1>  
                    }
                        
                    </div>
                </form>
            </div>
        );
    return null;
}
