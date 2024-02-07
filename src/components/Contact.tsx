"use client"
import HideIfMobile from "./HideIfMobile";
import { useState, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import GithubIcon from "./Icons/GithubIcon";

export default function Contact ({captchaKey}: {captchaKey: string}) {
        const [emailCopied, setEmailCopied] = useState<boolean>(false);
        const [captchaSolved, setCaptchaSolved] = useState<boolean>(false);
        const [activateCaptcha, setActivateCaptcha] = useState<boolean>(false);
        const captchaRef = useRef(null);
        console.log("contact page reload")
        return (
            <HideIfMobile>
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <h1
                    className="p-4 rounded add-blur border text-xl text-center"
                    >Want to commission me for your next project?</h1>
                    <div  className=" w-full h-[40%] grid grid-cols-1 grid-rows-[1fr,2fr,2fr] justify-center items-center">
                        <div className={`xs:w-full md:w-[80%] h-fit p-4 mt-3 justify-self-center flex flex-wrap items-center justify-evenly add-blur border rounded ${captchaSolved ? "fade-in" : "start-state"}`}>
                        
                            <div className={`grid grid-rows-1 xs:grid-cols-[2fr,1fr] md:grid-cols-[1fr,2fr,1fr,1fr] justify-center items-center add-blur `}>
                                    <div className="text-lg text-center xs:hidden md:block">
                                        <p>ok, here's my email!</p>
                                    </div>
                                    
                                    <div style={{color: "#E1BOFF"}} className="text-2xl mr-6 text-center">
                                        talkto@bobby.global
                                    </div>
                                    <button 
                                    onClick={async () => {
                                        await navigator.clipboard.writeText("talkto@bobby.global")
                                        setEmailCopied(true);
                                    }}
                                    className="add-blur rounded justify-self-center border w-[100px] h-[32px]">
                                        {!emailCopied ? "copy": "copied!"}
                                    </button>  
                                    <a className={`justify-self-center xs:hidden md:block`} href="https://github.com/szabbbbu" target="_blank">
                                        <GithubIcon/>
                                    </a>
                                    
                            </div>
                            
                        </div>

                    
                    <div className={`h-fit w-full grid grid-cols-1 grid-rows-[1fr,2fr] rounded p-4`}>
                        <button
                        onClick={() => {
                            console.log("CLICKED!")
                            setActivateCaptcha(true)
                        }}
                        className=" w-[60%] justify-self-center rounded border add-blur uppercase active:bg-[rgba(50,50,50,0.5)] hover:bg-[rgba(50,50,50,0.3)]"
                            >
                                get in touch
                        </button>
                        <div className={`w-full h-[200px] add-blur flex flex-col items-center ${activateCaptcha? "fade-in z-0" : "start-state -z-10"} `}>
                        <p className="text-lg my-2">But Wait! Are you Human???</p>
                        <HCaptcha
                            ref={captchaRef}
                            
                            // TODO: use getServerSideProps to get this env variable
                            // sitekey={}
                            sitekey={captchaKey}
                            theme="dark"
                            onLoad={() => console.log("loaded")}
                            onVerify={(token, ekey) => {
                                setCaptchaSolved(true);
                            }}
                        />

                        </div>
                    </div>
                    </div>    
                </div> 
            </HideIfMobile>
    );
}
