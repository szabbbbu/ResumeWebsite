import Carousel from "@/components/Carousel/Carousel";
import { memo } from "react";

function Page() {
    return (
        <>
            <Carousel />
        </>
    );
}

const ProjectsPage = memo(Page);
export default ProjectsPage;
