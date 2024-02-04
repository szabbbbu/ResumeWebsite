"use client"
import Animated from "@/components/Animated";
import HideIfMobile from "@/components/HideIfMobile";
import GithubIcon from "@/components/Icons/GithubIcon";
import GitlabIcon from "@/components/Icons/GitlabIcon";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRef, useState } from "react";
export default function ContactPage() {
    const [emailCopied, setEmailCopied] = useState<boolean>(false);
    const [captchaSolved, setCaptchaSolved] = useState<boolean>(true);
    const [activateCaptcha, setActivateCaptcha] = useState<boolean>(false);
    const captchaRef = useRef(null);
  
    return (
        <HideIfMobile>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <h1
                className="p-4 rounded add-blur border text-xl"
                >Want to commission me for your next project?</h1>
                <div className=" w-full h-[40%] grid grid-cols-1 grid-rows-4 justify-center items-center">
                    <div className={`w-[60%] h-[80%] justify-self-center flex flex-wrap items-center justify-evenly ${captchaSolved? "add-blur border rounded": undefined}`}>
                    {(captchaSolved) ?
                    <Animated delay={800}>
                        {/* TODO: LOOKS TRASH ON MOBILE, FIX IT BITCH */}
                        <div className="flex items-center flex-wrap justify-evenly add-blur fade-in">
                        
                          
                                <span style={{color: "#E1BOFF"}} className="text-2xl mr-6">
                                    <span className="text-xl mr-4">ok, heres my email:</span>
                                    talkto@bobby.global
                                    </span>
                                <button 
                                onClick={async () => {
                                    await navigator.clipboard.writeText("talkto@bobby.global")
                                    setEmailCopied(true);
                                }}
                                className="add-blur rounded border w-[100px] h-[32px]">
                                    {!emailCopied ? "copy": "copied"}
                                </button>  
                            
                        </div>
                        </Animated>
                        :
                        null
                    }
                    </div>
                    <button 
                    onClick={() => {
                        setActivateCaptcha(true);
                    }}
                    className="text-white add-blur w-fit p-4 rounded border  justify-self-center">
                        Get in touch
                    </button>
                    {(activateCaptcha) ?
                        <div className={`h-[50%] w-fit ${"flex flex-col items-center justify-self-center"}`}>
                            <Animated delay={10}>
                            <p>But Wait! Are you Human???</p>
                            <HCaptcha
                                theme="dark"
                                ref={captchaRef}
                                sitekey="63cec785-a99d-4a00-b81f-207caccae4b3"
                                onVerify={(token, ekey) => {
                                    setCaptchaSolved(true);
                                }}
                            />
                            </Animated>
                        </div>
                    :
                    null
                    }
                    
                </div>
                
                <div className="flex flex-col items-center">
                    <p>You can also message me on:</p>
                    <div className="flex justify-between w-[80%]">
                        <div className="p-4">
                            <p>github</p>
                            <GithubIcon />
                        </div>
                        <div className="p-4">
                            <p>gitlab</p>
                        <GitlabIcon />
                        </div>
                    </div>
                </div>
                
            </div>
            
        </HideIfMobile>
    );
}
