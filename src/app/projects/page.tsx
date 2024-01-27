import { memo } from "react";

function Page() {
    return (
        <div className={`grid grid-rows-auto md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 min-h-[200px] h-[100vh] w-[100%] overflow-y-scroll`}>
            <div className="h-[100vh] w-full bg-rgba self-center justify-self-center flex flex-col items-center justify-center min-h-[600px]">
                Reverse Engineered Website: Nuphy Keyboards (2023)
                <div>image</div>
                <div>tech</div>
                <div>I've reverse engineered the NuPhy Keyboards brand website, up until the product pages/checkout, etc. as an exercize to get more comfortable with React.</div>
                <div>link to live</div>
                <div>link to code</div>
            </div>
            <div className="h-[100vh] w-full bg-rgba self-center justify-self-center flex flex-col items-center justify-center min-h-[600px]">
                Mamontov (MVX) Productions
            </div>
        </div>
    );
}

const ProjectsPage = memo(Page);
export default ProjectsPage;
