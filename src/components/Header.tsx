import Link from "next/link"

export default function Header() {
    return(
        <>
            <nav>
                <ul className="inline">
                    <Link href="/projects">
                        <li>Projects</li>
                    </Link>
                    
                    <li>Services</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </>
    );
}