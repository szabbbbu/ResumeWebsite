"use client"
import { ArrowTopRightIcon, CheckCircledIcon, CopyIcon } from "@radix-ui/react-icons";
import { showContentIfMobileMenuHidden } from "./util/HideIfMobile";
import { useState } from "react";

export default function Contact () {
    const myEmail = "robert@oncomputer.us"
    const dim = 18;
    const [copied, setCopied] = useState(false);

    const showContent = showContentIfMobileMenuHidden();

    if (showContent)
        return (
            <div className=" w-full h-[70%] p-2 flex flex-col items-center overflow-scroll justify-center">
                <div className="h-fit w-fit bg-rgba py-4 px-2 rounded-lg">
                    <div className="flex items-center justify-center space-x-6 text-lg">
                        <span>
                            <span className="text-siteBlue">EMAIL:</span> {myEmail}
                        </span>
                        <div
                        onMouseUp={() => {
                                window.navigator.clipboard.writeText(myEmail)
                                .catch(_ => {
                                    alert("error: could not copy the email to clipboard")
                                })
                                setCopied(true)
                        }}
                        title="copy email addr" className="cursor-pointer hover:scale-110 transition-transform active:scale-95">
                            {copied ? <CheckCircledIcon width={dim} height={dim} /> : <CopyIcon width={dim}  height={dim} />}
                        </div>
                        <div title="mailto link" className="cursor-pointer hover:scale-110 transition-transform active:scale-95">
                            <a href={`mailto:${myEmail}`}>
                                <ArrowTopRightIcon width={dim} height={dim} />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        );
    return null;
}
