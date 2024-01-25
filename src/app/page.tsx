
//TODO: change homepage content to "animated"

import Animated from "@/components/Animated";
import HomepageContent from "@/components/HomepageContent";

export default function Home() {

  console.log("HOME RENDERED:")
  return (
    <main className="w-full h-full my-16 flex flex-col items-start justify-center">
      <HomepageContent />
      <Animated delay={500} > 
        <p>How bout dis one?</p>
      </Animated>

      <Animated delay={1000}>
        <p>Number 2</p>
      </Animated>
    </main>
  );
}
