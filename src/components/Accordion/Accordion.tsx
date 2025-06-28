import AccordionItem from "@/components/Accordion/AccordionItem";

const AccordionData = [
    {
        title: "Bespoke website Development / Maintenance",
        body:"I handle everything from UI to the server logic that runs the site. Following the completion of your site, I offer hosting and maintenance services for 24/7 fixes and improvements. I work closely with clients to ensure the app perfectly fits their vision",
        cta: "Contact"
    },
    {
        title: "Tech I use",
        body: "I utilize Typescript and Golang for most use cases, deploying apps via docker containers and nginx.",
        cta: ""
    },
    {
        title: "My Background",
        body: "EDUCATION: B.S. Computer Science: Florida International University (DEC 2021) WORK: COMP-SCI tutor (2020-2023) // Full Stack Web Developer (Present)",
        cta: ""
    }
]

export default function Accordion() {
  return (
    <div className="flex justify-center">
        <div
        className="w-[90%] h-auto grid grid-cols-1 grid-rows-auto p-9 border rounded overflow-scroll add-blur"
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
