import Image from "next/image"
import logo from "@/../public/honojs_logo.png"
export default function HonojsIcon() {
    return (
        <span title="HONO JS">
            <a target="_blank" href="https://hono.dev">
                <Image src={logo} alt="honojs logo" width="28" height="28" />
            </a>
        </span>
    );
}
