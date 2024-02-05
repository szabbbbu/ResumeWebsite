
import AccordionItem from "@/components/Accordion/AccordionItem";

const AccordionData = [
    {
        title: "Frontend website creation with a unique design",
        body:"I can take any design document and turn it into a fast-loading & responsive web application. Don't have a design? I have my own people we can work with to get something going!",
        cta: "Contact me for a free discussion & quote."
    },
    {
        title: "Backend web server/API creation",
        body: "I can make fast web servers and APIs for your site too.",
        cta: "Need a web professional to host your site? Get in touch via the contact page."
    },
    {
        title: "Tech I use",
        body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium laboriosam corrupti inventore maxime quia, necessitatibus natus id quod laborum dolores beatae iusto dolorem repellendus, animi odio dolor minus possimus nesciunt, non doloribus nisi magnam. Quidem mollitia molestiae alias earum quae porro nobis, ea quasi inventore explicabo eius sint vel voluptatibus adipisci repudiandae iure ipsam natus quisquam veritatis nostrum architecto accusantium deserunt hic non! Deleniti officiis pariatur libero, quisquam perspiciatis sit doloremque et itaque quas harum labore nesciunt dolor illo vero quibusdam odit adipisci placeat fuga reprehenderit minima quia, ipsa exercitationem quaerat? Voluptate corrupti tenetur alias officiis accusamus quos ratione ut!",
        // body: "Get your business on the front page of Google with my help. Find local clients and grow your business with professional help & a hands-off approach to your online presence. Want to get on Google's front page and stay there? Contact me!",
        cta: "Want to get on Google's front page? Contact me!" 
    }
]


export default function Accordion() {
  return (
    <div
    className="w-full h-auto grid grid-cols-1 grid-rows-auto mt-12 p-9 border rounded overflow-scroll add-blur"
    style={{rowGap: "24px"}}
    >
        {
            AccordionData.map((data) => {
                return <AccordionItem key={data.title} title={data.title} body ={data.body} cta={data.cta} />
            })
        }
    </div>
  );
}
