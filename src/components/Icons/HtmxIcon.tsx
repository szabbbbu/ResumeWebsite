import Image from "next/image";
import logo from "@/../public/htmx_logo.png"

export default function HtmxIcon() {
    return (
        <span title="HTMX">
            <a target="_blank" href="https://htmx.org">
                <Image src={logo} alt="htmx logo" height={28} width={28}></Image>
            </a>
        </span>
    )
}

