
import Accordion from "@/components/Accordion/Accordion";
import Animated from "@/components/Animated";

export default function ServicesPage() {
    return (
        <div className=" w-full h-full flex flex-col items-center text-2xl">
            <Animated delay={500}>
            <h1 style={{marginTop: "12px"}} className=" w-full h-full uppercase add-blur rounded">
                what i offer
            </h1>
            </Animated>
            
            <Accordion />

        </div>
    );
}