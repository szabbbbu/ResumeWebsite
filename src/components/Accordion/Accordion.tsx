
import AccordionItem from "@/components/Accordion/AccordionItem";

const AccordionData = [
    {
        title: "Frontend website dev",
        body:"I can take any design document and turn it into a fast-loading & responsive web application. Don't have a design? I have my own people we can work with to get something going!",
        cta: "Contact me for a free discussion & quote."
    },
    {
        title: "Backend web server/API creation",
        body: "I can build the web server that powers your site as well. I write networking code in golang.",
        cta: "Commission me for your networking needs"
    },
    {
        title: "Tech I use",
        body: "I am currently using Next JS and React with Typescript to create frontend interfaces for web applications. When creating servers I prefer to use Golang or Express JS framework. For databases, I use an SQL variant befitting the project.",
        
        cta: "" 
    },
    {
        title: "My Background",
        body: "I have a computer science degree from Florida International University (2021). I worked as a computer science tutor from that point until late 2023. Now, I focus on selling my skills as a developer. I'm in my late 20s and I'm Hungarian-American.",
        cta: ""
    }
]

export default function Accordion() {
  return (
    <div className="flex justify-center">
        <div
        className="  w-[90%] h-auto grid grid-cols-1 grid-rows-auto p-9 border rounded overflow-scroll add-blur"
        style={{rowGap: "24px"}}
        >
            {
                AccordionData.map((data) => {
                    return <AccordionItem key={data.title} title={data.title} body ={data.body} cta={data.cta} />
                })
            }
        </div>
    </div>
  );
}
