"use client"
import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
const HCaptcha = dynamic(() => import('@hcaptcha/react-hcaptcha'), { ssr: false });
import GithubIcon from "./Icons/GithubIcon";
import { showContentIfMobileMenuHidden } from "./util/HideIfMobile";

export default function Contact () {
    const [emailCopied, setEmailCopied] = useState<boolean>(false);
    const [captchaSolved, setCaptchaSolved] = useState<boolean>(false);
    const [activateCaptcha, setActivateCaptcha] = useState<boolean>(false);
    const [hCaptchaKey, setHCaptchaKey] = useState<string | null>(null)

    // const captchaRef = useRef(null);
    const showContent = showContentIfMobileMenuHidden();

    async function getHCaptchaKey() {
        const resp = await fetch("/api/hkey");
        const j = await resp.json();
        return j.hkey;
    }

    useEffect(() => {
        getHCaptchaKey().then(k => setHCaptchaKey(k));
    }, []);

    if (showContent)
        return (
                <div className="w-full h-[100vh] flex flex-col items-center justify-center">
                    <h1
                    className="p-4 rounded add-blur border text-xl text-center w-[90%]"
                    >
                        Want to hire me for your next project?
                    </h1>
                    <div  className=" w-full h-[40%] grid grid-cols-1 grid-rows-[1fr,2fr,2fr] justify-center items-center">
                        <div className={`xs:w-[90%] md:w-[80%] h-fit p-4 mt-3 justify-self-center flex flex-wrap items-center justify-evenly add-blur border rounded ${captchaSolved ? "fade-in" : "start-state"}`}>
                        
                            <div className={`grid grid-rows-1 xs:grid-cols-[2fr,1fr] md:grid-cols-[1fr,2fr,1fr,1fr] justify-center items-center add-blur`}>
                                    <div className="text-lg text-center xs:hidden md:block">
                                        <p>ok, here's my email!</p>
                                    </div>
                                    
                                    <div style={{color: "#E1BOFF"}} className="md:text-2xl xs:text-lg mr-6 text-center">
                                        talkto@bobby.global
                                    </div>
                                    <button 
                                    onClick={async () => {
                                        await navigator.clipboard.writeText("talkto@bobby.global")
                                        setEmailCopied(true);
                                    }}
                                    className="xs:hidden md:block add-blur rounded justify-self-center border w-[100px] h-[32px] hover:bg-[rgba(50,50,50,0.7)] active:bg-[rgba(50,50,50,0.9)]">
                                        {!emailCopied ? "copy": "copied!"}
                                    </button>  
                                    <a className={`justify-self-center`} href="https://github.com/szabbbbu" target="_blank">
                                        <div className="w-fit h-fit hover:scale-105 transition-transform">
                                            <GithubIcon/>
                                        </div>
                                    </a>
                                    
                            </div>
                            
                        </div>

                    
                    <div className={`h-fit w-full grid grid-cols-1 grid-rows-[1fr,2fr] rounded p-4`}>
                        <button
                        onClick={() => {
                            // console.log("CLICKED!")
                            setActivateCaptcha(true)
                        }}
                        className=" w-[60%] justify-self-center rounded border add-blur uppercase active:bg-[rgba(50,50,50,0.5)] hover:bg-[rgba(50,50,50,0.3)]"
                            >
                                get in touch
                        </button>
                        <div className={`w-full h-[200px] flex flex-col items-center ${activateCaptcha && !captchaSolved? "fade-in z-0" : "start-state -z-10"} `}>
                        <p className="text-lg my-2 add-blur">
                            But Wait! Are you Human???
                        </p>
                        {hCaptchaKey && 
                            (
                                <HCaptcha
                                    sitekey={hCaptchaKey}
                                    theme="dark"
                                    onLoad={() => console.log("loaded")}
                                    onVerify={(token, ekey) => {
                                        setCaptchaSolved(true);
                                    }}
                                />
                            )
                        }
                        </div>
                    </div>
                    </div>    
                </div> 
        );
    return null;
}
