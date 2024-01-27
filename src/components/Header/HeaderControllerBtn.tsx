"use client"
import { useAppContext } from "@/contexts/useAppContext";
import { memo } from "react";

function HeaderBtn() {

    const {menuHidden, setMenuHidden} = useAppContext();

    return (
        <svg
        onClick={() => setMenuHidden(!menuHidden)}
        className={`absolute z-10 ${!menuHidden ? "2xl:left-[20%] xl:left-[20%] lg:left-[20%] md:left-[20%] sm:left-[2%] xs:left-[2%]" : "left-[2%]" } top-[4.5%] cursor-pointer p-1 transition-[left] duration-300 ${menuHidden ? "rotate-[180deg]" : undefined} origin-center`}
        width="42.881439"
        height="42.881439"
        viewBox="0 0 42.881439 42.881439"
        version="1.1">
        <g
            id="layer1"
            transform="translate(-2.5592799,-2.5592799)">
            <path
            id="rect1"
            style={{fill:"#ffffff",stroke:"#0d2131",strokeWidth:0,strokeOpacity:0.727955}}
            d="M 44.503273,2.561434 C 44.309922,2.549667 44.109716,2.585838 43.928513,2.6769532 L 3.0597352,23.22734 c -0.2940601,0.147866 -0.4675386,0.403819 -0.4973887,0.67627 -0.00348,0.03178 -0.00331,0.06417 -0.00276,0.09628 -4.898e-4,0.03243 -8.572e-4,0.06414 0.00276,0.09628 0.030605,0.271565 0.2041784,0.526424 0.4973881,0.673861 L 43.928514,45.322798 c 0.483205,0.242974 1.097132,0.09836 1.376108,-0.322491 0.278979,-0.420842 0.115687,-0.955538 -0.367514,-1.198512 L 5.5549684,23.999876 44.937108,4.1955496 C 45.420311,3.9525759 45.583601,3.4178803 45.304623,2.9970377 45.130262,2.7340106 44.825529,2.5810537 44.503273,2.561434 Z" />
        </g>
        </svg>
    );
}

const HeaderControllerBtn = memo(HeaderBtn);
export default HeaderControllerBtn;
