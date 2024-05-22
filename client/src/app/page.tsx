import CountdownTimer from "@/components/layout/CountdownTimer";
import Header from "@/components/layout/Header";
import Wrapper from "@/components/layout/Wrapper";

export default function Home() {
  return (
    <div>
      <Header />
      <Wrapper>
        <CountdownTimer />
      </Wrapper>
    </div>
  );
}
