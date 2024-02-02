"use client"
import { memo, useState } from "react";
import ChevronRight from "@/components/Icons/ChevronRight";

type Props = {
    title: string;
    body: string;
}

export default memo(function AccordionItem({title, body}: Props) {
    const [itemOpen, setItemOpen] = useState<boolean>(false);

    return (
        <div
        onClick={() => {
            setItemOpen(!itemOpen)
        }}
        className={`bg-fuchsia-500 ${(itemOpen === false) ? "h-[64px]" : "h-full"} row-span-1 transition-[height] flex flex-col overflow-hidden`}>
            <div>
                <h2 className="bg-fuchsia-600 h-[64px] m-0 flex items-center focus:bg-slate-400">
                    <span className="mr-2">{title}</span>
                    <ChevronRight rot={(!itemOpen) ? 180 : 270}/>
                </h2>
            </div>
            <div
            className={`${itemOpen ? "h-auto" : "h-0"} overflow-y-auto`}>
                {body}
            </div>
        </div>
  )
});
