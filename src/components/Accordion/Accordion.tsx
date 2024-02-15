
import AccordionItem from "@/components/Accordion/AccordionItem";

const AccordionData = [
    {
        title: "Bespoke website Development / Maintenance",
        body:"I can take any design document and turn it into a fast-loading & responsive modern web application. I handle everything from UI to the server logic that runs the site. Following the completion of your site, I offer hosting and maintenance services for 24/7 fixes and improvements. I work closely with clients to ensure the app perfectly fits their vision",
        cta: "Contact me for a free discussion & quote."
    },
    // {
    //     title: "why choose a developer",
    //     body: "I build sites with one-of-a-kind designs. When choosing other no-code tools to build your online presence, you're confined to cookie-cutter layouts, and you usually get a page that looks generic. By getting a hand-made site you have full control over the site's capabilities and style. I build efficiant, yet graphically impressive web apps (with 2D/3D tools) that your visitors will remember and appreciate.",
    //     cta: "hit me"
    // },
    {
        title: "Tech I use",
        body: "The languages I'm most familiar with are Typescript, Golang, Java & Python I can make a serverless application using NextJS, or a Hypermedia-driven Application using Golang & HTMX. Databases are chosen on a per-project basis. I have deep networking knowledge, I'm comfortable with lower level networking tasks if needed to implement what you need.",
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
