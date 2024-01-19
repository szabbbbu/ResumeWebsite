import Link from "next/link"

export default function Header() {
    return(
        <>
            <nav
            className="flex flex-col justify-center w-[25vw] h-[100vh] bg-rgba"
            >
               <div
                className="h-[50vh] w-full"
               >
                hello
               </div>
                
            <ul className="flex flex-col  w-full h-full items-center justify-evenly z-10 text-bittersweet"
            
            >
                    <Link href="/projects">
                        <li
                        >Projects</li>
                    </Link>
                    
                    <Link href="/services">
                        <li>Services</li>
                    </Link>
                    
                    <Link href="/contact">
                        <li>Contact</li>
                    </Link>
                    
                </ul>
            
            
            </nav>
        </>
    );
}