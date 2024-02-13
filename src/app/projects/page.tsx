import Carousel from "@/components/Carousel/Carousel";
import { memo } from "react";

import b from "@/../public/MamontovProductions.png";
import Animated from "@/components/Animated";


const images = [b];

function Page() {
    return (
        <Animated delay={10} height="h-[100vh]">
            <Carousel images={images}/>
        </Animated>
        
    );
}

const ProjectsPage = memo(Page);
export default ProjectsPage;
