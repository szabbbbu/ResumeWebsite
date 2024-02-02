"use client"
import { memo, useState } from "react";
import ChevronRight from "@/components/Icons/ChevronRight";
import Link from "next/link";

type Props = {
    title: string;
    body: string;
    cta: string;
}

export default memo(function AccordionItem({title, body, cta}: Props) {
    const [itemOpen, setItemOpen] = useState<boolean>(false);

    return (
        <div 
        className={`  ${(itemOpen === false) ? "row-span-1" : "row-span-2"}  transition-[height] flex flex-col overflow-hidden rounded`}>
            <div
            onClick={() => {
                setItemOpen(!itemOpen)
            }}
            className="h-fit"
            >
                <h2 className="white-blur text-black h-[44px] w-full flex items-center capitalize cursor-pointer">
                    <span className="mx-2">{title}</span>
                    <ChevronRight rot={(!itemOpen) ? 180 : 270}/>
                </h2>
            </div>
            <div
            className={`${itemOpen ? "h-auto" : "h-0"} overflow-y-auto add-blur`}>
                <p>{body}</p>
                <Link href="/contact">
                    <span className="hover:text-pink-500 my-2 transition-[font-size]"><b>{cta}</b></span>
                </Link>
            </div>
        </div>
  )
});
