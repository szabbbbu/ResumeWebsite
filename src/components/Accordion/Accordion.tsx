import AccordionItem from "@/components/Accordion/AccordionItem";

const AccordionData = [
    {
        title: "Bespoke website Development / Maintenance",
        body:"I can take any design document and turn it into a fast-loading & responsive modern web application. I handle everything from UI to the server logic that runs the site. Following the completion of your site, I offer hosting and maintenance services for 24/7 fixes and improvements. I work closely with clients to ensure the app perfectly fits their vision",
        cta: "Contact me for a free discussion & quote."
    },
    {
        title: "Search Engine optimization for webpages",
        body: "I help businesses maximize their online visibility through effective SEO strategies. By optimizing your website’s architecture, content, and technical performance, I can improve your search engine rankings, attract qualified leads, and ultimately grow your revenue. Let’s work together to ensure your site stands out in a competitive digital landscape.",
        cta: "Contact for a free discussion and quote"
    },
    {
        title: "Tech I use",
        body: "I specialize in building web applications using TypeScript and React for single-page applications, with a strong interest in traditional multi-page development approaches leveraging tools like HTMX and Nginx. I also have experience programming in Java, Python, and C++. I prioritize selecting the most optimal technology for each use case, adapting quickly to new tools and frameworks without bias to ensure the best solutions.",
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
