import Link from "next/link";
import { ReactNode } from "react";
import Styles from "./CustomLink.module.css";

type Props = {
    to: string;
    children: ReactNode
}
export default function CustomLink({to, children}: Props) {
    return (
        <div>
            <Link id={Styles.container} className="h-fit w-full flex flex-col anim" href={to}>
                    {children}
            </Link>
            <div id={Styles.bar}> </div>
        </div>
    )
}