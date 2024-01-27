import Animated from "@/components/Animated";

export default function Home() {

  console.log("HOME RENDERED:")
  return (
    <div className="flex flex-col w-[100%] h-fit items-center my-[10%] bg-rgba">
      <Animated delay={0}>
        <p>ROBERT SZABO</p>
      </Animated>
      <Animated delay={1000} > 
        <p>Full stack engineer, specializing in web</p>
      </Animated>
      <Animated delay={1700}>
        <p>Hungarian-American based in Budapest, Hungary</p>
      </Animated>
      <Animated delay={2000}>
        <p>Available for contract work</p>
      </Animated>
      <Animated delay={3500}>
        <p className="text-2xl">Looking for a high quality website? Contact me!</p>
      </Animated>
    </div>
  );
}
