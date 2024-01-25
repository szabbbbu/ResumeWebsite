import Link from "next/link"
import CustomLink from "./CustomLink/CustomLink"
import EyeBall from "./EyeBall";

export default function Header() {
    return(

        <>
            <nav
            className="flex flex-col justify-center w-[25vw] h-[100vh] bg-rgba"
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