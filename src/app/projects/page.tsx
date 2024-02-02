import Carousel from "@/components/Carousel/Carousel";
import { memo } from "react";
import a from "@/../public/cloned_nuphy_site.png";
import b from "@/../public/MamontovProductions.png";

const images = [a,b];

function Page() {
    return (
        <>
            <Carousel images={images}/>
        </>
    );
}

const ProjectsPage = memo(Page);
export default ProjectsPage;
