import CustomLink from "../CustomLink/CustomLink"
import EyeBall from "../EyeBall";
import { memo } from "react";

function HeaderComponent() {
    return(
        /**TODO: make the header animate away with a button */
        <>
            <svg

                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 absolute z-10 left-[3%] top-[4.5%]"
                >
                <rect y="15" width="100" height="10" rx="5" fill="#fff" />
                <rect y="45" width="100" height="10" rx="5" fill="#fff" />
                <rect y="75" width="100" height="10" rx="5" fill="#fff" />
            </svg>

            <nav
            className="flex flex-col justify-center lg:w-[25vw] xs:w-[100vw] sm:w-[100vw] h-full bg-rgba"
            >
              
                
            <ul className="grid grid-cols-1 grid-rows-auto gap-4 w-full h-full z-10 text-bittersweet text-2xl uppercase" 
            >

                <CustomLink to="/">
                    <li
                    className="h-full py-11 w-full flex items-center justify-center hover:transform hover:scale-110 transition"
                    >
                        Home
                    </li>
                </CustomLink>
                
                <div
                className="w-full flex items-center justify-center"
                >
                    <EyeBall />
                    <EyeBall />
                </div>
        
                <CustomLink to="/projects">
                    <li
                    className="h-full py-11 w-full flex items-center justify-center hover:transform hover:scale-110 transition"
                    >
                        Projects
                    </li>
                </CustomLink>
                
                <CustomLink to="/services">
                    <li
                    className="h-fit py-11 w-full flex items-center justify-center hover:transform hover:scale-110 transition"
                    >
                        <p>
                            Services
                        </p>
                        
                    </li>
                </CustomLink>
                
                <CustomLink to="/contact">
                    <li
                    className="bg-transparent h-fit py-11 w-full flex items-center justify-center  hover:transform hover:scale-110 transition">
                        Contact
                    </li>
                </CustomLink>    
            </ul>
            </nav>
        </>
    );
}

const Header = memo(HeaderComponent);
export default Header;
