import Link from "next/link";
import { ReactNode, memo} from "react";
import Styles from "./CustomLink.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/useAppContext";

//TODO: FIX NAVIGATION TO WORK WITH ROUTER CALLS, NO LINK

type Props = {
    to: string;
    children: ReactNode
}
function CustomLink_ToMemo({to, children}: Props) {
    const currPath = usePathname();
    const router = useRouter();
    const {appWidth, setMenuHidden} = useAppContext();

    const mobileLink = (
        <div id={Styles.container} className={`cursor-pointer h-fit w-full flex flex-col ${currPath === to ? "text-siteBlue": undefined}`}
        onClick={() => {
            setTimeout(() => {
                router.push(to);
                setMenuHidden(true)
            }, 444)
        }}>{children}</div>
    );

    const desktopLink = (
        <Link
        id={Styles.container}
        className={`h-fit w-full flex flex-col ${currPath === to ? "text-siteBlue": undefined}`}
        href={to}
        >
            {children}
        </Link>
    );


    return (
        <div>
            {appWidth < 768 ? mobileLink : desktopLink}
            {/* {desktopLink} */}
            <div id={Styles.bar}> </div>
        </div>
    );
}
const CustomLink = memo(CustomLink_ToMemo);
export default CustomLink;
