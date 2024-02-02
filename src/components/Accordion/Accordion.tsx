
import AccordionItem from "@/components/Accordion/AccordionItem";

const AccordionData = [
    {
        title: "Custom made, unique sites for business",
        body:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, libero? Quas, error non qui vitae sunt consequatur est eos et facilis, aliquam id nisi impedit? Modi, dolorum! Doloribus, aperiam fuga?",
        cta: "Contact me for a free discussion & quote."
    },
    {
        title: "Site Hosting & Maintenance",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, consectetur ipsa nesciunt, aperiam mollitia, corrupti totam odio vero ipsam nostrum illum! Excepturi quae nemo officiis, consectetur doloribus enim iste in voluptas consequatur a atque quod, sint nostrum dolorum! Magnam placeat veniam ut iusto magni nesciunt aspernatur hic quas minima unde sapiente culpa ducimus voluptatem aliquid illum doloribus a ex mollitia pariatur, similique, autem corporis soluta. Aliquid ullam autem ea cupiditate!",
        cta: "Need a web professional to host your site? Get in touch via the contact page."
    },
    {
        title: "Search Engine Optimization & Google Business profile management",
        body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium laboriosam corrupti inventore maxime quia, necessitatibus natus id quod laborum dolores beatae iusto dolorem repellendus, animi odio dolor minus possimus nesciunt, non doloribus nisi magnam. Quidem mollitia molestiae alias earum quae porro nobis, ea quasi inventore explicabo eius sint vel voluptatibus adipisci repudiandae iure ipsam natus quisquam veritatis nostrum architecto accusantium deserunt hic non! Deleniti officiis pariatur libero, quisquam perspiciatis sit doloremque et itaque quas harum labore nesciunt dolor illo vero quibusdam odit adipisci placeat fuga reprehenderit minima quia, ipsa exercitationem quaerat? Voluptate corrupti tenetur alias officiis accusamus quos ratione ut!",
        // body: "Get your business on the front page of Google with my help. Find local clients and grow your business with professional help & a hands-off approach to your online presence. Want to get on Google's front page and stay there? Contact me!",
        cta: "Want to get on Google's front page? Contact me!" 
    }
]


export default function Accordion() {
  return (
    <div
    className="w-full h-auto grid grid-cols-1 grid-rows-auto mt-12 p-9 border rounded overflow-scroll"
    >
        {
            AccordionData.map((data) => {
                return <AccordionItem key={data.title} title={data.title} body ={data.body} cta={data.cta} />
            })
        }
    </div>
  );
}
