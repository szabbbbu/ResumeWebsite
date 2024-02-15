import Carousel from "@/components/Carousel/Carousel";

import Animated from "@/components/Animated";

function Page() {
    return (
        <Animated delay={10} height="h-[100vh]">
            <Carousel />
        </Animated>
        
    );
}

const ProjectsPage = Page;
export default ProjectsPage;
