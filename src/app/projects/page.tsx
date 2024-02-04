import Carousel from "@/components/Carousel/Carousel";
import { memo } from "react";
import a from "@/../public/cloned_nuphy_site.png";
import b from "@/../public/MamontovProductions.png";
import HideIfMobile from "@/components/HideIfMobile";

const images = [a,b];

function Page() {
    return (
        <HideIfMobile>
            <Carousel images={images}/>
        </HideIfMobile>
    );
}

const ProjectsPage = memo(Page);
export default ProjectsPage;
