import Link from "next/link";
import { ReactNode, memo} from "react";
import Styles from "./CustomLink.module.css";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/contexts/useAppContext";


type Props = {
    to: string;
    children: ReactNode
}
function CustomLink_ToMemo({to, children}: Props) {
    const currPath = usePathname();
    const {appWidth, setMenuHidden} = useAppContext();

    function handleMobClick() {
        if (appWidth <= 768) {
            setTimeout(() => setMenuHidden(true), 400)
        }
    }


    return (
        <div>
            <Link id={Styles.container} className={`h-fit w-full flex flex-col ${currPath === to ? "text-siteBlue": undefined}`} href={to}
            onClick={() => handleMobClick()}
            >
                {children}
            </Link>
            <div id={Styles.bar}> </div>
        </div>
    )
}
const CustomLink = memo(CustomLink_ToMemo);
export default CustomLink;
