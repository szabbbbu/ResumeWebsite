
//TODO: change homepage content to "animated"

import Animated from "@/components/Animated";
import HomepageContent from "@/components/HomepageContent";

export default function Home() {

  console.log("HOME RENDERED:")
  return (
    <main className="h-full my-16 flex flex-col items-center justify-center add-blur">
      <div className="flex flex-col">
      <Animated delay={0}>
        <p>ROBERT SZABO</p>
      </Animated>
      <Animated delay={1000} > 
        <p>I'm a full stack engineer</p>
      </Animated>
      <Animated delay={1500}>
        <p>Specializing in web</p>
      </Animated>
      <Animated delay={2500}>
        <p>Do you want a high-quality website?</p>
      </Animated>
      <Animated delay={3000}>
        <p>See what I offer in the services page</p>
      </Animated>
      </div>
    </main>
  );
}
