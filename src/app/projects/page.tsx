import Carousel from "@/components/Carousel/Carousel";
import { memo } from "react";
import a from "@/../public/cat.png";
import b from "@/../public/2.png";
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
