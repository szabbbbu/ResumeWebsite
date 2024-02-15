
import AccordionItem from "@/components/Accordion/AccordionItem";

const AccordionData = [
    {
        title: "Bespoke website Development / Maintenance",
        body:"I can take any design document and turn it into a fast-loading & responsive modern web application. I handle everything from UI to the server logic that runs the site. Following the completion of your site, I offer hosting and maintenance services for 24/7 fixes and improvements. I work closely with clients to ensure the app perfectly fits their vision",
        cta: "Contact me for a free discussion & quote."
    },
    {
        title: "Shopify Headless Storefront Development",
        body: "I can build a \"headless\" storefront for your shopify ecommerce website. Headless storefronts use shopify to manage inventory and sales, but use a custom frontend. This way you're free to work with any web design and integrate it seamlessly with your shopify store",
        cta: "Email me to talk about your business"
    },
    {
        title: "Tech I use",
        body: "The languages I'm most familiar with are Typescript, Golang, Java & C. I can make a serverless application using NextJS, or a Hypermedia-driven Application using Golang & HTMX. Choosing the right tools depends on the requirements of your app. Databases are chosen on a per-project basis. I have deep networking knowledge, I'm comfortable with lower level networking tasks if needed to implement what you need.",
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
