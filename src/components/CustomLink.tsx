import Link from "next/link";
import { ReactNode } from "react";

type Props = {
    to: string;
    children: ReactNode
}
export default function CustomLink({to, children}: Props) {
    return (
        <Link className="h-fit w-full flex flex-col anim" href={to}>
                {children}
                {/* <span className="before:w-0 w-full h-4 bg-slate-100 transform translate-x-0 group-hover:translate-x-full transition-all overflow-hidden"></span> */}
        </Link>
    )
}