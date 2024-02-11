"use client"
import Carousel from "@/components/Carousel/Carousel";
import { memo } from "react";
import a from "@/../public/cloned_nuphy_site.png";
import b from "@/../public/MamontovProductions.png";
import Animated from "@/components/Animated";


const images = [a,b];

function Page() {
    return (
        <Animated delay={10}>
            <Carousel images={images}/>
        </Animated>
        
    );
}

const ProjectsPage = memo(Page);
export default ProjectsPage;
