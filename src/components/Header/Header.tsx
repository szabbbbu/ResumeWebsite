"use client"
import CustomLink from "../CustomLink/CustomLink"
import EyeBall from "../EyeBall";
import HeaderControllerBtn from "./HeaderControllerBtn";
import { useAppContext } from "@/contexts/useAppContext";

function HeaderComponent() {
    const {menuHidden, activateMenu} = useAppContext();

    if (activateMenu)
        return(
            /**TODO: make the header animate away with a button */
            <section className={`${menuHidden ? "w-0" : "md:w-[25%] lg:w-[25%] xl:w-[25%] 2xl:w-[25%] sm:w-[100%] xs:w-[100%] z-[1]"} transition-[width] flex flex-col items-start justify-start overflow-scroll`}>
                <HeaderControllerBtn />
                <nav
                className={`w-full flex flex-col justify-start items-start h-full bg-rgba`}
                >   
                <ul className="grid grid-cols-1 grid-rows-auto gap-4 w-full h-full z-10 text-bittersweet text-2xl uppercase" 
                >

                    <CustomLink to="/">
                        <li
                        className="h-full py-11 w-full flex items-start justify-center hover:transform hover:scale-110 transition"
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
        </section>
    );
    return null
}

const Header = HeaderComponent;
export default Header;
